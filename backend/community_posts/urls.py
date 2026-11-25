from django.urls import path

from .views import (
    GroupPostListCreateView,
    PostDetailView,
    PostCommentListCreateView,
    CommentDetailView,
)

urlpatterns = [
    # Posts
    path(
        "groups/<int:group_id>/posts/",
        GroupPostListCreateView.as_view(),
        name="group-post-list-create",
    ),

    path(
        "posts/<int:pk>/",
        PostDetailView.as_view(),
        name="post-detail",
    ),

    # Comments
    path(
        "posts/<int:post_id>/comments/",
        PostCommentListCreateView.as_view(),
        name="post-comment-list-create",
    ),

    path(
        "comments/<int:pk>/",
        CommentDetailView.as_view(),
        name="comment-detail",
    ),
]