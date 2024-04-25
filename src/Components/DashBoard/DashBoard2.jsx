import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useUser } from "../../Store";
import DashboardStickybar from "./DashboardStickybar";
import DashboardHome from "./DashboardHome";
import DashBoardfooter from "./DashBoardfooter";
import DashboardProfile from "./DashboardProfile";
import Offcanvas from "./Offcanvas";

const DashBoard2 = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // const [userData, setUserData] = useState(""); // Initialize userData state
  const { userData, setUserData } = useUser(); // Use useUser hook
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/v1/userss",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.UserData); // Set the entire user data object
      } catch (err) {
        console.log("Error Fetching user profile data: " + err);
      }
    };

    fetchUserData();
  }, []);

  const handleSubjectClick = (subjectId) => {
    // Navigate to the ChapterPage component with the selected subject ID
    navigate(`/chapter/${subjectId}`);
    console.log(subjectId);
  };
  const handleContactUsClick = () => {
    setShowOffcanvas(true); // Open the Offcanvas
    setShowMobileMenu(false); // Close mobile menu when Offcanvas is opened
  };

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const updateClassAndNavigateToDashboard = async (classNumber) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/updategrade",
        { grade: classNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Affected Rows:", response.data.affected_rows);
      const updatedUserData = { ...userData };
      updatedUserData.grade = classNumber;
      setUserData(updatedUserData); // Update userData immediately
      navigate("/dashboard"); // Navigate to dashboard
      localStorage.setItem("selectedClass", classNumber);
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("Failed to update grade");
    }
  };

  return (
    <>
      <Toaster />
      <main className="main_wrapper">
        <DashboardStickybar
          userData={userData}
          setUserData={setUserData}
          updateClassAndNavigateToDashboard={updateClassAndNavigateToDashboard}
        />

        {/* Mobile Menu Start Here */}
        <div
          className={`mobile-off-canvas-active ${showMobileMenu ? "show" : ""}`}
        >
          <Link className="mobile-aside-close" onClick={toggleMobileMenu}>
            <i className="icofont icofont-close-line" />
          </Link>
          <div className="header-mobile-aside-wrap">
            <div className="dashboard__nav__title">
              <h6>
                <span>Welcome, {userData && userData.name}</span>
              </h6>
            </div>
            <div className="mobile-menu-wrap headerarea">
              <div className="mobile-navigation">
                <nav>
                  <ul className="mobile-menu">
                    <li
                      onClick={() => {
                        handleMenuClick("home");
                        toggleMobileMenu();
                      }}
                    >
                      <Link
                        className={selectedMenuItem === "home" ? "active" : ""}
                        to="#"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        handleMenuClick("profile");
                        toggleMobileMenu();
                      }}
                    >
                      <Link
                        className={
                          selectedMenuItem === "profile" ? "active" : ""
                        }
                        to="#"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li >
                     
                      <Link className="sidebar-toggler" to="#">
                        Contact Us
                      </Link>
                    </li>

                    <li>
                      <Link> Log Out </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="mobile-social-wrap">
              <Link className="facebook" to="#">
                <i className="icofont icofont-facebook" />
              </Link>
              <Link className="twitter" to="#">
                <i className="icofont icofont-twitter" />
              </Link>
              <Link className="pinterest" to="#">
                <i className="icofont icofont-pinterest" />
              </Link>
              <Link className="instagram" to="#">
                <i className="icofont icofont-instagram" />
              </Link>
              <Link className="google" to="#">
                <i className="icofont icofont-youtube-play" />
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile Menu end Here */}

        {/* dashboardarea__area__start  */}
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <Sidebar
                  onSelectMenuItem={handleMenuClick}
                  userData={userData}
                  handleContactUsClick={handleContactUsClick}
                />
                {selectedMenuItem === "home" && (
                  <DashboardHome
                    userData={userData}
                    setUserData={setUserData}
                    handleSubjectClick={handleSubjectClick}
                    selectedClass={selectedClass}
                  />
                )}
                {selectedMenuItem === "profile" && (
                  <DashboardProfile
                    userData={userData}
                    setUserData={setUserData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* dashboardarea__area__end   */}
        {/* footer__section__start */}
        {/* <DashBoardfooter /> */}

        {/* footer__section__end */}
        {showOffcanvas && <Offcanvas handleClose={handleCloseOffcanvas} />}
      </main>
    </>
  );
};

export default DashBoard2;
