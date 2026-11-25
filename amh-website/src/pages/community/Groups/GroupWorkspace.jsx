
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Send,
  Users,
  MessageCircle,
  RefreshCw,
  UserRound,
} from "lucide-react";

import {
  getGroupPosts,
  createGroupPost,
  getPostComments,
  createPostComment,
  getCurrentUser,
} from "../../../api/api";

import "./GroupWorkspace.css";

const getList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function GroupWorkspace({ group, onBack }) {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentUser = getCurrentUser();

  const loadPosts = useCallback(async () => {
    if (!group?.id) return;

    setLoading(true);
    setError("");

    try {
      const response = await getGroupPosts(group.id);
      const postList = getList(response);

      const postsWithComments = await Promise.all(
        postList.map(async (post) => {
          try {
            const commentsResponse = await getPostComments(post.id);

            return {
              ...post,
              comments: getList(commentsResponse),
            };
          } catch {
            return {
              ...post,
              comments: post.comments || [],
            };
          }
        })
      );

      setPosts(postsWithComments);
    } catch (err) {
      console.error("Unable to load group posts:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to load group posts. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [group?.id]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handlePublishPost = async (event) => {
    event.preventDefault();

    if (!postContent.trim()) return;

    setPublishing(true);
    setError("");
    setSuccess("");

    try {
      await createGroupPost(group.id, postContent.trim());

      setPostContent("");
      setSuccess("Your post has been published.");
      await loadPosts();
    } catch (err) {
      console.error("Unable to publish post:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to publish your post. Please try again."
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleComment = async (event, postId) => {
    event.preventDefault();

    const content = commentInputs[postId]?.trim();

    if (!content) return;

    setCommentingPostId(postId);
    setError("");

    try {
      await createPostComment(postId, content);

      setCommentInputs((previous) => ({
        ...previous,
        [postId]: "",
      }));

      await loadPosts();
    } catch (err) {
      console.error("Unable to add comment:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to add your comment. Please try again."
      );
    } finally {
      setCommentingPostId(null);
    }
  };

  return (
    <main className="amh-group-workspace">
      <header className="amh-workspace-header">
        <button
          type="button"
          className="amh-workspace-back"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to My Groups
        </button>

        <div className="amh-workspace-group-info">
          <div className="amh-workspace-group-icon">
            <Users size={27} />
          </div>

          <div>
            <span>{group.category}</span>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
          </div>
        </div>

        <div className="amh-workspace-member-count">
          <Users size={17} />
          {group.member_count ?? group.members ?? 0} members
        </div>
      </header>

      <div className="amh-workspace-content">
        <section className="amh-workspace-feed">
          <div className="amh-workspace-section-heading">
            <div>
              <h2>Group Discussion</h2>
              <p>Share updates and connect with your group members.</p>
            </div>

            <button
              type="button"
              className="amh-workspace-refresh"
              onClick={loadPosts}
              disabled={loading}
              aria-label="Refresh posts"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          {error && (
            <div className="amh-workspace-message error">
              {error}
            </div>
          )}

          {success && (
            <div className="amh-workspace-message success">
              {success}
            </div>
          )}

          <form
            className="amh-create-post"
            onSubmit={handlePublishPost}
          >
            <div className="amh-workspace-avatar">
              {getInitials(
                currentUser?.first_name ||
                currentUser?.username ||
                "You"
              )}
            </div>

            <div className="amh-create-post-field">
              <textarea
                placeholder={`Share something with ${group.name}...`}
                value={postContent}
                onChange={(event) =>
                  setPostContent(event.target.value)
                }
                rows={3}
                maxLength={3000}
                required
              />

              <div className="amh-create-post-footer">
                <span>{postContent.length}/3000</span>

                <button
                  type="submit"
                  disabled={publishing || !postContent.trim()}
                >
                  <Send size={16} />
                  {publishing ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </div>
          </form>

          <div className="amh-workspace-posts">
            {loading ? (
              <div className="amh-workspace-loading">
                <RefreshCw className="amh-workspace-spinner" size={25} />
                <p>Loading group discussions...</p>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <article
                  className="amh-workspace-post"
                  key={post.id}
                >
                  <div className="amh-post-header">
                    <div className="amh-workspace-avatar">
                      {getInitials(post.author_name)}
                    </div>

                    <div className="amh-post-author">
                      <strong>{post.author_name || "Group Member"}</strong>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  <div className="amh-post-content">
                    {post.content}
                  </div>

                  <div className="amh-post-comment-count">
                    <MessageCircle size={16} />
                    {post.comments?.length || 0} comments
                  </div>

                  <div className="amh-post-comments">
                    {post.comments?.map((comment) => (
                      <div
                        className="amh-post-comment"
                        key={comment.id}
                      >
                        <div className="amh-workspace-avatar small">
                          {getInitials(comment.author_name)}
                        </div>

                        <div className="amh-comment-body">
                          <div className="amh-comment-bubble">
                            <strong>
                              {comment.author_name || "Member"}
                            </strong>
                            <p>{comment.content}</p>
                          </div>

                          <span>
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    className="amh-comment-form"
                    onSubmit={(event) =>
                      handleComment(event, post.id)
                    }
                  >
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(event) =>
                        setCommentInputs((previous) => ({
                          ...previous,
                          [post.id]: event.target.value,
                        }))
                      }
                      maxLength={2000}
                      required
                    />

                    <button
                      type="submit"
                      disabled={
                        commentingPostId === post.id ||
                        !commentInputs[post.id]?.trim()
                      }
                      aria-label="Send comment"
                    >
                      <Send size={17} />
                    </button>
                  </form>
                </article>
              ))
            ) : (
              <div className="amh-workspace-empty">
                <div>
                  <MessageCircle size={30} />
                </div>
                <h3>No discussions yet</h3>
                <p>
                  Be the first to share something with this group.
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="amh-workspace-sidebar">
          <div className="amh-workspace-about">
            <h3>About this group</h3>
            <p>{group.description}</p>

            <div className="amh-workspace-about-detail">
              <Users size={18} />
              <span>
                {group.member_count ?? group.members ?? 0} members
              </span>
            </div>

            <div className="amh-workspace-about-detail">
              <UserRound size={18} />
              <span>
                Created by {group.creator_name || "Group Admin"}
              </span>
            </div>
          </div>

          <div className="amh-workspace-guidelines">
            <h3>Community Guidelines</h3>
            <p>
              Keep discussions respectful, helpful and relevant to
              the purpose of this group.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
