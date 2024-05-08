import React, { useEffect, useState } from "react";
import AdminStickeyHeader from "./AdminStickeyHeader";
import License from "../License/License";
import AdminSubscription from "./AdminSubscription";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [showLicense, setShowLicense] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [totalUsers,setTotalUsers]=useState(0)
  const [subscribedUser,setSubscribeduser] = useState(0)
  const [notSubscribed ,setNosubscribed]=useState(0)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/v2/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data.userCount);
        setTotalUsers(response.data.userCount);
        setNosubscribed(response.data.usercount)
        setSubscribeduser(response.data.isusercount)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchData();
  }, []);
  

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
                        <span>Welcome</span>, Admin
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
                                <Card.Title>{totalUsers}</Card.Title>
                                <Card.Text style={{color:"white"}}>Total Users</Card.Text>
                              </Card.Body>
                              
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="success" text="white">
                              <Card.Body>
                                <Card.Title>
                                  {subscribedUser}
                                </Card.Title>
                                <Card.Text style={{color:"white"}}>Subscribed Users</Card.Text>
                              </Card.Body>
                              
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="warning" text="white">
                              <Card.Body>
                                <Card.Title>{notSubscribed}</Card.Title>
                                <Card.Text style={{color:"white"}}>Not Subscribed Users</Card.Text>
                              </Card.Body>
                              
                            </Card>
                          </Col>
                          <Col lg={3} xs={6}>
                            <Card bg="danger" text="white">
                              <Card.Body>
                                <Card.Title>65</Card.Title>
                                <Card.Text style={{color:"white"}}>Unique Visitors</Card.Text>
                              </Card.Body>
                             
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
