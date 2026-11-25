
from django.urls import path

from .views import (
    PublicEventListView,
    PublicEventDetailView,
    AdminEventListCreateView,
    AdminEventDetailView,
)

urlpatterns = [
    # Public event endpoints
    path("", PublicEventListView.as_view(), name="public-event-list"),
    path("<int:pk>/", PublicEventDetailView.as_view(), name="public-event-detail"),

    # Admin event endpoints
    path("admin/", AdminEventListCreateView.as_view(), name="admin-event-list-create"),
    path("admin/<int:pk>/", AdminEventDetailView.as_view(), name="admin-event-detail"),
]
