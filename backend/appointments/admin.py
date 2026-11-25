
from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "department",
        "appointment_date",
        "preferred_time",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "department",
        "appointment_date",
    )

    search_fields = (
        "full_name",
        "phone",
        "email",
    )

    list_editable = ("status",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    date_hierarchy = "appointment_date"
