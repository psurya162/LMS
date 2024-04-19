import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import axios from "axios"; // Import axios for making HTTP requests

const SelectStream = () => {
  const [selectedStream, setSelectedStream] = useState(""); // State to track the selected stream
  const [streamSelected, setStreamSelected] = useState(false);
  const navigate = useNavigate();

  // Function to handle stream selection
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    setStreamSelected(true);
    toast.info(`You Selected the ${stream}`);
  };

  // Function to handle navigation to dashboard
  // Function to handle navigation to login page and token removal
  const handleNext = async () => {
    if (!selectedStream) {
      // Show alert or error message if no stream is selected
      toast.error("Please select a stream.");
      return;
    }

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token is available
      if (!token) {
        throw new Error("Token is missing");
      }

      // Call the selectstream API endpoint with the selected stream
      const response = await axios.put(
        `http://localhost:5000/api/v1/userstream`,
        {
          stream: selectedStream,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 200) {
        toast.success("Stream selected successfully");

        // Remove token from localStorage
        localStorage.removeItem("token");

        // Navigate to the login page after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Failed to select stream");
      }
    } catch (error) {
      console.error("Error selecting stream:", error);
      toast.error("Failed to select stream");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="main_wrapper overflow-hidden">
        <section className="login-steps steps-bg">
          <Container>
            <Row>
              <Col lg={12} className="text-center">
                <Link to="/select-class" className="loginlogo">
                  <i className="icofont-double-left" /> <span>Back</span>
                </Link>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg={4} className="mx-auto text-center">
                <div className="select-board-box">
                  <img
                    src="./src/assets/img/logo/delta-view-logo.png"
                    alt="logo_2"
                  />
                  <div className="select-board">
                    <h4>Select Your Stream</h4>
                    <ul className="list-box">
                      <li>
                        <Link
                          onClick={() => handleStreamSelect("science")}
                          className={
                            selectedStream === "science" ? "active" : ""
                          }
                        >
                          <img
                            src="./src/assets/img/science.png"
                            alt="Science"
                          />{" "}
                          Science
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            selectedStream === "commerce" ? "active" : ""
                          }
                          onClick={() => handleStreamSelect("commerce")}
                        >
                          <img
                            src="./src/assets/img/commerce.png"
                            alt="commerce"
                          />{" "}
                          Commerce
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={() => handleStreamSelect("arts")}
                          className={selectedStream === "arts" ? "active" : ""}
                        >
                          <img src="./src/assets/img/art.png" alt="art" /> Arts
                        </Link>
                      </li>
                    </ul>
                    <Button
                      className="default__button w-100"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default SelectStream;
