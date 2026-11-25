
from django.contrib import admin
from .models import CommunityGroup, GroupMembership, GroupJoinRequest


@admin.register(CommunityGroup)
class CommunityGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "created_by", "created_at")
    search_fields = ("name", "category", "created_by__username")
    list_filter = ("category", "created_at")
    readonly_fields = ("created_at", "updated_at")


@admin.register(GroupMembership)
class GroupMembershipAdmin(admin.ModelAdmin):
    list_display = ("group", "member", "joined_at")
    search_fields = ("group__name", "member__username")
    list_filter = ("joined_at",)


@admin.register(GroupJoinRequest)
class GroupJoinRequestAdmin(admin.ModelAdmin):
    list_display = ("group", "requester", "status", "requested_at")
    search_fields = ("group__name", "requester__username")
    list_filter = ("status", "requested_at")
