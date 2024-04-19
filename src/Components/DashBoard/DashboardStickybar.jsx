import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./model.css";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useUser } from "../../Store";

const DashboardStickybar = ({ updateClassAndNavigateToDashboard }) => {
  const [showClassModal, setShowClassModal] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState(null);
  const { userData, setUserData } = useUser(); // Use useUser hook
  const [selectedClass, setSelectedClass] = useState(null);

  const [showEnglishModal, setShowEnglishModal] = useState(false);
  const [showCBSEModal, setShowCBSEModal] = useState(false);

  const handleCloseModal = (modalName) => {
    switch (modalName) {
      case "class":
        setShowClassModal(false);
        break;
      case "stream":
        setShowStreamModal(false);
        break;
      case "english":
        setShowEnglishModal(false);
        // toast.success("English Selected");
        break;
      case "cbse":
        setShowCBSEModal(false);
        // toast.success("CBSE Selected");
        break;
      default:
        break;
    }
  };

  const handleOpenModal = (modalName) => {
    switch (modalName) {
      case "class":
        setShowClassModal(true);
        break;
      case "stream":
        setShowStreamModal(true);
        break;
      case "english":
        setShowEnglishModal(true);
        break;
      case "cbse":
        setShowCBSEModal(true);
        break;
      default:
        break;
    }
  };

  const handleClassSelect = async (classNumber) => {
    setSelectedClass(classNumber);
    let updatedUserData = { ...userData };
    updatedUserData.grade = classNumber;
    setUserData(updatedUserData); // Update userData immediately

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/updategrade",
        { grade: classNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Class ${classNumber} Selected`);
      console.log("Affected Rows:", response.data.affected_rows);
      handleCloseModal("class");
      localStorage.setItem("selectedClass", classNumber);
      // Open the stream modal for classes 11 and 12
      if (classNumber === "11" || classNumber === "12") {
        handleOpenModal("stream");
      } else {
        // Navigate to dashboard for other classes
        await updateClassAndNavigateToDashboard(classNumber);
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("Failed to update grade");
    }
  };

  const handleStreamSelect = async (stream) => {
    setSelectedStream(stream);
    let updatedUserData = { ...userData };
    updatedUserData.stream = stream;
    setUserData(updatedUserData);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/updatestream",
        { stream },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`${stream} Stream Selected`);
      handleCloseModal("stream");

      // Navigate to dashboard after selecting stream
      await updateClassAndNavigateToDashboard(userData.grade);
    } catch (error) {
      console.error("Error updating stream:", error);
      toast.error("Failed to update stream");
    }
  };
  return (
    <>
      <Toaster />
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
              <div className="col-xl-10 col-lg-10 main_menu_wrap text-end">
                <div className="admin-header-menu">
                  <ul>
                    <li>
                      <Link
                        to="#"
                        onClick={() => handleOpenModal("class")}
                        className={selectedClass ? "active" : ""}
                      >
                        Class {userData && userData.grade ? userData.grade : ""}
                        <i className="icofont-rounded-down" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => handleOpenModal("english")}>
                        English
                      </Link>
                    </li>

                    <li>
                      <Link to="#" onClick={() => handleOpenModal("cbse")}>
                        CBSE{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mob_menu_wrapper">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="mobile-logo">
                  <Link className="logo__dark">
                    <img
                      loading="lazy"
                      src="https://deltaweb.in/deltaview-lms/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-6">
                <div className="header-right-wrap">
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
      </header>
      <Modal
        show={showClassModal}
        onHide={() => handleCloseModal("class")}
        aria-labelledby="choose-class-modal"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="select-board">
            <ul className="list-class">
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("12")}
                  className={selectedClass === "12" ? "active" : ""}
                >
                  12th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("11")}
                  className={selectedClass === "11" ? "active" : ""}
                >
                  11th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("10")}
                  className={selectedClass === "10" ? "active" : ""}
                >
                  10th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("9")}
                  className={selectedClass === "9" ? "active" : ""}
                >
                  9th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("8")}
                  className={selectedClass === "8" ? "active" : ""}
                >
                  8th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("7")}
                  className={selectedClass === "7" ? "active" : ""}
                >
                  7th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("6")}
                  className={selectedClass === "6" ? "active" : ""}
                >
                  6th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("5")}
                  className={selectedClass === "5" ? "active" : ""}
                >
                  5th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("4")}
                  className={selectedClass === "4" ? "active" : ""}
                >
                  4th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("3")}
                  className={selectedClass === "3" ? "active" : ""}
                >
                  3th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("2")}
                  className={selectedClass === "2" ? "active" : ""}
                >
                  2th
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handleClassSelect("1")}
                  className={selectedClass === "1" ? "active" : ""}
                >
                  1th
                </Link>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal("class")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showStreamModal}
        onHide={() => handleCloseModal("stream")}
        aria-labelledby="choose-stream-modal"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Stream</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="select-board">
            <ul className="list-box">
              <li>
                <Link to="#" onClick={() => handleStreamSelect("1")}>
                  Arts
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleStreamSelect("2")}>
                  Commerce
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleStreamSelect("3")}>
                  Science
                </Link>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleCloseModal("stream")}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* English Modal */}
      <Modal
        show={showEnglishModal}
        onHide={() => handleCloseModal("english")}
        aria-labelledby="choose-english-modal"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>English</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="select-board">
            <ul className="list-box">
              <li>
                <Link to="#" onClick={() => handleCloseModal("english")}>
                  English
                </Link>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleCloseModal("english")}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CBSE Modal */}
      <Modal
        show={showCBSEModal}
        onHide={() => handleCloseModal("cbse")}
        aria-labelledby="choose-cbse-modal"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>CBSE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="select-board">
            <ul className="list-box">
              <li>
                <Link to="#" onClick={() => handleCloseModal("cbse")}>
                  CBSE
                </Link>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal("cbse")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardStickybar;
