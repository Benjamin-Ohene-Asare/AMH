
from django.db.models import Count, Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status

from .models import Appointment
from .serializers import (
    AppointmentSerializer,
    AppointmentStatusUpdateSerializer,
)
from .permissions import IsHospitalAdmin


class AppointmentDashboardStatsView(APIView):
    permission_classes = [IsHospitalAdmin]

    def get(self, request):
        stats = Appointment.objects.aggregate(
            total=Count("id"),
            pending=Count("id", filter=Q(status="pending")),
            confirmed=Count("id", filter=Q(status="confirmed")),
            completed=Count("id", filter=Q(status="completed")),
        )

        return Response(stats)


class AdminAppointmentListView(generics.ListAPIView):
    permission_classes = [IsHospitalAdmin]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.all().order_by("-created_at")


class AdminAppointmentStatusUpdateView(generics.UpdateAPIView):
    permission_classes = [IsHospitalAdmin]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentStatusUpdateSerializer
    http_method_names = ["patch", "options", "head"]
