from django.db import models

# Create your models here.

from django.db import models


class Appointment(models.Model):
    DEPARTMENT_CHOICES = [
        ("general", "General Consultation"),
        ("maternity", "Maternity"),
        ("paediatrics", "Paediatrics"),
        ("laboratory", "Laboratory"),
        ("pharmacy", "Pharmacy"),
        ("dental", "Dental"),
        ("eye", "Eye Clinic"),
        ("other", "Other"),
    ]

    TIME_CHOICES = [
        ("morning", "Morning"),
        ("afternoon", "Afternoon"),
        ("evening", "Evening"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    department = models.CharField(
        max_length=30,
        choices=DEPARTMENT_CHOICES,
    )

    appointment_date = models.DateField()
    preferred_time = models.CharField(
        max_length=20,
        choices=TIME_CHOICES,
    )

    reason = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} - {self.appointment_date}"
