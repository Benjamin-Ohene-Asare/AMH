from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
        "subject",
        "status",
        "created_at",
    )

    list_filter = ("status", "created_at")

    search_fields = (
        "first_name",
        "last_name",
        "email",
        "subject",
        "message",
    )

    readonly_fields = ("created_at",)

    ordering = ("-created_at",)