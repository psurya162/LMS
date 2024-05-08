import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Modal,
  Button,
  Table,
  ModalTitle,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";
import { toast, Toaster } from "sonner";

const License = () => {
  const [details, setDetails] = useState({
    name: "",
    phoneno: "",
    email: "",
    organisation: "",
    content: "",
    board: "",
    medium: "",
    duration: "",
  });

  const [appCode, setAppCode] = useState("");
  const [show, setShow] = useState(false);
  const [licenseShow, setLicenseShow] = useState(false);
  const [showAppCodeModal, setShowAppCodeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeLicenses, setActiveLicenses] = useState(0);
  const [expiredLicenses, setExpiredLicenses] = useState(0);
  const [pendingLicenses, setPendingLicenses] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/v2/license-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActiveLicenses(response.data.activeLicenses);
      setExpiredLicenses(response.data.expiredLicenses);
      setPendingLicenses(response.data.pendingLicenses);
    } catch (error) {
      console.error("Error fetching license data:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(appCode)
      .then(() => {
        console.log("App code copied to clipboard:", appCode);
        // Optionally, you can show a success message to the user
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
        // Optionally, you can show an error message to the user
      });
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    try {
      // Check if all fields are provided
      if (
        !details.name ||
        !details.phoneno ||
        !details.email ||
        !details.organisation ||
        !details.content ||
        !details.board ||
        !details.medium ||
        !details.duration
      ) {
        // If any field is missing, display an error message to the user
        toast.error("All fields are required");
        return;
      }

      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        // Handle case when token is not available
        console.error("Token not found");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/v2/license",
        details,
        config
      );
      console.log(response.data); // Assuming the API returns some data upon successful creation
      // Reset the form after successful submission
      toast.success("License Created SuccessFully");
      const generatedCode = generateRandomCode();
      setAppCode(generatedCode);
      console.log("Setting showModal to true...");
      setShowModal(false); // Close the license creation modal
      setDetails({
        name: "",
        email: "",
        phoneno: "",
        organisation: "",
        content: "",
        board: "",
        medium: "",
        duration: "",
      });
      setShowAppCodeModal(true); // Show the modal for displaying the generated app code
    } catch (err) {
      console.error("Error creating license:", err);
      // Handle error gracefully, e.g., display error message to the user
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const LicenseShowclose = () => setLicenseShow(false);
  const LicenseShowOpen = () => setLicenseShow(true);

  const licenses = [
    {
      id: 1,
      name: "License 1",
      startDate: "2024-01-01",
      expiryDate: "2024-12-31",
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 2,
      name: "License 2",
      startDate: "2024-02-15",
      expiryDate: "2025-02-14",
      status: "Expired",
      createdBy: "User",
    },
    // Add more license data as needed
  ];

  function generateRandomCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const date = currentDate.getDate().toString().padStart(2, "0");
    let hour = currentDate.getHours().toString().padStart(2, "0");
    const minute = currentDate.getMinutes().toString().padStart(2, "0");
    const second = currentDate.getSeconds().toString().padStart(2, "0");

    const randomCode = `DV${year}${date}${hour}${minute}${second}`;
    return randomCode;
  }

  return (
    <>
      <Toaster position="top-right" />
      <main className="main_wrapper">
        <div className="dashboardarea">
          <div className="container-fluid">
            <div className="dashboard__section__title">
              <h4>License Information</h4>
            </div>
            <Row>
              <Col lg={3} xs={6}>
                <Card
                  bg="info"
                  text="white"
                  className="btn"
                  onClick={() => setShowModal(true)}
                >
                  <Card.Body>
                    <Card.Text style={{ color: "white", fontSize: "20px" }}>
                      Create Licenses
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} xs={6}>
                <Card
                  bg="success"
                  text="white"
                  className="btn"
                  onClick={handleShow}
                >
                  <Card.Body>
                    {/* <Card.Title>{activeLicenses}</Card.Title> */}
                    <Card.Text style={{ color: "white", fontSize: "20px" }}>
                      View Licenses
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} xs={6}>
  <Card bg="warning" text="white" className="btn" onClick={LicenseShowOpen}>
    <Card.Body>
      {/* <Card.Title>{expiredLicenses}</Card.Title> */}
      <Card.Text style={{ color: "white", fontSize: "20px" }}>
        Expired Licenses
      </Card.Text>
    </Card.Body>
  </Card>
</Col>

              <Col lg={3} xs={6}>
                <Card bg="danger" text="white">
                  <Card.Body>
                    <Card.Title>{pendingLicenses}</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      Pending Licenses
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <Modal show={showModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create License</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <form onSubmit={HandleSubmit}>
                <div className="col-xl-12">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={details.name}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={details.email}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Mobile <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phoneno"
                            value={details.phoneno}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Organization <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="organisation"
                            value={details.organisation}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Content <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="content"
                            value={details.content}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Board <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="board"
                            value={details.board}
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Medium <span className="text-danger">*</span>
                          </label>
                          <select
                            name="medium"
                            value={details.medium}
                            onChange={HandleChange}
                          >
                            <option selected="" disabled="">
                              Select{" "}
                            </option>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>
                            Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={details.duration}
                            name="duration"
                            onChange={HandleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="dashboard__form__button">
                        <button className="default__button" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showAppCodeModal}
          onHide={() => setShowAppCodeModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Generated App Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center m-0 h4">
              <strong>{appCode}</strong>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowAppCodeModal(false)}>Close</Button>
            <Button onCanPlay={copyToClipboard}>Copy</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose} size="lg ">
          <Modal.Header closeButton>
            <Modal.Title>All Licenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>License Key</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Created </th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((license) => (
                  <tr key={license.id}>
                    <td>{license.name}</td>
                    <td>{license.startDate}</td>
                    <td>{license.expiryDate}</td>
                    <td>{license.status}</td>
                    <td>{license.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal size="lg" show={licenseShow} onHide={LicenseShowclose}>
          <Modal.Header closeButton>
            <Modal.Title>Expired License</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th>License Key</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>adscsa</td>
                  <td>adscsa</td>
                  <td>adscsa</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={LicenseShowclose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default License;
