import React from "react";

const Offcanvas = ({handleClose}) => {
  return (
    <>
      <div className="v-sidebar-wrapper sidebar-control">
        <div className="v-sidebar">
          <div className="v-sidebar-header">
            <img
              src="https://deltaweb.in/deltaview-lms/img/logo/delta-view-logo.png"
              width="100%"
            />
          </div>
          <div className="v-sidebar-body">
            <div>
              <h4>Please get in touch and we will be happy to help you.</h4>
              <ul>
                <li>
                  <i className="icofont-checked" />
                  If you wish to ask any question about DeltaView.
                </li>
                <li>
                  <i className="icofont-checked" />
                  If you have an amazing idea to grow DeltaView and its reach.
                </li>
                <li>
                  <i className="icofont-checked" />
                  If you wish to share your feelings about DeltaView.
                </li>
              </ul>
              <div className="contactnow">
                <div className="contactnow-info callus">
                  <i className="icofont-ui-call" />
                  <a href="tel:1234567890">
                    <span>Call Us :</span>9966548751
                  </a>
                </div>
                <div className="contactnow-info whatsapp">
                  <i className="icofont-brand-whatsapp" />
                  <a href="tel:1234567890">
                    <span>WhatsApp Us :</span>+91-86966548751
                  </a>
                </div>
                <div className="contactnow-info emailus">
                  <i className="icofont-ui-email" />
                  <a href="mailto:support@gmail.com">
                    <span>E-mail Us :</span>support@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="v-sidebar-fade" style={{ display: "block" }}>
          <button id="sidebar-close-btn" onClick={handleClose}>
            <i className="icofont-close-line text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
