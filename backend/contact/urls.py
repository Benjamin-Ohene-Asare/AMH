
from django.urls import path

from .views import ContactMessageCreateView
from .admin_views import (
    ContactMessageStatsView,
    AdminContactMessageListView,
    AdminContactMessageStatusUpdateView,
)


urlpatterns = [
    # Public contact form
    path(
        "",
        ContactMessageCreateView.as_view(),
        name="contact-message-create",
    ),

    # Admin contact statistics
    path(
        "admin/stats/",
        ContactMessageStatsView.as_view(),
        name="contact-message-stats",
    ),

    # Admin contact messages
    path(
        "admin/messages/",
        AdminContactMessageListView.as_view(),
        name="admin-contact-message-list",
    ),

    # Update message status
    path(
        "admin/messages/<int:pk>/status/",
        AdminContactMessageStatusUpdateView.as_view(),
        name="admin-contact-message-status",
    ),
]
