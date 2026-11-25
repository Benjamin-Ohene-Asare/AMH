
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  HeartPulse,
} from "lucide-react";

import { loginUser, googleLogin } from "../../../api/api";
import "./Login.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Redirect users according to their account role
  const redirectUser = (user) => {
    if (user?.role === "SUPER_ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/community/dashboard", { replace: true });
    }
  };

  // Google authentication response
  const handleGoogleResponse = useCallback(async (response) => {
    setError("");
    setLoading(true);

    try {
      const data = await googleLogin(response.credential);

      redirectUser(data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Load and initialize Google Identity Services
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleButtonRef.current) return;

    let cancelled = false;

    const initializeGoogle = () => {
      if (
        cancelled ||
        !window.google?.accounts?.id ||
        !googleButtonRef.current
      ) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: "continue_with",
          width: 350,
        }
      );
    };

    let script = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (window.google?.accounts?.id) {
      initializeGoogle();
    } else if (script) {
      script.addEventListener("load", initializeGoogle);
    } else {
      script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initializeGoogle);
    };
  }, [handleGoogleResponse]);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Email/username login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(
        {
          username: formData.email.trim(),
          password: formData.password,
        },
        formData.remember
      );

      redirectUser(data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to sign in. Please check your login details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="amh-auth-page">
      <div className="amh-auth-container">

        {/* LEFT VISUAL SECTION */}
        <section className="amh-auth-visual">

          <div className="amh-auth-brand">
            <div className="amh-auth-brand-icon">
              <HeartPulse size={25} />
            </div>

            <div>
              <h2>Ahmadiyya</h2>
              <span>Muslim Hospital</span>
            </div>
          </div>

          <div className="amh-auth-visual-content">
            <span className="amh-auth-label">OUR COMMUNITY</span>

            <h1>
              Connecting people.
              <span> Supporting humanity.</span>
            </h1>

            <p>
              Be part of a community where people connect,
              share experiences and stay informed about
              hospital activities and events.
            </p>
          </div>

          <div className="amh-auth-visual-footer">
            Healthcare. Community. Humanity.
          </div>

        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="amh-auth-form-section">
          <div className="amh-auth-form-wrapper">

            <div className="amh-auth-mobile-brand">
              <HeartPulse size={25} />
              <span>Ahmadiyya Muslim Hospital</span>
            </div>

            <div className="amh-auth-heading">
              <h2>Welcome back</h2>
              <p>Sign in to continue to your account.</p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="amh-auth-error" role="alert">
                {error}
              </div>
            )}

            {/* GOOGLE LOGIN */}
            <div className="amh-auth-google-wrapper">
              <div
                ref={googleButtonRef}
                className="amh-auth-google"
              />

              {!GOOGLE_CLIENT_ID && (
                <p className="amh-auth-error">
                  Google Sign-In is not configured yet.
                </p>
              )}
            </div>

            <div className="amh-auth-or">
              <span>OR CONTINUE WITH EMAIL</span>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="amh-auth-form">

              <div className="amh-auth-field">
                <label htmlFor="email">
                  Email or Username
                </label>

                <div className="amh-auth-input">
                  <Mail size={19} />

                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email or username"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="amh-auth-field">

                <div className="amh-auth-password-label">
                  <label htmlFor="password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <div className="amh-auth-input">
                  <LockKeyhole size={19} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="amh-auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

              </div>

              {/* REMEMBER ME */}
              <label className="amh-auth-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />

                <span>Remember me</span>
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                className="amh-auth-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}

                {!loading && <ArrowRight size={19} />}
              </button>

            </form>

            <div className="amh-auth-divider">
              <span>NEW TO OUR COMMUNITY?</span>
            </div>

            <p className="amh-auth-signup">
              Don't have an account?
              <Link to="/signup"> Create an account</Link>
            </p>

            <p className="amh-auth-terms">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Login;
