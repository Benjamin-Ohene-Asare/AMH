
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class HospitalUserManager(UserManager):

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields["role"] = "MEMBER"

        return super().create_user(
            username=username,
            email=email,
            password=password,
            **extra_fields
        )

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields["role"] = "SUPER_ADMIN"

        return super().create_superuser(
            username=username,
            email=email,
            password=password,
            **extra_fields
        )


class User(AbstractUser):

    class Role(models.TextChoices):
        MEMBER = "MEMBER", "Member"
        SUPER_ADMIN = "SUPER_ADMIN", "Hospital Super Admin"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.MEMBER
    )

    # Contact information
    phone = models.CharField(
        max_length=20,
        blank=True
    )

    # Google account integration
    google_id = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True
    )

    objects = HospitalUserManager()

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
