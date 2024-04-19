import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

const DashboardProfile = ({ userData, setUserData }) => {
  const [updatedUserData, setUpdatedUserData] = useState(userData);

  const handleChange = (e) => {
    console.log("handleChange triggered"); // Check if handleChange is triggered
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the updated user data before making the API call
      console.log("Updated User Data:", updatedUserData);

      // Make an API call to update user profile
      const response = await axios.put(
        "http://localhost:5000/api/v1/userprofile",
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      toast.success("Your Profile is Updated Successfully");
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  return (
    <>
      <div className="col-xl-9 col-lg-9 col-md-12">
        <div className="dashboardarea__wraper mb-4">
          <div className="dashboardarea__img">
            <div className="dashboardarea__inner admin__dashboard__inner">
              <div className="dashboardarea__left">
                <div className="dashboardarea__left__img">
                  <img
                    loading="lazy"
                    src="../img/dashbord/dashbord__2.jpg"
                    alt=""
                  />
                </div>
                <div className="dashboardarea__left__content">
                  <h5>
                    <span>Hello</span>, {updatedUserData.name || "Guest"}
                  </h5>
                  <p>{updatedUserData.email}</p>
                </div>
              </div>
              {/* <div className="dashboardarea__right">
                <div className="dashboardarea__right__button">
                  <div className="info-class">
                    <span>Class (8)</span>
                    <span>Board (CBSE)</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="dashboard__content__wraper">
          <div className="dashboard__section__title">
            <h4>My Profile</h4>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        name="name" // Make sure this matches the key in your state
                        value={updatedUserData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">Email</label>
                      <input
                        type="email"
                        placeholder="Email Id"
                        name="email"
                        value={updatedUserData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">Mobile</label>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={updatedUserData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">Alternate Number</label>
                      <input
                        type="text"
                        placeholder="Alternate Number"
                        name="alternatephone"
                        value={updatedUserData.alternatephone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={updatedUserData.gender}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        placeholder="Date of Birth"
                        name="dob"
                        value={updatedUserData.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">City</label>
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={updatedUserData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">State</label>
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={updatedUserData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">School</label>
                      <input
                        type="text"
                        placeholder="School"
                        name="school"
                        value={updatedUserData.school}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="#">Address</label>
                      <input
                        type="text"
                        placeholder="Full Address"
                        name="address"
                        value={updatedUserData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="dashboard__form__button">
                    <Link className="default__button" onClick={handleSubmit}>
                      Update Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
