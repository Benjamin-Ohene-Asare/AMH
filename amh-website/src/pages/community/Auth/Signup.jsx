
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   UserRound,
//   Mail,
//   Phone,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   HeartPulse,
// } from "lucide-react";

// import { registerUser } from "../../../api/api";
// import "./Signup.css";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (!formData.agree) {
//       setError("Please accept the Terms and Privacy Policy.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Your password must contain at least 8 characters.");
//       return;
//     }

//     const nameParts = formData.fullName.trim().split(/\s+/);
//     const firstName = nameParts[0];
//     const lastName = nameParts.slice(1).join(" ");

//     if (!lastName) {
//       setError("Please enter your first and last name.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await registerUser({
//         username: formData.email.trim().toLowerCase(),
//         email: formData.email.trim().toLowerCase(),
//         first_name: firstName,
//         last_name: lastName,
//         phone: formData.phone.trim(),
//         password: formData.password,
//       });

//       navigate("/community/dashboard", { replace: true });

//     } catch (err) {
//       const data = err.response?.data;

//       if (data && typeof data === "object") {
//         const firstError = Object.values(data).flat()[0];

//         setError(
//           typeof firstError === "string"
//             ? firstError
//             : "Registration failed. Please check your information."
//         );
//       } else {
//         setError("Unable to create your account. Please try again.");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = () => {
//     navigate("/login");
//   };

//   return (
//     <main className="amh-signup-page">
//       <div className="amh-signup-container">

//         <section className="amh-signup-visual">
//           <div className="amh-signup-brand">
//             <div className="amh-signup-brand-icon">
//               <HeartPulse size={25} />
//             </div>

//             <div>
//               <h2>Ahmadiyya</h2>
//               <span>Muslim Hospital</span>
//             </div>
//           </div>

//           <div className="amh-signup-visual-content">
//             <span className="amh-signup-label">JOIN OUR COMMUNITY</span>

//             <h1>
//               Be part of something
//               <span> meaningful.</span>
//             </h1>

//             <p>
//               Create your account, connect with people,
//               discover communities, participate in discussions
//               and stay connected with hospital activities.
//             </p>

//             <div className="amh-signup-benefits">
//               <div>
//                 <span className="amh-signup-benefit-icon">01</span>
//                 <span>Connect with communities</span>
//               </div>

//               <div>
//                 <span className="amh-signup-benefit-icon">02</span>
//                 <span>Discover upcoming events</span>
//               </div>

//               <div>
//                 <span className="amh-signup-benefit-icon">03</span>
//                 <span>Share ideas and experiences</span>
//               </div>
//             </div>
//           </div>

//           <div className="amh-signup-visual-footer">
//             Healthcare. Community. Humanity.
//           </div>
//         </section>

//         <section className="amh-signup-form-section">
//           <div className="amh-signup-form-wrapper">

//             <div className="amh-signup-mobile-brand">
//               <HeartPulse size={25} />
//               <span>Ahmadiyya Muslim Hospital</span>
//             </div>

//             <div className="amh-signup-heading">
//               <h2>Create your account</h2>
//               <p>Join our community and get connected.</p>
//             </div>

//             {error && (
//               <div className="amh-auth-error" role="alert">
//                 {error}
//               </div>
//             )}

//             <button
//               type="button"
//               className="amh-signup-google"
//               onClick={handleGoogleSignup}
//               disabled={loading}
//             >
//               <svg viewBox="0 0 48 48" aria-hidden="true">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/>
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.08 46.98 31.88 46.98 24.55Z"/>
//                 <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19Z"/>
//                 <path fill="#34A853" d="M24 48c6.47 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/>
//               </svg>
//               Sign up with Google
//             </button>

//             <div className="amh-signup-or">
//               <span>OR REGISTER WITH EMAIL</span>
//             </div>

//             <form onSubmit={handleSubmit} className="amh-signup-form">

//               <div className="amh-signup-field">
//                 <label htmlFor="fullName">Full Name</label>

//                 <div className="amh-signup-input">
//                   <UserRound size={18} />

//                   <input
//                     id="fullName"
//                     type="text"
//                     name="fullName"
//                     placeholder="Enter your full name"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     autoComplete="name"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="amh-signup-field">
//                 <label htmlFor="signupEmail">Email Address</label>

//                 <div className="amh-signup-input">
//                   <Mail size={18} />

//                   <input
//                     id="signupEmail"
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="amh-signup-field">
//                 <label htmlFor="phone">Phone Number</label>

//                 <div className="amh-signup-input">
//                   <Phone size={18} />

//                   <input
//                     id="phone"
//                     type="tel"
//                     name="phone"
//                     placeholder="Enter your phone number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     autoComplete="tel"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="amh-signup-field">
//                 <label htmlFor="signupPassword">Password</label>

//                 <div className="amh-signup-input">
//                   <LockKeyhole size={18} />

//                   <input
//                     id="signupPassword"
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     autoComplete="new-password"
//                     minLength={8}
//                     required
//                   />

//                   <button
//                     type="button"
//                     className="amh-signup-password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>

//                 <small>Use at least 8 characters.</small>
//               </div>

//               <div className="amh-signup-field">
//                 <label htmlFor="confirmPassword">Confirm Password</label>

//                 <div className="amh-signup-input">
//                   <LockKeyhole size={18} />

//                   <input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     autoComplete="new-password"
//                     minLength={8}
//                     required
//                   />

//                   <button
//                     type="button"
//                     className="amh-signup-password-toggle"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     aria-label={
//                       showConfirmPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff size={18} />
//                     ) : (
//                       <Eye size={18} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <label className="amh-signup-agreement">
//                 <input
//                   type="checkbox"
//                   name="agree"
//                   checked={formData.agree}
//                   onChange={handleChange}
//                   required
//                 />

//                 <span>
//                   I agree to the <Link to="/terms">Terms of Service</Link>
//                   {" "}and <Link to="/privacy">Privacy Policy</Link>.
//                 </span>
//               </label>

//               <button
//                 type="submit"
//                 className="amh-signup-submit"
//                 disabled={loading}
//               >
//                 {loading ? "Creating account..." : "Create Account"}
//                 {!loading && <ArrowRight size={19} />}
//               </button>

//             </form>

//             <p className="amh-signup-login">
//               Already have an account?
//               <Link to="/login"> Sign in</Link>
//             </p>

//             <p className="amh-signup-terms">
//               Your information will be handled in accordance with
//               the hospital's privacy practices.
//             </p>

//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Signup;

import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Clock3,
  ArrowLeft,
  Mail,
} from "lucide-react";

import "./Signup.css";

const Signup = () => {
  return (
    <main className="amh-signup-page">
      <div className="amh-signup-container">

        {/* LEFT VISUAL SECTION */}
        <section className="amh-signup-visual">
          <div className="amh-signup-brand">
            <div className="amh-signup-brand-icon">
              <HeartPulse size={25} />
            </div>

            <div>
              <h2>Ahmadiyya</h2>
              <span>Muslim Hospital</span>
            </div>
          </div>

          <div className="amh-signup-visual-content">
            <span className="amh-signup-label">
              OUR COMMUNITY
            </span>

            <h1>
              Connecting people.
              <span> Supporting humanity.</span>
            </h1>

            <p>
              We are working towards creating a welcoming
              digital community where people can connect,
              share experiences and stay informed about
              hospital activities.
            </p>
          </div>

          <div className="amh-signup-visual-footer">
            Healthcare. Community. Humanity.
          </div>
        </section>

        {/* REGISTRATION UNAVAILABLE SECTION */}
        <section className="amh-signup-form-section">
          <div className="amh-signup-form-wrapper amh-signup-coming-soon">

            <div className="amh-signup-mobile-brand">
              <HeartPulse size={25} />
              <span>Ahmadiyya Muslim Hospital</span>
            </div>

            <div className="amh-coming-soon-icon">
              <Clock3 size={34} />
            </div>

            <span className="amh-coming-soon-label">
              REGISTRATION CURRENTLY UNAVAILABLE
            </span>

            <h2>We're getting ready!</h2>

            <p>
              Account registration is not yet available.
              We are working on making this service accessible
              and will open registrations soon.
            </p>

            <div className="amh-coming-soon-note">
              <Mail size={19} />
              <span>
                Please check back later for updates.
              </span>
            </div>

            <Link to="/login" className="amh-coming-soon-back">
              <ArrowLeft size={18} />
              Back to Sign In
            </Link>

            <p className="amh-signup-terms">
              Ahmadiyya Muslim Hospital
              <br />
              Healthcare. Community. Humanity.
            </p>

          </div>
        </section>

      </div>
    </main>
  );

  /*
    ORIGINAL SIGNUP FORM TEMPORARILY DISABLED.

    Keep the previous registration implementation here
    for restoration when public registration opens again.
  */
};

export default Signup;
