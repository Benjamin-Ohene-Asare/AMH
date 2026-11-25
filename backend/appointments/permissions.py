
from rest_framework.permissions import BasePermission


class IsHospitalAdmin(BasePermission):
    """
    Allow access only to authenticated hospital super administrators.
    """

    message = "You do not have permission to access hospital administration."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "SUPER_ADMIN"
        )
