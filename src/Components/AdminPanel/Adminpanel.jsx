import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FiHome,
  FiLogOut,
  
} from "react-icons/fi";
import { FaList, FaRegHeart } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "./Admin.css";

const Adminpanel = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse); // Toggle menuCollapse state
  };

  return (
    <div id="header">
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={3} lg={2} className="sidebar">
            <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FiHome /> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaList /> Students
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaRegHeart /> Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <RiPencilLine /> Author
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <BiCog /> Settings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FiLogOut /> Logout
                </a>
              </li>
            </ul>
           
          </Col>
          <Col xs={12} sm={12} md={9} lg={10} className="content">
            {/* Main content goes here */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Adminpanel;
