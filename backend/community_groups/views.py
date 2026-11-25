
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import SAFE_METHODS

from .models import CommunityGroup, GroupMembership, GroupJoinRequest
from .serializers import (
    CommunityGroupSerializer,
    GroupMembershipSerializer,
    GroupJoinRequestSerializer,
)


class IsGroupManager(permissions.BasePermission):
    """
    Group members can view group details.
    Only the group creator or a hospital super admin
    can update or delete a group.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return (
            obj.created_by == request.user
            or getattr(request.user, "role", None) == "SUPER_ADMIN"
        )


class GroupListCreateView(generics.ListCreateAPIView):
    serializer_class = CommunityGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CommunityGroup.objects.select_related(
            "created_by"
        ).all()

    def perform_create(self, serializer):
        group = serializer.save(created_by=self.request.user)

        # Automatically make the creator a group member.
        GroupMembership.objects.get_or_create(
            group=group,
            member=self.request.user,
        )


class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommunityGroup.objects.select_related("created_by")
    serializer_class = CommunityGroupSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsGroupManager,
    ]


class JoinGroupView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, group_id):
        try:
            group = CommunityGroup.objects.get(id=group_id)
        except CommunityGroup.DoesNotExist:
            return Response(
                {"message": "Community group not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if GroupMembership.objects.filter(
            group=group,
            member=request.user
        ).exists():
            return Response(
                {"message": "You are already a member of this group."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_request = GroupJoinRequest.objects.filter(
            group=group,
            requester=request.user
        ).first()

        if existing_request:
            if existing_request.status == GroupJoinRequest.Status.PENDING:
                return Response(
                    {"message": "Your join request is already pending."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            existing_request.status = GroupJoinRequest.Status.PENDING
            existing_request.save(update_fields=["status"])
            join_request = existing_request
        else:
            join_request = GroupJoinRequest.objects.create(
                group=group,
                requester=request.user,
            )

        return Response(
            GroupJoinRequestSerializer(join_request).data,
            status=status.HTTP_201_CREATED,
        )


class GroupJoinRequestListView(generics.ListAPIView):
    serializer_class = GroupJoinRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        group_id = self.kwargs["group_id"]

        return GroupJoinRequest.objects.filter(
            group_id=group_id,
            group__created_by=self.request.user
        ).select_related("group", "requester")


class GroupJoinRequestDecisionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, request_id):
        try:
            join_request = GroupJoinRequest.objects.select_related(
                "group",
                "requester"
            ).get(id=request_id)
        except GroupJoinRequest.DoesNotExist:
            return Response(
                {"message": "Join request not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            join_request.group.created_by != request.user
            and getattr(request.user, "role", None) != "SUPER_ADMIN"
        ):
            return Response(
                {"message": "You cannot manage this join request."},
                status=status.HTTP_403_FORBIDDEN,
            )

        decision = request.data.get("status")

        if decision not in [
            GroupJoinRequest.Status.APPROVED,
            GroupJoinRequest.Status.REJECTED,
        ]:
            return Response(
                {"message": "Invalid decision."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if join_request.status != GroupJoinRequest.Status.PENDING:
            return Response(
                {"message": "This request has already been processed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        join_request.status = decision
        join_request.save(update_fields=["status"])

        if decision == GroupJoinRequest.Status.APPROVED:
            GroupMembership.objects.get_or_create(
                group=join_request.group,
                member=join_request.requester,
            )

        return Response(
            GroupJoinRequestSerializer(join_request).data,
            status=status.HTTP_200_OK,
        )


class MyGroupsView(generics.ListAPIView):
    serializer_class = GroupMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GroupMembership.objects.filter(
            member=self.request.user
        ).select_related("group", "member")
