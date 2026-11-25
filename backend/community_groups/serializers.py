
from rest_framework import serializers

from .models import CommunityGroup, GroupMembership, GroupJoinRequest


class CommunityGroupSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.id")
    creator_name = serializers.ReadOnlyField(source="created_by.get_full_name")
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = CommunityGroup
        fields = [
            "id",
            "name",
            "category",
            "description",
            "created_by",
            "creator_name",
            "member_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "creator_name",
            "member_count",
            "created_at",
            "updated_at",
        ]

    def get_member_count(self, obj):
        return obj.memberships.count()


class GroupMembershipSerializer(serializers.ModelSerializer):
    member_name = serializers.ReadOnlyField(source="member.get_full_name")
    group_name = serializers.ReadOnlyField(source="group.name")

    class Meta:
        model = GroupMembership
        fields = [
            "id",
            "group",
            "group_name",
            "member",
            "member_name",
            "joined_at",
        ]
        read_only_fields = fields


class GroupJoinRequestSerializer(serializers.ModelSerializer):
    requester_name = serializers.ReadOnlyField(
        source="requester.get_full_name"
    )
    group_name = serializers.ReadOnlyField(source="group.name")

    class Meta:
        model = GroupJoinRequest
        fields = [
            "id",
            "group",
            "group_name",
            "requester",
            "requester_name",
            "status",
            "requested_at",
        ]
        read_only_fields = [
            "id",
            "requester",
            "requester_name",
            "status",
            "requested_at",
        ]
