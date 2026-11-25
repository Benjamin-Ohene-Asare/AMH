from django.urls import path

from .views import (
    GroupListCreateView,
    GroupDetailView,
    JoinGroupView,
    GroupJoinRequestListView,
    GroupJoinRequestDecisionView,
    MyGroupsView,
)

urlpatterns = [
    path(
        "",
        GroupListCreateView.as_view(),
        name="group-list-create",
    ),

    path(
        "<int:pk>/",
        GroupDetailView.as_view(),
        name="group-detail",
    ),

    path(
        "<int:group_id>/join/",
        JoinGroupView.as_view(),
        name="group-join",
    ),

    path(
        "<int:group_id>/requests/",
        GroupJoinRequestListView.as_view(),
        name="group-join-requests",
    ),

    path(
        "requests/<int:request_id>/decision/",
        GroupJoinRequestDecisionView.as_view(),
        name="group-join-request-decision",
    ),

    path(
        "my-groups/",
        MyGroupsView.as_view(),
        name="my-groups",
    ),
]