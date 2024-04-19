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
                      src="./src/assets/img/logo/logo_1.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-6">
                <div className="header-right-wrap">
                  <div className="headerarea__right">
                    <div className="header__cart">
                      <Link to="#">
                        {" "}
                        <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                      </Link>
                      <div className="header__right__dropdown__wrapper">
                        <div className="header__right__dropdown__inner">
                          <div className="single__header__right__dropdown">
                            <div className="header__right__dropdown__img">
                              <Link to="#">
                                <img
                                  loading="lazy"
                                  src="./src/assets/img/grid/cart1.jpg"
                                  alt="photo"
                                />
                              </Link>
                            </div>
                            <div className="header__right__dropdown__content">
                              <Link to="//">Web Directory</Link>
                              <p>
                                1 x <span className="price">$ 80.00</span>
                              </p>
                            </div>
                            <div className="header__right__dropdown__close">
                              <Link to="#">
                                <i className="icofont-close-line" />
                              </Link>
                            </div>
                          </div>
                          <div className="single__header__right__dropdown">
                            <div className="header__right__dropdown__img">
                              <Link to="#">
                                <img
                                  loading="lazy"
                                  src="./src/assets/img/grid/cart2.jpg"
                                  alt="photo"
                                />
                              </Link>
                            </div>
                            <div className="header__right__dropdown__content">
                              <Link to="shop-product.html">Design Minois</Link>
                              <p>
                                1 x <span className="price">$ 60.00</span>
                              </p>
                            </div>
                            <div className="header__right__dropdown__close">
                              <Link to="#">
                                <i className="icofont-close-line" />
                              </Link>
                            </div>
                          </div>
                          <div className="single__header__right__dropdown">
                            <div className="header__right__dropdown__img">
                              <Link to="#">
                                <img
                                  loading="lazy"
                                  src="./src/assets/img/grid/cart3.jpg"
                                  alt="photo"
                                />
                              </Link>
                            </div>
                            <div className="header__right__dropdown__content">
                              <Link to="shop-product.html">Crash Course</Link>
                              <p>
                                1 x <span className="price">$ 70.00</span>
                              </p>
                            </div>
                            <div className="header__right__dropdown__close">
                              <Link to="#">
                                <i className="icofont-close-line" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <p className="dropdown__price">
                          Total: <span>$1,100.00</span>
                        </p>
                        <div className="header__right__dropdown__button">
                          <Link to="#" className="white__color">
                            VIEW CART
                          </Link>
                          <Link to="#" className="blue__color">
                            CHECKOUT
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-off-canvas">
                    <Link className="mobile-aside-button" to="#">
                      <i className="icofont-navigation-menu" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header section end */}
        {/* Mobile Menu Start Here */}
        <div className="mobile-off-canvas-active">
          <Link className="mobile-aside-close">
            <i className="icofont  icofont-close-line" />
          </Link>
          <div className="header-mobile-aside-wrap">
            <div className="mobile-search">
              <form className="search-form" action="#">
                <input type="text" placeholder="Search entire store…" />
                <button className="button-search">
                  <i className="icofont icofont-search-2" />
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap headerarea">
              <div className="mobile-navigation">
                <nav>
                  <ul className="mobile-menu">
                    <li className="menu-item-has-children">
                      <Link to="//">Home</Link>
                      <ul className="dropdown">
                        <li className="menu-item-has-children">
                          <Link to="//">Homes Light</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="//">Home (Default)</Link>
                            </li>
                            <li>
                              <Link to="home-2.html">Elegant</Link>
                            </li>
                            <li>
                              <Link to="home-3.html">Classic</Link>
                            </li>
                            <li>
                              <Link to="home-4.html">Classic LMS</Link>
                            </li>
                            <li>
                              <Link to="home-5.html">Online Course </Link>
                            </li>
                            <li>
                              <Link to="home-6.html">Marketplace </Link>
                            </li>
                            <li>
                              <Link to="home-7.html">University</Link>
                            </li>
                            <li>
                              <Link to="home-8.html">eCommerce</Link>
                            </li>
                            <li>
                              <Link to="home-9.html">Kindergarten</Link>
                            </li>
                            <li>
                              <Link to="home-10.html">Machine Learning</Link>
                            </li>
                            <li>
                              <Link to="home-11.html">Single Course</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="//">Homes Dark</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="index-dark.html">
                                Home Default (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-2-dark.html">Elegant (Dark)</Link>
                            </li>
                            <li>
                              <Link to="home-3-dark.html">Classic (Dark)</Link>
                            </li>
                            <li>
                              <Link to="home-4-dark.html">
                                Classic LMS (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-5-dark.html">
                                Online Course (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-6-dark.html">
                                Marketplace (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-7-dark.html">
                                University (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-8-dark.html">
                                eCommerce (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-9-dark.html">
                                Kindergarten (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-10-dark.html">
                                Kindergarten (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="home-11-dark.html">
                                Single Course (Dark)
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children ">
                      <Link to="#">Pages</Link>
                      <ul className="dropdown">
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 1</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="about.html">About</Link>
                            </li>
                            <li>
                              <Link to="about-dark.html">
                                About (Dark)
                                <span className="mega__menu__label new">
                                  New
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to="blog.html">Blog</Link>
                            </li>
                            <li>
                              <Link to="blog-dark.html">Blog (Dark)</Link>
                            </li>
                            <li>
                              <Link to="blog-details.html">Blog Details</Link>
                            </li>
                            <li>
                              <Link to="blog-details-dark.html">
                                Blog Details (Dark)
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 2</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="error.html">Error 404</Link>
                            </li>
                            <li>
                              <Link to="error-dark.html">Error (Dark)</Link>
                            </li>
                            <li>
                              <Link to="event-details.html">Event Details</Link>
                            </li>
                            <li>
                              <Link to="zoom/zoom-meetings.html">
                                Zoom
                                <span className="mega__menu__label">
                                  Online Call
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to="zoom/zoom-meetings-dark.html">
                                Zoom Meeting (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="zoom/zoom-meeting-details.html">
                                Zoom Meeting Details
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 3</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="zoom/zoom-meeting-details-dark.html">
                                Meeting Details (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="login.html">Login</Link>
                            </li>
                            <li>
                              <Link to="login-dark.html">Login (Dark)</Link>
                            </li>
                            <li>
                              <Link to="#">Maintenance</Link>
                            </li>
                            <li>
                              <Link to="#">Maintenance (Dark)</Link>
                            </li>
                            <li>
                              <Link to="#">Terms &amp; Condition</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 4</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="#">Terms &amp; Condition (Dark)</Link>
                            </li>
                            <li>
                              <Link to="#">Privacy Policy</Link>
                            </li>
                            <li>
                              <Link to="#">Privacy Policy (Dark)</Link>
                            </li>
                            <li>
                              <Link to="#">Success Stories</Link>
                            </li>
                            <li>
                              <Link to="#">Success Stories (Dark)</Link>
                            </li>
                            <li>
                              <Link to="#">Work Policy</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <div className="mega__menu__img">
                            <Link to="#">
                              <img
                                loading="lazy"
                                src="img/mega/mega_menu_2.png"
                                alt="Mega Menu"
                              />
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children ">
                      <Link to="course.html">Courses</Link>
                      <ul className="dropdown">
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 1</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="course.html">
                                Grid{" "}
                                <span className="mega__menu__label">
                                  All Courses
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to="course-dark.html">
                                Course Grid (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="course-grid.html">Course Grid</Link>
                            </li>
                            <li>
                              <Link to="course-grid-dark.html">
                                Course Grid (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="course-list.html">Course List</Link>
                            </li>
                            <li>
                              <Link to="course-list-dark.html">
                                Course List (Dark)
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 2</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="course-details.html">
                                Course Details
                              </Link>
                            </li>
                            <li>
                              <Link to="course-details-dark.html">
                                Course Details (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="course-details-2.html">
                                Course Details 2
                              </Link>
                            </li>
                            <li>
                              <Link to="course-details-2-dark.html">
                                Details 2 (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="course-details-3.html">
                                Course Details 3
                              </Link>
                            </li>
                            <li>
                              <Link to="course-details-3.html">
                                Details 3 (Dark)
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Get Started 3</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="dashboard/become-an-instructor.html">
                                Become An Instructor
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/create-course.html">
                                Create Course{" "}
                                <span className="mega__menu__label">
                                  Career
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to="instructor.html">Instructor</Link>
                            </li>
                            <li>
                              <Link to="instructor-dark.html">
                                Instructor (Dark)
                              </Link>
                            </li>
                            <li>
                              <Link to="instructor-details.html">
                                Instructor Details
                              </Link>
                            </li>
                            <li>
                              <Link to="lesson.html">
                                Course Lesson
                                <span className="mega__menu__label new">
                                  New
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <div className="mega__menu__img">
                            <Link to="#">
                              <img
                                loading="lazy"
                                src="img/mega/mega_menu_1.png"
                                alt="Mega Menu"
                              />
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children ">
                      <Link to="dashboard/admin-dashboard.html">Dashboard</Link>
                      <ul className="dropdown">
                        <li className="menu-item-has-children">
                          <Link to="#">Admin</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="dashboard/admin-dashboard.html">
                                Admin Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-profile.html">
                                Admin Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-message.html">
                                Message
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-course.html">
                                Courses
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-reviews.html">
                                Review
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-quiz-attempts.html">
                                Admin Quiz
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/admin-settings.html">
                                Settings
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Instructor</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="dashboard/instructor-dashboard.html">
                                Inst. Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-profile.html">
                                Inst. Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-message.html">
                                Message
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-wishlist.html">
                                Wishlist
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-reviews.html">
                                Review
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-my-quiz-attempts.html">
                                My Quiz
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-order-history.html">
                                Order History
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-course.html">
                                My Courses
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-announcments.html">
                                Announcements
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-quiz-attempts.html">
                                Quiz Attempts
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-assignments.html">
                                Assignment
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/instructor-settings.html">
                                Settings
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="#">Student</Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="dashboard/student-dashboard.html">
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-profile.html">
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-message.html">
                                Message
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-enrolled-courses.html">
                                Enrolled Courses
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-wishlist.html">
                                Wishlist
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-reviews.html">
                                Review
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-my-quiz-attempts.html">
                                My Quiz
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-assignments.html">
                                Assignment
                              </Link>
                            </li>
                            <li>
                              <Link to="dashboard/student-settings.html">
                                Settings
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="ecommerce/shop.html">eCommerce</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="ecommerce/shop.html">
                            Shop
                            <span className="mega__menu__label">
                              Online Store
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="ecommerce/product-details.html">
                            Product Details
                          </Link>
                        </li>
                        <li>
                          <Link to="ecommerce/cart.html">Cart</Link>
                        </li>
                        <li>
                          <Link to="ecommerce/checkout.html">Checkout</Link>
                        </li>
                        <li>
                          <Link to="ecommerce/wishlist.html">Wishlist</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="mobile-curr-lang-wrap">
              <div className="single-mobile-curr-lang">
                <Link className="mobile-language-active" to="#">
                  Language <i className="icofont-thin-down" />
                </Link>
                <div className="lang-curr-dropdown lang-dropdown-active">
                  <ul>
                    <li>
                      <Link to="#">English (US)</Link>
                    </li>
                    <li>
                      <Link to="#">English (UK)</Link>
                    </li>
                    <li>
                      <Link to="#">Spanish</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="single-mobile-curr-lang">
                <Link className="mobile-account-active" to="#">
                  My Account <i className="icofont-thin-down" />
                </Link>
                <div className="lang-curr-dropdown account-dropdown-active">
                  <ul>
                    <li>
                      <Link to="login.html">Login</Link>
                    </li>
                    <li>
                      <Link to="login.html">/ Create Account</Link>
                    </li>
                    <li>
                      <Link to="login.html">My Account</Link>
                    </li>
                  </ul>
                </div>
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
      </>
    </>
  );
};

export default Navbar;
