
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event

        fields = [
            "id",
            "title",
            "image",
            "description",
            "location",
            "start_date",
            "end_date",
            "guest_information",
            "is_published",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
