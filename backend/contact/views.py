
import logging

from django.conf import settings
from django.core.mail import get_connection, send_mail

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import ContactMessage
from .serializers import ContactMessageSerializer


logger = logging.getLogger(__name__)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Save the message before attempting email delivery
        contact_message = serializer.save()

        subject = (
            "New Contact Enquiry - Ahmadiyya Muslim Hospital"
        )

        message_body = f"""
A new contact enquiry has been submitted through the hospital website.

SENDER DETAILS
--------------
Name: {contact_message.first_name} {contact_message.last_name}
Email: {contact_message.email}

MESSAGE DETAILS
---------------
Subject: {contact_message.subject or "No subject"}

Message:
{contact_message.message}

Submitted: {contact_message.created_at}

Please log in to the hospital admin dashboard to review this enquiry.
"""

        connection = None

        try:
            connection = get_connection()
            connection.open()

            send_mail(
                subject=subject,
                message=message_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[
                    settings.APPOINTMENT_NOTIFICATION_EMAIL
                ],
                connection=connection,
                fail_silently=False,
            )

        except Exception:
            logger.exception(
                "Failed to send contact enquiry notification email."
            )

        finally:
            if connection is not None:
                connection.close()
