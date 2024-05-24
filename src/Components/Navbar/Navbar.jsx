import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <>
        <div className="headerarea headerarea__3 header__sticky header__area">
          <div className="container desktop__menu__wrapper">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6">
                <div className="headerarea__left">
                  <div className="headerarea__left__logo">
                    <Link to="/">
                      <img
                        loading="lazy"
                        src="./src/assets/img/logo/delta-view-logo.png"
                        className="img-fluid"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 main_menu_wrap">
                <div className="headerarea__main__menu">
                  <nav>
                    <ul>
                      <li className="mega__menu position-static">
                        <NavLink
                          exact
                          activeClassName="active"
                          className="headerarea__has__dropdown"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="mega__menu position-static">
                        <NavLink
                          activeClassName="active"
                          className="headerarea__has__dropdown"
                          to="/about-us"
                        >
                          About Us
                        </NavLink>
                      </li>
                      <li className="mega__menu position-static">
                        <NavLink
                          activeClassName="active"
                          className="headerarea__has__dropdown"
                          to="/Delta-view-app"
                        >
                          DeltaView App
                        </NavLink>
                      </li>
                      <li className="mega__menu position-static">
                        <NavLink
                          activeClassName="active"
                          className="headerarea__has__dropdown"
                          to="/Delta-Partner"
                        >
                          Partner with DeltaView
                        </NavLink>
                      </li>
                      <li className="mega__menu position-static">
                        <NavLink
                          activeClassName="active"
                          className="headerarea__has__dropdown"
                          to="/contact-us"
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6">
                <div className="headerarea__right">
                  <div className="headerarea__login">
                    <Link to="/login">
                      <i class="fa-solid fa-user"></i> Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mob_menu_wrapper">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="mobile-logo">
                  <Link className="logo__dark" to="#">
                    <img
                      loading="lazy"
                      src="./src/assets/img/logo/delta-view-logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
             
            </div>
          </div>
        </div>
        
        
      </>
    </>
  );
};

export default Navbar;
