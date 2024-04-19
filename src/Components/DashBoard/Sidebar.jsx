import { useState } from "react";
import { Link  ,useNavigate } from "react-router-dom";



const Sidebar = ({ onSelectMenuItem, handleContactUsClick ,userData  }) => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate()

  const handlelogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
   setTimeout(()=>{
    navigate('/login')
   },1000)
  };


  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="dashboard__inner sticky-top">
        <div className="dashboard__nav__title">
          <h6>
            <span>Welcome</span>,{" "}
            {userData && userData.name ? userData.name : "Guest"}
          </h6>
        </div>
        <div className="dashboard__nav">
          <ul>
            <li>
              <Link
                className={activeItem === "home" ? "active" : ""}
                to="#"
                onClick={() => {
                  onSelectMenuItem("home");
                  setActiveItem("home"); // Set activeItem to 'home' when clicked
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => {
                  onSelectMenuItem("profile");
                  setActiveItem("profile"); // Set activeItem to 'profile' when clicked
                }}
                className={activeItem === "profile" ? "active" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                Edit Profile
              </Link>
            </li>
            <li>
              <Link className="sidebar-toggler" onClick={handleContactUsClick}>
                <i className="icofont-ui-call" />
                Contact Us
              </Link>
            </li>
            <li>
              <Link  onClick={handlelogout}>
                <i className="icofont-logout" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
