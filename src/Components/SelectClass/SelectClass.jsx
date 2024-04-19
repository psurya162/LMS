import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

const SelectClass = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    number: "",
    selectedClass: "", // Added selectedClass state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate name field to allow only alphabets
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error("Name should contain only alphabets.");
      return;
    }

    // Validate phone number field to allow only numbers
    if (name === "number" && !/^\d*$/.test(value)) {
      toast.error("Phone number should contain only numbers.");
      return;
    }

    // Update state with the valid input
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSelectClass = (selectedClass) => {
    setStudentData({ ...studentData, selectedClass });
    toast.info(`You selected ${selectedClass} class.`);
  };

  const handleSubmit = async () => {
    console.log(studentData);
    try {
      // Validate if all fields are filled
      if (
        !studentData.name ||
        !studentData.number ||
        !studentData.selectedClass
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Validate phone number
      if (!/^\d{10}$/.test(studentData.number)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token is available
      if (!token) {
        throw new Error("Token is missing");
      }

      // Make API call to update user data
      const response = await axios.put(
        "http://localhost:5000/api/v1/users",
        {
          name: studentData.name,
          phone: studentData.number,
          grade: studentData.selectedClass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 200) {
        toast.success("Data submitted successfully");

        // Check if the selected class is from 11th to 12th
        if (["11", "12"].includes(studentData.selectedClass)) {
          navigate("/select-stream"); // Navigate to select-stream page
        } else {
          setTimeout(() => {
            // localStorage.removeItem("token"); // Remove the token
            navigate("/dashboard"); // Redirect to login page
          }, 2000);
        }
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="main_wrapper overflow-hidden">
        <section className="login-steps steps-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <Link className="loginlogo" to="/select-language">
                  <i className="icofont-double-left" /> <span>Back</span>
                </Link>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-4 mx-auto text-center">
                <div className="select-board-box">
                  <img
                    src="./src/assets/img/logo/delta-view-logo.png"
                    alt="logo_2"
                  />
                  <div className="select-board">
                    <h4>Tell us a bit about yourself</h4>
                    <div className="form-group text-start">
                      <label>What's Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        onChange={handleChange}
                        name="name"
                        value={studentData.name}
                      />
                    </div>
                    <div className="form-group text-start">
                      <label>What's Your Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Phone Number"
                        maxLength="10"
                        onChange={handleChange}
                        value={studentData.number}
                        name="number"
                      />
                    </div>
                    <div className="select-board">
                      <ul className="list-class">
                        {[...Array(10)].map((_, index) => (
                          <li key={index + 1}>
                            <Link
                             
                              className={
                                studentData.selectedClass === `${index + 1}`
                                  ? "active"
                                  : ""
                              }
                              onClick={() => handleSelectClass(`${index + 1}`)}
                            >
                              {index + 1}th
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                           
                            className={
                              studentData.selectedClass === "11" ? "active" : ""
                            }
                            onClick={() => handleSelectClass("11")}
                          >
                            11th
                          </Link>
                        </li>
                        <li>
                          <Link
                            
                            className={
                              studentData.selectedClass === "12" ? "active" : ""
                            }
                            onClick={() => handleSelectClass("12")}
                          >
                            12th
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <button
                      className="default__button w-100"
                      onClick={handleSubmit}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SelectClass;
