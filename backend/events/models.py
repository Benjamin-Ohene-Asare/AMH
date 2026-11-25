
from django.db import models
from django.core.files.storage import storages


class Event(models.Model):
    title = models.CharField(max_length=200)

    image = models.ImageField(
        upload_to="events/",
        storage=storages["supabase_media"]
    )

    description = models.TextField()

    location = models.CharField(max_length=255)

    start_date = models.DateTimeField()

    end_date = models.DateTimeField(
        null=True,
        blank=True
    )

    guest_information = models.TextField(blank=True)

    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-start_date"]
        verbose_name = "Hospital Event"
        verbose_name_plural = "Hospital Events"

    def __str__(self):
        return self.title
