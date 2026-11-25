
import logging

from django.conf import settings
from django.core.mail import get_connection, send_mail

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Appointment
from .serializers import AppointmentSerializer


logger = logging.getLogger(__name__)
from rest_framework import generics
from .permissions import IsHospitalAdmin

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Save the appointment first
        appointment = serializer.save()

        # Prepare notification email
        subject = "New Appointment Request - Ahmadiyya Muslim Hospital"

        message = f"""
A new appointment request has been submitted.

PATIENT DETAILS
-------------------------
Full Name: {appointment.full_name}
Phone: {appointment.phone}
Email: {appointment.email or "Not provided"}

APPOINTMENT DETAILS
-------------------------
Department: {appointment.get_department_display()}
Date: {appointment.appointment_date}
Preferred Time: {appointment.get_preferred_time_display()}

Reason for Appointment:
{appointment.reason}

Status: {appointment.get_status_display()}
"""

        connection = None

        try:
            # Create and open one SMTP connection
            connection = get_connection()
            connection.open()

            # Send using the already-open connection
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[
                    settings.APPOINTMENT_NOTIFICATION_EMAIL
                ],
                fail_silently=False,
                connection=connection,
            )

            logger.info(
                "Appointment notification sent successfully. "
                "Appointment ID: %s",
                appointment.id,
            )

        except Exception:
            # Never cancel a saved appointment because email failed
            logger.exception(
                "Appointment notification email could not be sent. "
                "Appointment ID: %s",
                appointment.id,
            )

        finally:
            # Close the SMTP connection
            if connection is not None:
                try:
                    connection.close()
                except Exception:
                    logger.exception(
                        "Could not close appointment email connection."
                    )





class AdminAppointmentListView(generics.ListAPIView):
    """
    Allow hospital administrators to view all appointments.
    """

    queryset = Appointment.objects.all().order_by("-created_at")
    serializer_class = AppointmentSerializer
    permission_classes = [IsHospitalAdmin]