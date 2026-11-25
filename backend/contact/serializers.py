from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "subject",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ContactMessageStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["status"]

    def validate_status(self, value):
        allowed_statuses = ["new", "read", "resolved"]

        if value not in allowed_statuses:
            raise serializers.ValidationError(
                "Invalid contact message status."
            )

        return value