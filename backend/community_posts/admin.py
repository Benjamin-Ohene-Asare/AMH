
from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "group", "author", "created_at", "updated_at")
    search_fields = ("content", "author__username", "group__name")
    list_filter = ("created_at", "group")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "author", "created_at")
    search_fields = ("content", "author__username")
    list_filter = ("created_at",)
    readonly_fields = ("created_at", "updated_at")
