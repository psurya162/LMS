import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster, toast } from "sonner";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [rememberMe, setRememberMe] = useState(false); // State to track "Remember Me" checkbox

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          values
        );

        // Store the JWT token in localStorage
        localStorage.setItem("token", response.data.token);

        // Display success toast upon successful login
        toast.success("Logged In Successfully");

        // Navigate to the dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        console.error("An error occurred during login:", error);
        // Display error toast based on the error response status
        if (error.response && error.response.status === 401) {
          // Unauthorized: Invalid email or password
          toast.error("Invalid email or password");
        } else {
          // Other errors
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false); // Set loading state back to false
      }
    },
  });
  // Function to toggle "Remember Me" checkbox state
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Effect to pre-fill email field if "Remember Me" is checked and email is stored in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (rememberMe && storedEmail) {
      formik.setFieldValue("email", storedEmail);
    }
  }, [rememberMe, formik]);

  return (
    <>
      <Toaster position="top-right" />
      <section className="login-page">
        <Link to="/" className="loginlogo">
          <img src="./src/assets/img/logo/logo_2.png" alt="logo_2" />
        </Link>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-lg-5 px-3 py-5 dark-bg text-center">
                <img
                  className="img-fluid"
                  src="./src/assets/img/login-img.png"
                  alt=""
                />
                <div className="section-title mb-0 mt-5 text-white">
                  <h2 className="text-white">Welcome To The DeltaView</h2>
                  <p className="mb-0 text-light">
                    Any Question or Remarks ? Just Write Us a Message!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
                <h3 className="mb-4">Login Your Account</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Email"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Password"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-4 mb-4">
                    <div className="remember-checkbox d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={toggleRememberMe}
                        />
                        <label className="form-check-label">Remember me</label>
                      </div>{" "}
                      <Link to="#">Forgot Password?</Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="default__button w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </form>
                <div className="dont-account d-flex align-items-center mt-3 justify-content-center">
                  <span className="text-black me-1">
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
