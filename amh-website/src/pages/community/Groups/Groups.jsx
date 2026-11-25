
import React, { useEffect, useState, useCallback } from "react";
import {
  Users,
  Plus,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock3,
  X,
  Compass,
  UserRound,
  RefreshCw,
} from "lucide-react";

import {
  getGroups,
  getMyGroups,
  createGroup,
  requestToJoinGroup,
  getCurrentUser,
} from "../../../api/api";

import GroupWorkspace from "./GroupWorkspace";
import "./Groups.css";

const emptyForm = {
  name: "",
  category: "",
  description: "",
};

const getList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function Groups({ activeSection = "My Groups" }) {
  const [activeTab, setActiveTab] = useState(
    activeSection === "Discover Groups" ? "discover" : "my-groups"
  );

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [allGroups, setAllGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [joiningGroupId, setJoiningGroupId] = useState(null);

  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState(emptyForm);

  const currentUser = getCurrentUser();

  // Keep dashboard navigation and tabs synchronised.
  useEffect(() => {
    setActiveTab(
      activeSection === "Discover Groups" ? "discover" : "my-groups"
    );
  }, [activeSection]);

  // Load groups and the current user's memberships.
  const loadGroups = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [groupsResponse, membershipsResponse] = await Promise.all([
        getGroups(),
        getMyGroups(),
      ]);

      const groups = getList(groupsResponse);
      const memberships = getList(membershipsResponse);

      const membershipIds = new Set(
        memberships.map((membership) => Number(membership.group))
      );

      const joinedGroups = groups
        .filter((group) => membershipIds.has(Number(group.id)))
        .map((group) => ({
          ...group,
          members: group.member_count ?? 0,
          isAdmin:
            Number(group.created_by) === Number(currentUser?.id),
        }));

      setAllGroups(groups);
      setMyGroups(joinedGroups);
    } catch (error) {
      console.error("Unable to load community groups:", error);

      setLoadError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Unable to load groups. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  // Form input handler.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  // Create a group through Django.
  const handleCreateGroup = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      setFormError("Please complete all the fields.");
      return;
    }

    setIsCreating(true);
    setFormError("");
    setSuccessMessage("");

    try {
      await createGroup({
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
      });

      setFormData(emptyForm);
      setShowCreateModal(false);
      setActiveTab("my-groups");
      setSuccessMessage("Your community group has been created successfully.");

      await loadGroups();
    } catch (error) {
      console.error("Group creation failed:", error);

      const responseData = error.response?.data;

      setFormError(
        responseData?.message ||
        responseData?.detail ||
        (typeof responseData === "object"
          ? Object.values(responseData).flat().join(" ")
          : "Unable to create group. Please try again.")
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Send a real join request to Django.
  const handleJoinRequest = async (groupId) => {
    setJoiningGroupId(groupId);
    setLoadError("");
    setSuccessMessage("");

    try {
      await requestToJoinGroup(groupId);

      setJoinRequests((previous) =>
        previous.includes(groupId)
          ? previous
          : [...previous, groupId]
      );

      setSuccessMessage("Your request to join has been sent.");
    } catch (error) {
      console.error("Join request failed:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Unable to send your join request.";

      setLoadError(message);
    } finally {
      setJoiningGroupId(null);
    }
  };

  // Search available groups.
  const myGroupIds = new Set(
    myGroups.map((group) => Number(group.id))
  );

  const filteredDiscoverGroups = allGroups
    .filter((group) => !myGroupIds.has(Number(group.id)))
    .filter((group) => {
      const search = searchTerm.toLowerCase();

      return (
        group.name?.toLowerCase().includes(search) ||
        group.category?.toLowerCase().includes(search) ||
        group.description?.toLowerCase().includes(search)
      );
    });

  // Open the selected group's workspace.
  const handleOpenGroup = (group) => {
    setSelectedGroup(group);
    setLoadError("");
    setSuccessMessage("");
  };

  // Display the workspace instead of the group listing.
  if (selectedGroup) {
    return (
      <GroupWorkspace
        group={selectedGroup}
        onBack={() => {
          setSelectedGroup(null);
          loadGroups();
        }}
      />
    );
  }

  return (
    <main className="amh-groups-page">

      {/* Page heading */}
      <section className="amh-groups-heading">
        <div>
          <h1>
            {activeTab === "my-groups"
              ? "My Groups"
              : "Discover Groups"}
          </h1>

          <p>
            {activeTab === "my-groups"
              ? "Manage your communities and stay connected with your groups."
              : "Explore communities, find people with shared interests and connect."}
          </p>
        </div>

        <button
          className="amh-groups-create-button"
          onClick={() => {
            setFormError("");
            setShowCreateModal(true);
          }}
        >
          <Plus size={18} />
          Create a Group
        </button>
      </section>

      {/* Overview */}
      <section className="amh-groups-overview">
        <div className="amh-groups-overview-icon">
          <Users size={25} />
        </div>

        <div>
          <span>Your Groups</span>
          <h2>{myGroups.length}</h2>
          <p>Groups you have created or joined</p>
        </div>
      </section>

      {/* Notifications */}
      {successMessage && (
        <div className="amh-groups-success-message">
          {successMessage}

          <button
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {loadError && (
        <div className="amh-groups-error-message">
          {loadError}

          <button
            onClick={() => setLoadError("")}
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs and search */}
      <section className="amh-groups-toolbar">
        <div className="amh-groups-tabs">
          <button
            className={activeTab === "my-groups" ? "active" : ""}
            onClick={() => setActiveTab("my-groups")}
          >
            <Users size={17} />
            My Groups
            <span>{myGroups.length}</span>
          </button>

          <button
            className={activeTab === "discover" ? "active" : ""}
            onClick={() => setActiveTab("discover")}
          >
            <Compass size={17} />
            Discover Groups
          </button>
        </div>

        {activeTab === "discover" && (
          <div className="amh-groups-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        )}
      </section>

      {/* Loading state */}
      {loading ? (
        <div className="amh-groups-loading">
          <RefreshCw size={25} className="amh-groups-spinner" />
          <p>Loading community groups...</p>
        </div>
      ) : (
        <>
          {/* My Groups */}
          {activeTab === "my-groups" && (
            <section className="amh-groups-grid">
              {myGroups.length > 0 ? (
                myGroups.map((group) => (
                  <article className="amh-group-card" key={group.id}>
                    <div className="amh-group-card-top">
                      <div className="amh-group-card-icon">
                        <Users size={25} />
                      </div>

                      {group.isAdmin && (
                        <span className="amh-group-admin-badge">
                          <ShieldCheck size={14} />
                          Group Admin
                        </span>
                      )}
                    </div>

                    <span className="amh-group-category">
                      {group.category}
                    </span>

                    <h3>{group.name}</h3>
                    <p>{group.description}</p>

                    <div className="amh-group-card-footer">
                      <span>
                        <UserRound size={15} />
                        {group.members} member
                        {group.members === 1 ? "" : "s"}
                      </span>

                      <button
                        onClick={() => handleOpenGroup(group)}
                      >
                        Open Group <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="amh-groups-empty">
                  <div className="amh-groups-empty-icon">
                    <Users size={32} />
                  </div>

                  <h2>You haven't joined any groups yet</h2>

                  <p>
                    Create your own group or discover existing groups to
                    connect with other members.
                  </p>

                  <div className="amh-groups-empty-actions">
                    <button
                      className="amh-groups-create-button"
                      onClick={() => setShowCreateModal(true)}
                    >
                      <Plus size={17} />
                      Create a Group
                    </button>

                    <button
                      className="amh-groups-secondary-button"
                      onClick={() => setActiveTab("discover")}
                    >
                      Discover Groups
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Discover Groups */}
          {activeTab === "discover" && (
            <section className="amh-groups-grid">
              {filteredDiscoverGroups.length > 0 ? (
                filteredDiscoverGroups.map((group) => {
                  const requested = joinRequests.includes(group.id);
                  const joining = joiningGroupId === group.id;

                  return (
                    <article className="amh-group-card" key={group.id}>
                      <div className="amh-group-card-top">
                        <div className="amh-group-card-icon">
                          <Users size={25} />
                        </div>

                        <span className="amh-group-open-label">
                          Community group
                        </span>
                      </div>

                      <span className="amh-group-category">
                        {group.category}
                      </span>

                      <h3>{group.name}</h3>
                      <p>{group.description}</p>

                      <div className="amh-group-card-footer">
                        <span>
                          <UserRound size={15} />
                          {group.member_count ?? 0} members
                        </span>

                        <button
                          className={requested ? "requested" : ""}
                          disabled={requested || joining}
                          onClick={() => handleJoinRequest(group.id)}
                        >
                          {joining ? (
                            "Sending..."
                          ) : requested ? (
                            <>
                              <Clock3 size={15} />
                              Request Sent
                            </>
                          ) : (
                            <>
                              Request to Join
                              <ArrowRight size={15} />
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="amh-groups-no-results">
                  <Search size={30} />
                  <h3>No groups found</h3>

                  <p>
                    {searchTerm
                      ? "Try searching with another name or category."
                      : "There are no other groups available yet."}
                  </p>
                </div>
              )}
            </section>
          )}
        </>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div
          className="amh-create-group-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isCreating) {
              setShowCreateModal(false);
            }
          }}
        >
          <section
            className="amh-create-group-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="amh-create-group-title"
          >
            <div className="amh-create-group-heading">
              <div>
                <span>Create a community</span>

                <h2 id="amh-create-group-title">
                  Start a New Group
                </h2>

                <p>
                  Bring people together around a shared interest or purpose.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                aria-label="Close modal"
                disabled={isCreating}
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleCreateGroup}>
              <label htmlFor="group-name">Group Name</label>

              <input
                id="group-name"
                name="name"
                type="text"
                placeholder="Enter a group name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={150}
                required
              />

              <label htmlFor="group-category">Group Category</label>

              <select
                id="group-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a category</option>
                <option value="Health & Wellness">
                  Health & Wellness
                </option>
                <option value="Youth & Development">
                  Youth & Development
                </option>
                <option value="Family & Support">
                  Family & Support
                </option>
                <option value="Education">Education</option>
                <option value="Community Service">
                  Community Service
                </option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="group-description">
                About This Group
              </label>

              <textarea
                id="group-description"
                name="description"
                placeholder="Explain what the group is about and who it is for..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                required
              />

              {formError && (
                <p className="amh-form-error">
                  {formError}
                </p>
              )}

              <div className="amh-create-group-admin-note">
                <ShieldCheck size={19} />

                <p>
                  You will automatically become the Group Admin and manage
                  requests from people who want to join.
                </p>
              </div>

              <div className="amh-create-group-actions">
                <button
                  type="button"
                  className="amh-create-group-cancel"
                  onClick={() => setShowCreateModal(false)}
                  disabled={isCreating}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="amh-create-group-submit"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    "Creating..."
                  ) : (
                    <>
                      <Plus size={17} />
                      Create Group
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
