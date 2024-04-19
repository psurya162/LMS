import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import { Toaster, toast } from 'sonner';

const SelectLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Default selection
  const [languageSelected, setLanguageSelected] = useState(false); // Track whether language is selected

  const navigate = useNavigate();

  const handleLanguageSelect = async (language) => {
    if (!languageSelected) {
      setSelectedLanguage(language);
      setLanguageSelected(true);
  
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
  
        // Check if the token is available
        if (!token) {
          throw new Error('Token is missing');
        }
  
        // Send a request to the backend endpoint to update the selected language
        const res = await axios.put('http://localhost:5000/api/v1/language', {
          language: language,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        console.log(res.data); // Log the response data
        console.log('Language updated successfully');
        toast.success(`You selected ${language}`);
      } catch (error) {
        console.error('Error updating language:', error);
        // Handle error
      }
    } else if (language !== selectedLanguage) {
      // Update selected language if a different language is selected
      setSelectedLanguage(language);
    }
  };
  

  const handleNext = () => {
    if (!languageSelected) {
      // Show alert or error message if no language is selected
      toast.error("Please select a language.");
      return;
    }

    console.log("Selected Language:", selectedLanguage); // Log selected language to console
    console.log("Navigate")
    navigate("/select-class");
  };

  return (
    <>
      <Toaster richColors position='top-right' />
      <main className="main_wrapper overflow-hidden">
        <section className="login-steps steps-bg">
          <Container>
            <Row>
              <Col lg={12} className="text-center">
                <NavLink className="loginlogo" to="/select-board">
                  <i className="icofont-double-left"></i><span>Back</span>
                </NavLink>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg={4} className="mx-auto text-center">
                <div className="select-board-box">
                  <img src="./src/assets/img/logo/delta-view-logo.png" alt="logo_2" />
                  <div className="select-board">
                    <h4>Choose Your Preferred Language</h4>
                    <ul className="list-box">
                      <li>
                        <Link
                          className={selectedLanguage === "English" ? "active" : ""}
                          onClick={() => handleLanguageSelect("English")}
                          
                        >
                          English
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={selectedLanguage === "Hindi" ? "active" : ""}
                          onClick={() => handleLanguageSelect("Hindi")}
                          
                        >
                          Hindi
                        </Link>
                      </li> */}
                      {/* Add other languages here */}
                    </ul>
                    <Button className="default__button w-100" onClick={handleNext}>
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

export default SelectLanguage;
