import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup
import { useFormik } from "formik"; // Import useFormik from formik
import axios from "axios"; // Import axios for making HTTP requests
import { Toaster, toast } from "sonner";

// import "./sign.css";

const Signup = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState(false);
  const [emailButtonLabel, setEmailButtonLabel] = useState("Verify Email");
  const [emailButtonColor, setEmailButtonColor] = useState("");
  const [isEmailEditable, setIsEmailEditable] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const navigate = useNavigate();

  
console.log(emailVerificationStatus,"status")
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setIsTimerRunning(false);
      setIsEmailEditable(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer, otpSent]);

  useEffect(() => {
    // Check if email is already verified
    if (emailVerificationStatus) {
      // If email is already verified, hide the verification section and timer
      setShowVerification(false); // Set showVerification to false
      setIsTimerRunning(false);
      setIsEmailEditable(false);
      setTimer(0);
    }
  }, [emailVerificationStatus]);
  

  const sendOTP = async () => {
    if (!formik.values.email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email address")
        .validate(formik.values.email);
    } catch (error) {
      toast.error(error.message);
      return;
    }

    if (isTimerRunning && otpSent) {
      toast.info(
        "OTP has already been sent. Please wait for the timer to expire."
      );
      return;
    }

    setOtpSent(true);
    setIsSendingOTP(true);
    setIsResendDisabled(true);
    setIsTimerRunning(true);
    setTimer(100);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/sendotp",
        {
          email: formik.values.email,
        }
      );

      const { message } = response.data;

      if (message.includes("OTP sent successfully")) {
        toast.success(message);
      } else if (message.includes("Your email is verified")) {
        // If email is already verified, set emailVerificationStatus to true
        setEmailVerificationStatus(true);
        toast.success(message);
      } else {
        toast.error(message);
      }

      setIsEmailEditable(false);
      formik.setFieldValue("email", formik.values.email);
      formik.setFieldTouched("email", true);
      setShowVerification(true);
      setEmailButtonLabel("OTP sent to email");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        setOtpSent(false); // Reset otpSent state if OTP sending fails
      } else {
        toast.error("Failed to send OTP");
      }
    } finally {
      setIsSendingOTP(false);
    }

    // setTimeout(() => {
    //   setIsResendDisabled(false);
    // }, 60000);
  };

  const resendOTP = async () => {
    try {
      if (isTimerRunning && otpSent) {
        // Display toast message indicating that OTP has already been sent
        toast.info(
          "OTP has already been sent. Please wait for the timer to expire."
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/sendotp",
        {
          email: formik.values.email,
        }
      );

      const { message } = response.data;

      if (message.includes("OTP sent successfully")) {
        toast.success(message);
      } else {
        toast.error(message);
      }

      setOtpSent(true);
      setIsSendingOTP(false);
      setIsResendDisabled(true);
      setIsTimerRunning(true);
      setTimer(20);

      setTimeout(() => {
        setIsResendDisabled(false);
      }, 30000);
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      console.log("Entered OTP:", formik.values.otp);
      if (!/^\d{6}$/.test(formik.values.otp)) {
        toast.error("Please enter a valid 6-digit OTP");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/v1/verifyotp",
        {
          email: formik.values.email,
          otp: formik.values.otp,
        }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimer(0);
        setShowVerification(false);
        setEmailVerificationStatus(true);
        setEmailButtonLabel("Email Verified");
        setEmailButtonColor("green");
        formik.handleSubmit();
        console.log("Email verification status:", emailVerificationStatus);
      } else {
        console.error(
          "Error verifying OTP:",
          response.data.error || "Unexpected response"
        );
        toast.error("Error verifying OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP");
    } finally {
      setIsEmailEditable(false);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: () => {
      return Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .email("Invalid email address")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email address"
          )
          .required("Please Enter Valid Email Id"),
        otp: emailVerificationStatus
          ? Yup.string().notRequired()
          : Yup.string()
              .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
              .required("OTP is required"),
        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            "Password is required "
          ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
  
        if (!emailVerificationStatus) {
          toast.error("Please verify your email first");
        } else {
          const response = await axios.put(
            "http://localhost:5000/api/v1/user/" + values.email,
            values
          );
  
          if (response.data.status) {
            const { token } = response.data;
  
            if (token) {
              localStorage.setItem("token", token);
              toast.success("Signup Successful!");
  
              setTimeout(() => {
                navigate("/select-board");
              }, 2000);
            } else {
              throw new Error("Token not found in response");
            }
          } else {
            toast.error("Signup Failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    }
  });
  
  console.log("Formik values:", formik.values);
console.log("Formik errors:", formik.errors);

  return (
    <>
      <Toaster position="top-right" richColors />
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
                  src="./src/assets/img/signup.png"
                  alt=""
                />
                <div className="section-title mb-0 mt-5 text-white">
                  <h2 className="text-white">Welcome To The DeltaView</h2>
                  <p className="mb-0 text-light">
                    Enter the right details to sign up
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
                <h3 className="mb-4">Sign Up Your Account</h3>
                <form
                    onSubmit={formik.handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      
                      name="username"
                      value={formik.values.username}
                      className={`form-control ${
                        formik.touched.username && formik.errors.username
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="User name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div className="invalid-feedback">
                        {formik.errors.username}
                      </div>
                    )}
                  </div>

                  {/* Email field with verification */}

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder=" Email"
                      autoComplete="off"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEmailEditable}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                    {!isSendingOTP &&
                      !formik.errors.email &&
                      !emailVerificationStatus && (
                        <button
                          type="button"
                          className={`verify-email-btn ${emailButtonColor}`}
                          onClick={emailVerificationStatus ? null : sendOTP}
                          disabled={emailVerificationStatus}
                        >
                          <i className="fa-regular fa-circle-right" />
                        </button>
                      )}
                    {otpSent && !emailVerificationStatus && (
                      <small
                        type="button"
                        className="edit-email-btn exsmall text-danger btn-link"
                        onClick={() => {
                          setIsEmailEditable(true);
                          setIsTimerRunning(false);
                          setTimer(0);
                          setOtpSent(false);
                          setEmailButtonLabel("Verify Email");
                        }}
                      >
                        Edit Email
                      </small>
                    )}

                    {!isSendingOTP &&
                      !formik.errors.email &&
                      emailVerificationStatus && (
                        <small className="exsmall" style={{ color: "green" }}>
                          Email Verified
                        </small>
                      )}
                  </div>

                  {/* OTP verification section */}
                  {showVerification && (
                    <div className="form-group">
                      <input
                        type="number"
                        name="otp"
                        className="form-control"
                        placeholder="OTP"
                        autoComplete="off"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength="6"
                      />

                      <small className="exsmall">
                        Time Remaining: {timer}s
                      </small>
                      <small
                        className="exsmall text-danger btn-link"
                        onClick={resendOTP}
                      >
                        Resend OTP
                      </small>
                      <button
                        type="button"
                        className="verify-email-btn otpverify"
                        onClick={verifyOTP}
                      >
                        Verify
                      </button>
                    </div>
                  )}

                  {/* Password fields */}
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Password"
                      autoComplete="off"
                     
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                    
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Confirm Password"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>

                  <button type="submit" className="default__button w-100">
                    Sign Up
                  </button>
                </form>
                <div className="dont-account d-flex align-items-center mt-3 justify-content-center">
                  <span className="text-black me-1">
                    Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
