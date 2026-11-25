
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Groups from "../Groups/Groups";

import {
  LayoutDashboard,
  Users,
  Compass,
  MessageSquare,
  CalendarDays,
  Bell,
  Settings,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  Plus,
  HeartPulse,
  LogOut,
  RefreshCw,
  House,
  Clock3,
  Activity,
} from "lucide-react";

import {
  getMyGroups,
  getGroupPosts,
  getCurrentUser,
  logoutUser,
} from "../../../api/api";

import "./Dashboard.css";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "My Groups", icon: Users },
  { name: "Discover Groups", icon: Compass },
  { name: "Community Feed", icon: MessageSquare },
  { name: "Events", icon: CalendarDays },
  { name: "Notifications", icon: Bell },
  { name: "Settings", icon: Settings },
];

const getList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const formatDate = (date) => {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Recently";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function Dashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState(() => getCurrentUser());

  const [myGroups, setMyGroups] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [groupsError, setGroupsError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const isGroupsPage =
    activePage === "My Groups" ||
    activePage === "Discover Groups";

  const displayName =
    user?.full_name ||
    user?.name ||
    user?.username ||
    user?.first_name ||
    "Community Member";

  const displayEmail = user?.email || "Member account";

  const firstName = displayName.split(" ")[0];

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  // Load groups and recent posts
  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      setLoadingGroups(true);
      setLoadingPosts(true);
      setGroupsError("");

      try {
        const response = await getMyGroups();
        const memberships = getList(response);

        if (!isMounted) return;

        setMyGroups(memberships);
        setLoadingGroups(false);

        // Retrieve posts from the groups the user belongs to
        const postResponses = await Promise.allSettled(
          memberships
            .filter((membership) => membership.group)
            .map(async (membership) => {
              const postsResponse = await getGroupPosts(
                membership.group
              );

              return getList(postsResponse).map((post) => ({
                ...post,
                group_name:
                  membership.group_name || "Community Group",
              }));
            })
        );

        if (!isMounted) return;

        const allPosts = postResponses.flatMap((result) =>
          result.status === "fulfilled" ? result.value : []
        );

        const sortedPosts = allPosts.sort(
          (a, b) =>
            new Date(b.created_at || 0) -
            new Date(a.created_at || 0)
        );

        setRecentPosts(sortedPosts.slice(0, 5));
      } catch (error) {
        console.error("Unable to load dashboard:", error);

        if (isMounted) {
          setGroupsError(
            error.response?.data?.detail ||
              "Unable to load your community information. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingGroups(false);
          setLoadingPosts(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate the user's posts
  const myPostsCount = recentPosts.filter(
    (post) =>
      user?.id &&
      String(post.author) === String(user.id)
  ).length;

  // Sign out
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="amh-community-dashboard">

      {/* Mobile header */}
      <header className="amh-community-mobile-header">
        <button
          className="amh-community-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div className="amh-community-mobile-brand">
          <HeartPulse size={25} />
          <span>
            AMH <strong>Community</strong>
          </span>
        </div>

        <Bell size={21} />
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="amh-community-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`amh-community-sidebar ${
          sidebarOpen ? "amh-sidebar-open" : ""
        }`}
      >
        <div className="amh-community-brand">
          <div className="amh-community-brand-icon">
            <HeartPulse size={27} />
          </div>

          <div>
            <h2>AMH Community</h2>
            <span>Connecting people</span>
          </div>

          <button
            className="amh-community-close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="amh-community-nav-label">MENU</div>

        <nav className="amh-community-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`amh-community-nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.name)}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="amh-community-sidebar-bottom">
          <div className="amh-community-help-card">
            <div className="amh-community-help-icon">
              <HeartPulse size={21} />
            </div>

            <h4>Stay connected</h4>

            <p>
              Be part of a community that supports and connects people.
            </p>
          </div>

          <button
            className="amh-community-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={18} />
            <span>
              {loggingOut ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="amh-community-main">

        {/* Top navigation */}
        <div className="amh-community-topbar">
          <div className="amh-community-topbar-left">
            <Link
              to="/"
              className="amh-community-home-icon"
              title="Hospital Homepage"
              aria-label="Go to hospital homepage"
            >
              <House size={19} />
            </Link>

            <div className="amh-community-breadcrumb">
              <span>Community</span>
              <ChevronRight size={15} />
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="amh-community-topbar-actions">
            <button
              className="amh-community-search-button"
              aria-label="Search"
              onClick={() => handleNavigation("Discover Groups")}
            >
              <Search size={19} />
            </button>

            <button
              className="amh-community-notification-button"
              aria-label="Notifications"
              onClick={() => handleNavigation("Notifications")}
            >
              <Bell size={20} />
            </button>

            <div className="amh-community-user-profile">
              <div className="amh-community-avatar">
                {getInitials(displayName)}
              </div>

              <div>
                <strong>{displayName}</strong>
                <span>{displayEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="amh-community-content">

          {/* OVERVIEW */}
          {activePage === "Overview" && (
            <>
              {/* Welcome section */}
              <section className="amh-community-welcome">
                <div className="amh-community-welcome-content">
                  <span className="amh-community-welcome-label">
                    YOUR COMMUNITY SPACE
                  </span>

                  <h1>
                    Welcome back, {firstName}.
                  </h1>

                  <p>
                    Stay connected, share experiences and grow
                    together with the Ahmadiyya Muslim Hospital
                    community.
                  </p>

                  <div className="amh-community-welcome-actions">
                    <button
                      className="amh-community-primary-button"
                      onClick={() =>
                        handleNavigation("Discover Groups")
                      }
                    >
                      Explore Groups
                      <ArrowUpRight size={18} />
                    </button>

                    <button
                      className="amh-community-welcome-secondary"
                      onClick={() =>
                        handleNavigation("Community Feed")
                      }
                    >
                      View Community Feed
                    </button>
                  </div>
                </div>

                <div className="amh-community-welcome-art">
                  <div className="amh-community-art-circle">
                    <Users size={82} strokeWidth={1.15} />
                  </div>

                  <span className="amh-community-art-dot dot-one" />
                  <span className="amh-community-art-dot dot-two" />
                  <span className="amh-community-art-dot dot-three" />
                </div>
              </section>

              {/* Overview heading */}
              <section className="amh-community-section-heading">
                <div>
                  <h2>Your Community Overview</h2>
                  <p>
                    A snapshot of your participation and activity.
                  </p>
                </div>

                <span className="amh-community-overview-date">
                  <Activity size={16} />
                  Community dashboard
                </span>
              </section>

              {/* Statistics */}
              <section className="amh-community-overview-grid">
                <div className="amh-community-overview-card">
                  <div className="amh-community-overview-card-top">
                    <div className="amh-community-overview-icon green">
                      <Users size={22} />
                    </div>
                    <span className="amh-community-stat-tag">
                      Groups
                    </span>
                  </div>

                  <h3>
                    {loadingGroups ? "..." : myGroups.length}
                  </h3>

                  <span className="amh-community-stat-title">
                    My Groups
                  </span>

                  <p>Communities you belong to</p>
                </div>

                <div className="amh-community-overview-card">
                  <div className="amh-community-overview-card-top">
                    <div className="amh-community-overview-icon purple">
                      <MessageSquare size={22} />
                    </div>
                    <span className="amh-community-stat-tag">
                      Posts
                    </span>
                  </div>

                  <h3>
                    {loadingPosts ? "..." : myPostsCount}
                  </h3>

                  <span className="amh-community-stat-title">
                    My Posts
                  </span>

                  <p>
                    Your posts in your groups
                  </p>
                </div>

                <div className="amh-community-overview-card">
                  <div className="amh-community-overview-card-top">
                    <div className="amh-community-overview-icon orange">
                      <CalendarDays size={22} />
                    </div>
                    <span className="amh-community-stat-tag">
                      Events
                    </span>
                  </div>

                  <h3>—</h3>

                  <span className="amh-community-stat-title">
                    Upcoming Events
                  </span>

                  <p>Community events and activities</p>
                </div>

                <div className="amh-community-overview-card">
                  <div className="amh-community-overview-card-top">
                    <div className="amh-community-overview-icon blue">
                      <Bell size={22} />
                    </div>
                    <span className="amh-community-stat-tag">
                      Updates
                    </span>
                  </div>

                  <h3>
                    {loadingPosts ? "..." : recentPosts.length}
                  </h3>

                  <span className="amh-community-stat-title">
                    Recent Posts
                  </span>

                  <p>Latest posts from your groups</p>
                </div>
              </section>

              {/* Main dashboard panels */}
              <div className="amh-community-lower-grid">

                {/* My groups */}
                <section className="amh-community-panel">
                  <div className="amh-community-panel-heading">
                    <div>
                      <h2>My Groups</h2>
                      <p>
                        Your communities and connections.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleNavigation("My Groups")
                      }
                      className="amh-community-text-link"
                    >
                      View all <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <div className="amh-community-groups-list">
                    {loadingGroups ? (
                      <div className="amh-community-loading">
                        <RefreshCw size={19} />
                        <span>Loading your groups...</span>
                      </div>
                    ) : groupsError ? (
                      <p>{groupsError}</p>
                    ) : myGroups.length > 0 ? (
                      myGroups.slice(0, 4).map((membership) => {
                        const groupName =
                          membership.group_name ||
                          "Community Group";

                        return (
                          <div
                            className="amh-community-group-item"
                            key={membership.id}
                          >
                            <div className="amh-community-group-avatar green">
                              {getInitials(groupName)}
                            </div>

                            <div className="amh-community-group-info">
                              <strong>{groupName}</strong>
                              <span>Member</span>
                            </div>

                            <ChevronRight size={19} />
                          </div>
                        );
                      })
                    ) : (
                      <div className="amh-community-empty-preview">
                        <Users size={27} />
                        <p>
                          You haven't joined any groups yet.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    className="amh-community-outline-button"
                    onClick={() =>
                      handleNavigation("Discover Groups")
                    }
                  >
                    <Plus size={18} />
                    Discover More Groups
                  </button>
                </section>

                {/* Recent activity */}
                <section className="amh-community-panel">
                  <div className="amh-community-panel-heading">
                    <div>
                      <h2>Recent Activity</h2>
                      <p>
                        The latest conversations in your groups.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleNavigation("Community Feed")
                      }
                      className="amh-community-text-link"
                    >
                      View feed <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <div className="amh-community-activity-list">
                    {loadingPosts ? (
                      <div className="amh-community-loading">
                        <RefreshCw size={19} />
                        <span>Loading recent activity...</span>
                      </div>
                    ) : recentPosts.length > 0 ? (
                      recentPosts.slice(0, 4).map((post) => (
                        <div
                          className="amh-community-activity-item"
                          key={post.id}
                        >
                          <div className="amh-community-activity-avatar">
                            <MessageSquare size={18} />
                          </div>

                          <div className="amh-community-activity-content">
                            <div className="amh-community-activity-meta">
                              <strong>
                                {post.author_name || "Community Member"}
                              </strong>
                              <span>
                                {formatDate(post.created_at)}
                              </span>
                            </div>

                            <p>{post.content}</p>

                            <span className="amh-community-activity-group">
                              {post.group_name}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="amh-community-empty-preview">
                        <MessageSquare size={27} />
                        <p>
                          No recent posts yet. Start a conversation
                          in one of your groups.
                        </p>

                        <button
                          className="amh-community-inline-link"
                          onClick={() =>
                            handleNavigation("My Groups")
                          }
                        >
                          Visit my groups
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Community updates */}
              <section className="amh-community-panel amh-community-notifications-panel">
                <div className="amh-community-panel-heading">
                  <div>
                    <h2>Stay Connected</h2>
                    <p>
                      Make the most of your community experience.
                    </p>
                  </div>
                </div>

                <div className="amh-community-quick-actions">
                  <button
                    className="amh-community-quick-action"
                    onClick={() =>
                      handleNavigation("Discover Groups")
                    }
                  >
                    <div className="quick-action-icon green">
                      <Compass size={21} />
                    </div>
                    <div>
                      <strong>Discover Communities</strong>
                      <span>Find groups that interest you.</span>
                    </div>
                    <ArrowUpRight size={18} />
                  </button>

                  <button
                    className="amh-community-quick-action"
                    onClick={() =>
                      handleNavigation("Community Feed")
                    }
                  >
                    <div className="quick-action-icon purple">
                      <MessageSquare size={21} />
                    </div>
                    <div>
                      <strong>Join the Conversation</strong>
                      <span>Share ideas and connect with members.</span>
                    </div>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </section>
            </>
          )}

          {/* GROUPS */}
          {isGroupsPage && (
            <Groups activeSection={activePage} />
          )}

          {/* OTHER DASHBOARD SECTIONS */}
          {![
            "Overview",
            "My Groups",
            "Discover Groups",
          ].includes(activePage) && (
            <section className="amh-community-placeholder">
              <div className="amh-community-placeholder-icon">
                {(() => {
                  const selected = navigation.find(
                    (item) => item.name === activePage
                  );

                  const Icon = selected?.icon || LayoutDashboard;

                  return <Icon size={35} />;
                })()}
              </div>

              <h1>{activePage}</h1>

              <p>
                This section is part of your community dashboard.
                We will build its functionality in the next stages.
              </p>

              <button
                className="amh-community-primary-button"
                onClick={() => handleNavigation("Overview")}
              >
                Back to Overview
                <ArrowUpRight size={18} />
              </button>
            </section>
          )}

          {/* Footer */}
          <footer className="amh-community-footer">
            <span>Ahmadiyya Muslim Hospital Community</span>
            <span>
              Connecting people. Supporting humanity.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
