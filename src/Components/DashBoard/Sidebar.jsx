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
                <i class="fa-solid fa-house"></i>
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
               <i class="fa-solid fa-user"></i>
                Edit Profile
              </Link>
            </li>
            <li>
              <Link className="sidebar-toggler" onClick={handleContactUsClick}>
              <i class="fa-solid fa-phone"></i>
                Contact Us
              </Link>
            </li>
            <li>
              <Link  onClick={handlelogout}>
              <i class="fa-solid fa-right-from-bracket"></i>
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
