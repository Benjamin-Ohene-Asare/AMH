
from django.urls import path

from .views import AppointmentCreateView
from .admin_views import (
    AppointmentDashboardStatsView,
    AdminAppointmentListView,
    AdminAppointmentStatusUpdateView,
)


urlpatterns = [
    # Public appointment booking
    path(
        "",
        AppointmentCreateView.as_view(),
        name="appointment-create"
    ),

    # Admin dashboard statistics
    path(
        "admin/dashboard/stats/",
        AppointmentDashboardStatsView.as_view(),
        name="admin-dashboard-stats"
    ),

    # Admin appointment list
    path(
        "admin/appointments/",
        AdminAppointmentListView.as_view(),
        name="admin-appointment-list"
    ),

    # Admin appointment status update
    path(
        "admin/appointments/<int:pk>/status/",
        AdminAppointmentStatusUpdateView.as_view(),
        name="admin-appointment-status-update"
    ),
]
