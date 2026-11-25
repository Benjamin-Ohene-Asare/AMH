
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication and accounts
    path("accounts/", include("accounts.urls")),

    # Community groups
    path("community/groups/", include("community_groups.urls")),

    # Community posts and comments
    path("community/", include("community_posts.urls")),

    # Hospital appointments
    path("appointments/", include("appointments.urls")),

    # Hospital events
    path("api/events/", include("events.urls")),
    path("api/contact/", include("contact.urls")),
]

# Serve uploaded media files during development
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
