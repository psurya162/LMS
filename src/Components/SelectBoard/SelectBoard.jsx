import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast, Toaster } from "sonner";

const SelectBoard = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardSelected, setBoardSelected] = useState(false);

  const navigate = useNavigate();

  const handleBoardSelect = async (board) => {
    if (!boardSelected) {
      setSelectedBoard(board);
      setBoardSelected(true);

      try {
        // Get the token from localStorage (assuming it's stored there)
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          throw new Error("Token is missing");
        }

        // Send a request to the backend endpoint to update the selected board
        const res = await axios.put(
          "http://localhost:5000/api/v1/board",
          {
            board: board,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        console.log(res.data); // Log the response data
        console.log("Board updated successfully");
        toast.success(`You selected ${board} board`);
      } catch (error) {
        console.error("Error updating board:", error);
        // Handle error
      }
    }
  };

  const handleNext = async () => {
    if (!boardSelected) {
      // Show an error message if no board is selected
      toast.error("Please select a board before proceeding");
    } else {
      // Show success toast when class is selected
      toast.success(`You selected ${selectedBoard} board`);
      // Navigate to the next step if a board is selected
      navigate("/select-language");
    }
  };

  React.useEffect(() => {
    if (boardSelected) {
      console.log("Selected board:", selectedBoard);
    }
  }, [boardSelected, selectedBoard]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="main_wrapper overflow-hidden">
        <section className="login-steps steps-bg">
          <Container>
            <Row className="align-items-center">
              <Col lg={5} className="mx-auto text-center">
                <div className="select-board-box">
                  <img
                    src="./src/assets/img/logo/delta-view-logo.png"
                    alt="logo_2"
                  />
                  <div className="select-board">
                    <h4>Select Board</h4>
                    <ul className="list-box">
                      <li>
                        <Link
                          className={selectedBoard === "CBSE" ? "active" : ""}
                          onClick={() => handleBoardSelect("CBSE")}
                          //   activeclassname="active"
                        >
                          Central Board of Secondary Education
                        </Link>
                      </li>
                      {/* <li>
                      <NavLink activeclassname="active" onClick={() => handleBoardSelect("Bihar Board")}>
                       Bihar
                      </NavLink>
                    </li> */}
                      {/* Add more boards here */}
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

export default SelectBoard;
