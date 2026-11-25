import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-eta-swart-67.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieve token from either storage
const getAuthToken = () => {
  return (
    localStorage.getItem("amh_auth_token") ||
    sessionStorage.getItem("amh_auth_token")
  );
};

// Save authentication data
const saveAuthData = (data, remember = true) => {
  const storage = remember ? localStorage : sessionStorage;
  const otherStorage = remember ? sessionStorage : localStorage;

  otherStorage.removeItem("amh_auth_token");
  otherStorage.removeItem("amh_user");

  storage.setItem("amh_auth_token", data.token);
  storage.setItem("amh_user", JSON.stringify(data.user));
};

// Clear authentication data
export const clearAuthData = () => {
  localStorage.removeItem("amh_auth_token");
  localStorage.removeItem("amh_user");

  sessionStorage.removeItem("amh_auth_token");
  sessionStorage.removeItem("amh_user");
};

// Automatically attach authentication token
API.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

// Handle authentication errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
    }

    return Promise.reject(error);
  }
);

// ==============================
// AUTHENTICATION
// ==============================

// LOGIN
export const loginUser = async (credentials, remember = true) => {
  const response = await API.post("/accounts/login/", credentials);

  saveAuthData(response.data, remember);

  return response.data;
};

// REGISTER
export const registerUser = async (userData) => {
  const response = await API.post("/accounts/register/", userData);

  saveAuthData(response.data, true);

  return response.data;
};

// GOOGLE LOGIN
export const googleLogin = async (credential) => {
  const response = await API.post("/accounts/google/", {
    credential,
  });

  saveAuthData(response.data, true);

  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  try {
    await API.post("/accounts/logout/");
  } finally {
    clearAuthData();
  }
};

// GET CURRENT USER
export const getCurrentUser = () => {
  const user =
    localStorage.getItem("amh_user") ||
    sessionStorage.getItem("amh_user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    clearAuthData();
    return null;
  }
};

// ==============================
// COMMUNITY GROUPS
// ==============================

export const getGroups = async () => {
  const response = await API.get("/community/groups/");
  return response.data;
};

export const getMyGroups = async () => {
  const response = await API.get("/community/groups/my-groups/");
  return response.data;
};

export const createGroup = async (groupData) => {
  const response = await API.post("/community/groups/", groupData);
  return response.data;
};

export const requestToJoinGroup = async (groupId) => {
  const response = await API.post(
    `/community/groups/${groupId}/join/`
  );
  return response.data;
};

// ==============================
// GROUP POSTS
// ==============================

export const getGroupPosts = async (groupId) => {
  const response = await API.get(
    `/community/groups/${groupId}/posts/`
  );
  return response.data;
};

export const createGroupPost = async (groupId, content) => {
  const response = await API.post(
    `/community/groups/${groupId}/posts/`,
    { content }
  );
  return response.data;
};

// ==============================
// POST COMMENTS
// ==============================

export const getPostComments = async (postId) => {
  const response = await API.get(
    `/community/posts/${postId}/comments/`
  );
  return response.data;
};

export const createPostComment = async (postId, content) => {
  const response = await API.post(
    `/community/posts/${postId}/comments/`,
    { content }
  );
  return response.data;
};

// ==============================
// APPOINTMENTS
// ==============================

export const submitAppointment = async (appointmentData) => {
  const response = await API.post(
    "/appointments/",
    appointmentData
  );

  return response.data;
};

// ==============================
// HOSPITAL ADMIN DASHBOARD
// ==============================

export const getAdminDashboardStats = async () => {
  const response = await API.get(
    "/appointments/admin/dashboard/stats/"
  );

  return response.data;
};

// ==============================
// HOSPITAL ADMIN APPOINTMENTS
// ==============================

// Get all appointments
export const getAdminAppointments = async () => {
  const response = await API.get(
    "/appointments/admin/appointments/"
  );

  return response.data;
};

// Update appointment status (confirm, cancel, complete)
export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await API.patch(
    `/appointments/admin/appointments/${appointmentId}/status/`,
    { status }
  );

  return response.data;
};

// ==============================
// PUBLIC HOSPITAL EVENTS
// ==============================

// Get all published events
export const getPublicEvents = async () => {
  const response = await API.get("/api/events/");
  return response.data;
};

// Get one published event
export const getPublicEventDetails = async (eventId) => {
  const response = await API.get(`/api/events/${eventId}/`);
  return response.data;
};

// ==============================
// ADMIN EVENT MANAGEMENT
// ==============================

// Get all events, including unpublished events
export const getAdminEvents = async () => {
  const response = await API.get("/api/events/admin/");
  return response.data;
};

// Create an event with an image
export const createAdminEvent = async (eventData) => {
  const response = await API.post(
    "/api/events/admin/",
    eventData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update an existing event
export const updateAdminEvent = async (eventId, eventData) => {
  const response = await API.patch(
    `/api/events/admin/${eventId}/`,
    eventData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete an event
export const deleteAdminEvent = async (eventId) => {
  const response = await API.delete(
    `/api/events/admin/${eventId}/`
  );

  return response.data;
};


// ==============================
// CONTACT MESSAGES
// ==============================

// Submit a public contact message
export const submitContactMessage = async (contactData) => {
  const response = await API.post(
    "/api/contact/",
    contactData
  );

  return response.data;
};





// ==============================
// ADMIN CONTACT MESSAGES
// ==============================

// Get contact message statistics
export const getContactMessageStats = async () => {
  const response = await API.get("/api/contact/admin/stats/");
  return response.data;
};

// Get all contact messages
export const getAdminContactMessages = async () => {
  const response = await API.get("/api/contact/admin/messages/");
  return response.data;
};

// Update contact message status
export const updateContactMessageStatus = async (messageId, status) => {
  const response = await API.patch(
    `/api/contact/admin/messages/${messageId}/status/`,
    { status }
  );

  return response.data;
};







export default API;
