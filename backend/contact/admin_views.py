
from django.db.models import Count
from django.db import models
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from appointments.permissions import IsHospitalAdmin

from .models import ContactMessage
from .serializers import ContactMessageStatusSerializer
from rest_framework import serializers


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "subject",
            "message",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "subject",
            "message",
            "created_at",
        ]


class ContactMessageStatsView(APIView):
    permission_classes = [IsHospitalAdmin]

    def get(self, request):
        stats = ContactMessage.objects.aggregate(
            total=Count("id"),
            new=Count("id", filter=models.Q(status="new")),
            read=Count("id", filter=models.Q(status="read")),
            resolved=Count("id", filter=models.Q(status="resolved")),
        )

        return Response(stats)


class AdminContactMessageListView(generics.ListAPIView):
    permission_classes = [IsHospitalAdmin]
    serializer_class = ContactMessageAdminSerializer

    def get_queryset(self):
        return ContactMessage.objects.all().order_by("-created_at")


class AdminContactMessageStatusUpdateView(generics.UpdateAPIView):
    permission_classes = [IsHospitalAdmin]
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageStatusSerializer
    http_method_names = ["patch", "options", "head"]
