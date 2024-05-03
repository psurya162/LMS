import React from "react";

const AdminStickeyHeader = () => {
  return (
    <>
      <header className="sticky-top">
        <div className="headerarea headerarea__3 header__area pt-3 pb-3">
          <div className="container desktop__menu__wrapper">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6">
                <div className="headerarea__left">
                  <div className="headerarea__left__logo">
                    <img
                      loading="lazy"
                      src="https://deltaweb.in/deltaview-lms/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mob_menu_wrapper">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="mobile-logo">
                  <a className="logo__dark">
                    <img
                      loading="lazy"
                      src="https://deltaweb.in/deltaview-lms/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
              <div className="col-6">
                <div className="header-right-wrap">
                  <div className="mobile-off-canvas">
                    <a className="mobile-aside-button" href="#">
                      <i className="icofont-navigation-menu" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminStickeyHeader;
