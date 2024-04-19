// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
// import axios from "axios";
// import { Toaster } from "sonner";
// import ChapterPage2 from "../Chapter/ChapterPage2";
// import DashboardStickybar from "./DashboardStickybar";
// import DashboardHome from  "./DashboardHome";
// import DashBoardfooter from "./DashBoardfooter";
// import DashboardProfile from  './DashboardProfile'

// const DashBoard2 = () => {
//   const [selectedMenuItem, setSelectedMenuItem] = useState("home");
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState(""); // Initialize userData state
//   const [selectedSubjectId, setSelectedSubjectId] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/v1/userss", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserData(response.data.UserData); // Set the entire user data object
//       } catch (err) {
//         console.log("Error Fetching user profile data: " + err);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubjectClick = (subjectId) => {
//     setSelectedMenuItem("chapterPage"); // Set selectedMenuItem to 'chapterPage' when a subject is clicked
//     setSelectedSubjectId(subjectId);
//     navigate(`/chapter/${subjectId}`); // Navigate to the ChapterPage2 component with the selected subjectId
//   };

//   const handleContactUsClick = () => {
//     setShowOffcanvas(true); // Open the Offcanvas
//     setShowMobileMenu(false); // Close mobile menu when Offcanvas is opened
//   };

//   const handleMenuClick = (menuItem) => {
//     setSelectedMenuItem(menuItem);
//   };

//   const handleCloseOffcanvas = () => {
//     setShowOffcanvas(false);
//   };

//   const toggleMobileMenu = () => {
//     setShowMobileMenu(!showMobileMenu);
//   };

//   return (
//     <>
//       <Toaster />
//       <main className="main_wrapper">
//         {selectedMenuItem !== "chapterPage" && (
//           <DashboardStickybar userData={userData} setUserData={setUserData}  />
//         )}
//         {/* Mobile Menu Start Here */}
//         <div className={`mobile-off-canvas-active ${showMobileMenu ? "show" : ""}`}>
//           <Link className="mobile-aside-close" onClick={toggleMobileMenu}>
//             <i className="icofont icofont-close-line" />
//           </Link>
//           <div className="header-mobile-aside-wrap">
//             <div className="dashboard__nav__title">
//               <h6>
//                 <span>Welcome, {userData && userData.name}</span>
//               </h6>
//             </div>
//             <div className="mobile-menu-wrap headerarea">
//               <div className="mobile-navigation">
//                 <nav>
//                   <ul className="mobile-menu">
//                     <li
//                       onClick={() => {
//                         handleMenuClick("home");
//                         toggleMobileMenu();
//                       }}
//                     >
//                       <Link className={selectedMenuItem === "home" ? "active" : ""} to="#">
//                         Home
//                       </Link>
//                     </li>
//                     <li
//                       onClick={() => {
//                         handleMenuClick("profile");
//                         toggleMobileMenu();
//                       }}
//                     >
//                       <Link className={selectedMenuItem === "profile" ? "active" : ""} to="#">
//                         Edit Profile
//                       </Link>
//                     </li>
//                     <li onClick={handleContactUsClick}>
//                       <Link className="sidebar-toggler" to="#">
//                         Contact Us
//                       </Link>
//                     </li>
//                     <li>
//                       <Link> Log Out </Link>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//             <div className="mobile-social-wrap">
//               <Link className="facebook" to="#">
//                 <i className="icofont icofont-facebook" />
//               </Link>
//               <Link className="twitter" to="#">
//                 <i className="icofont icofont-twitter" />
//               </Link>
//               <Link className="pinterest" to="#">
//                 <i className="icofont icofont-pinterest" />
//               </Link>
//               <Link className="instagram" to="#">
//                 <i className="icofont icofont-instagram" />
//               </Link>
//               <Link className="google" to="#">
//                 <i className="icofont icofont-youtube-play" />
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* Mobile Menu end Here */}

//         {/* dashboardarea__area__start  */}
//         <div className="dashboardarea sp_bottom_100">
//           <div className="dashboard">
//             <div className="container-fluid full__width__padding">
//               <div className="row">
//                 {selectedMenuItem !== "chapterPage" && (
//                   <Sidebar onSelectMenuItem={handleMenuClick} userData={userData} />
//                 )}
//                 {selectedMenuItem === "home" && (
//                   <DashboardHome handleSubjectClick={handleSubjectClick}  userData={userData} setUserData={setUserData} />
//                 )}
//                 {selectedMenuItem === "profile" && (
//                   <DashboardProfile userData={userData} setUserData={setUserData} />
//                 )}
//                 {selectedMenuItem === "chapterPage" && (
//                   <ChapterPage2 selectedSubjectId={selectedSubjectId} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* dashboardarea__area__end   */}
//         {/* footer__section__start */}
//        {/* <DashBoardfooter /> */}

//         {/* footer__section__end */}
//         {showOffcanvas && <Offcanvas handleClose={handleCloseOffcanvas} />}
//       </main>
//     </>
//   );
// };

// export default DashBoard2;
