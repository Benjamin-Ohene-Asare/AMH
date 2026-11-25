
import uuid

from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction

from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2 import id_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token

from .models import User
from .serializers import RegisterSerializer


def user_response(user, token):
    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        },
        "token": token.key,
    }


# =========================================
# REGISTRATION TEMPORARILY DISABLED
# =========================================

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        return Response(
            {
                "message": (
                    "New account registration is temporarily disabled. "
                    "Please contact the hospital administrator."
                )
            },
            status=status.HTTP_403_FORBIDDEN
        )


# =========================================
# LOGIN
# =========================================

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = request.data.get("username", "").strip()
        password = request.data.get("password", "")

        if not identifier or not password:
            return Response(
                {
                    "message": "Please enter your email/username and password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(
            username__iexact=identifier
        ).first()

        if user is None:
            user = User.objects.filter(
                email__iexact=identifier
            ).first()

        if user is None:
            return Response(
                {"message": "Invalid email/username or password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        authenticated_user = authenticate(
            request,
            username=user.username,
            password=password
        )

        if authenticated_user is None:
            return Response(
                {"message": "Invalid email/username or password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        token, created = Token.objects.get_or_create(
            user=authenticated_user
        )

        return Response(
            {
                "message": "Login successful.",
                **user_response(authenticated_user, token),
            },
            status=status.HTTP_200_OK
        )


# =========================================
# GOOGLE LOGIN
# Existing accounts only
# =========================================

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        google_token = request.data.get("credential")

        client_id = getattr(
            settings,
            "GOOGLE_OAUTH_CLIENT_ID",
            ""
        )

        if not google_token or not client_id:
            return Response(
                {
                    "message": "Google authentication is not configured."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            google_data = id_token.verify_oauth2_token(
                google_token,
                GoogleRequest(),
                client_id
            )

        except ValueError as error:
            print(
                "GOOGLE TOKEN VERIFICATION ERROR:",
                str(error)
            )

            return Response(
                {
                    "message": "Invalid Google authentication token."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        google_id = google_data.get("sub")
        email = google_data.get("email", "").strip().lower()
        email_verified = google_data.get("email_verified", False)

        if not google_id or not email or email_verified is not True:
            return Response(
                {
                    "message": "A verified Google email is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():

            user = User.objects.filter(
                google_id=google_id
            ).first()

            if user is None:

                existing_user = User.objects.filter(
                    email__iexact=email
                ).first()

                if existing_user:

                    if existing_user.role == User.Role.SUPER_ADMIN:
                        return Response(
                            {
                                "message": (
                                    "Please use your existing "
                                    "Hospital Admin login."
                                )
                            },
                            status=status.HTTP_403_FORBIDDEN
                        )

                    if existing_user.google_id:
                        return Response(
                            {
                                "message": (
                                    "This email is linked to another "
                                    "Google account."
                                )
                            },
                            status=status.HTTP_409_CONFLICT
                        )

                    user = existing_user
                    user.google_id = google_id

                    if not user.first_name:
                        user.first_name = google_data.get(
                            "given_name", ""
                        )

                    if not user.last_name:
                        user.last_name = google_data.get(
                            "family_name", ""
                        )

                    user.save(
                        update_fields=[
                            "google_id",
                            "first_name",
                            "last_name",
                        ]
                    )

                else:
                    return Response(
                        {
                            "message": (
                                "New account registration is temporarily "
                                "disabled. Please contact the hospital "
                                "administrator."
                            )
                        },
                        status=status.HTTP_403_FORBIDDEN
                    )

            token, created = Token.objects.get_or_create(
                user=user
            )

        return Response(
            {
                "message": "Google login successful.",
                **user_response(user, token),
            },
            status=status.HTTP_200_OK
        )


# =========================================
# LOGOUT
# =========================================

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()

        return Response(
            {"message": "Logout successful."},
            status=status.HTTP_200_OK
        )
