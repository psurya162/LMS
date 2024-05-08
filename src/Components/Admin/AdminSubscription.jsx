import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal } from "react-bootstrap";
import "./Admin.css";

const AdminSubscription = () => {
  const [rowData, setRowData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // State to store additional user details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/v2/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Map the data and assign new IDs starting from 1
        const modifiedData = data.allUsers.map((user, index) => ({
          ...user,
          id: index + 1,
        }));
        setRowData(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      valueGetter: (params) => params.node.rowIndex + 1,
    },
    { headerName: "Username", field: "username", sortable: true },
    { headerName: "Email", field: "email", sortable: true },
    {
      headerName: "Is Subscribed", 
      field: "issubscribed", 
      sortable: true,
      valueFormatter: (params) => {
        console.log("issubscribed value:", params.value);
        return params.value === "1" ? "Subscription" : "Pending";
      }
    },
    
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => {
        return (
          <button
            className="btn btn-warning"
            onClick={() => handleViewClick(params.data)}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        );
      },
    },
  ];
  
  

  const handleViewClick = async (row) => {
    setSelectedRow(row);
    setShowModal(true);
    try {
      const response = await fetch(`http://localhost:5000/v2/user/${row.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await response.json();
      setUserDetails(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserDetails(null); // Clear user details when modal is closed
  };

  return (
    <div>
      <div className="dashboard__section__title">
                      <h4>Subscriptions</h4>
                    </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          rowClass="custom-row"
        />
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Username:</strong> {selectedRow.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedRow.email}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedRow.status}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedRow.name}
                  </p>
                  <p>
                    <strong>Grade:</strong> {selectedRow.grade}
                  </p>
                  <p>
                    <strong>Stream:</strong> {selectedRow.stream}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedRow.phone}
                  </p>
                  <p>
                    <strong>Alternate Phone:</strong>{" "}
                    {selectedRow.alternatephone}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Gender:</strong> {selectedRow.gender}
                  </p>
                  <p>
                    <strong>DOB:</strong> {selectedRow.dob}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedRow.city}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedRow.state}
                  </p>
                  <p>
                    <strong>School:</strong> {selectedRow.school}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedRow.address}
                  </p>
                  <p>
                    <strong>Board:</strong> {selectedRow.board}
                  </p>
                  <p>
                    <strong>Language:</strong> {selectedRow.language}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Is Subscribed:</strong>{" "}
                    {selectedRow.issubscribed === "1"
                      ? "Subscription"
                      : "Pending"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Subscription Start Date:</strong>{" "}
                    {selectedRow.subscriptionStartDate}
                  </p>
                  <p>
                    <strong>Subscription Expiry Date:</strong>{" "}
                    {selectedRow.subscriptionExpiryDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminSubscription;
