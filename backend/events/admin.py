
from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "location",
        "start_date",
        "is_published",
        "created_at",
    )

    list_filter = (
        "is_published",
        "start_date",
    )

    search_fields = (
        "title",
        "location",
        "description",
    )

    ordering = ("-created_at",)
