import React, { useState } from "react";
import AdminStickeyHeader from "./AdminStickeyHeader";
import License from "../License/License";
import AdminSubscription from "./AdminSubscription";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

const AdminDashboard = () => {
  const [showLicense, setShowLicense] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const handleLicenseClick = () => {
    setShowLicense(true);
    setShowSubscription(false);
  };

  const handleSubscriptionClick = () => {
    setShowLicense(false);
    setShowSubscription(true);
  };

  const handleHomeClick = () => {
    setShowLicense(false);
    setShowSubscription(false);
  };

  return (
    <>
      <main className="main_wrapper">
        <AdminStickeyHeader />

        <div className="dashboardarea ">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-12">
                  <div className="dashboard__inner sticky-top">
                    <div className="dashboard__nav__title">
                      <h6>
                        <span>Welcome</span>, ####
                      </h6>
                    </div>
                    <div className="dashboard__nav">
                      <ul>
                        <li>
                          <Link onClick={handleHomeClick}>
                            <i className="fa-solid fa-house"></i>
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link onClick={handleLicenseClick}>
                            <i className="fa-solid fa-id-card"></i>
                            License
                          </Link>
                        </li>
                        <li>
                          <Link onClick={handleSubscriptionClick}>
                            <i className="fa-solid fa-id-card"></i>
                            Subscription
                          </Link>
                        </li>

                        <li>
                          <Link>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>{" "}
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div>
                    {/* Render Home content by default */}
                    {!showLicense && !showSubscription && (
                      <div>
                        {/* Your Home content here */}
                        <Row>
                          <Col lg={3} xs={6}>
                            <Card bg="info" text="white">
                              <Card.Body>
                                <Card.Title>150</Card.Title>
                                <Card.Text>New Orders</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-white">
                                  More info{" "}
                                  <i className="fas fa-arrow-circle-right"></i>
                                </small>
                              </Card.Footer>
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="success" text="white">
                              <Card.Body>
                                <Card.Title>
                                  53<sup style={{ fontSize: "20px" }}>%</sup>
                                </Card.Title>
                                <Card.Text>Bounce Rate</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-white">
                                  More info{" "}
                                  <i className="fas fa-arrow-circle-right"></i>
                                </small>
                              </Card.Footer>
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="warning" text="white">
                              <Card.Body>
                                <Card.Title>44</Card.Title>
                                <Card.Text>User Registrations</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-white">
                                  More info{" "}
                                  <i className="fas fa-arrow-circle-right"></i>
                                </small>
                              </Card.Footer>
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="danger" text="white">
                              <Card.Body>
                                <Card.Title>65</Card.Title>
                                <Card.Text>Unique Visitors</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-white">
                                  More info{" "}
                                  <i className="fas fa-arrow-circle-right"></i>
                                </small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {/* Render License content when License is selected */}
                    {showLicense && <License />}

                    {/* Render Subscription content when Subscription is selected */}
                    {showSubscription && <AdminSubscription />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
