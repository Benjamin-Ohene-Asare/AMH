
from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

from community_groups.models import CommunityGroup


def can_access_group(user, group):
    """
    Check whether a user can access a community group.
    """
    return (
        group.memberships.filter(member=user).exists()
        or group.created_by == user
        or getattr(user, "role", None) == "SUPER_ADMIN"
    )


def accessible_groups_filter(user):
    """
    Return a queryset filter for groups accessible to a user.
    """
    if getattr(user, "role", None) == "SUPER_ADMIN":
        return Q()

    return (
        Q(group__memberships__member=user)
        | Q(group__created_by=user)
    )


class GroupPostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        group_id = self.kwargs["group_id"]

        return (
            Post.objects.filter(
                group_id=group_id
            )
            .filter(accessible_groups_filter(self.request.user))
            .select_related("group", "author")
            .prefetch_related("comments", "comments__author")
            .distinct()
        )

    def perform_create(self, serializer):
        group = get_object_or_404(
            CommunityGroup,
            id=self.kwargs["group_id"]
        )

        if not can_access_group(self.request.user, group):
            raise PermissionDenied(
                "You must be a group member to create a post."
            )

        serializer.save(
            group=group,
            author=self.request.user
        )


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Post.objects.filter(
                accessible_groups_filter(self.request.user)
            )
            .select_related("group", "author")
            .prefetch_related("comments", "comments__author")
            .distinct()
        )

    def get_object(self):
        post = super().get_object()

        # Members can view posts, but only authorised users
        # can edit or delete them.
        if self.request.method not in permissions.SAFE_METHODS:
            if not (
                post.author == self.request.user
                or post.group.created_by == self.request.user
                or getattr(self.request.user, "role", None) == "SUPER_ADMIN"
            ):
                raise PermissionDenied(
                    "You cannot modify this post."
                )

        return post


class PostCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Comment.objects.filter(
                post_id=self.kwargs["post_id"]
            )
            .filter(
                Q(post__group__memberships__member=self.request.user)
                | Q(post__group__created_by=self.request.user)
                if getattr(self.request.user, "role", None) != "SUPER_ADMIN"
                else Q()
            )
            .select_related("post", "author", "post__group")
            .distinct()
        )

    def perform_create(self, serializer):
        post = get_object_or_404(
            Post,
            id=self.kwargs["post_id"]
        )

        if not can_access_group(self.request.user, post.group):
            raise PermissionDenied(
                "You must be a group member to comment."
            )

        serializer.save(
            post=post,
            author=self.request.user
        )


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Comment.objects.select_related(
            "post",
            "author",
            "post__group"
        )

        if getattr(self.request.user, "role", None) == "SUPER_ADMIN":
            return queryset

        return queryset.filter(
            Q(post__group__memberships__member=self.request.user)
            | Q(post__group__created_by=self.request.user)
        ).distinct()

    def get_object(self):
        comment = super().get_object()

        if self.request.method not in permissions.SAFE_METHODS:
            if not (
                comment.author == self.request.user
                or comment.post.group.created_by == self.request.user
                or getattr(self.request.user, "role", None) == "SUPER_ADMIN"
            ):
                raise PermissionDenied(
                    "You cannot modify this comment."
                )

        return comment
