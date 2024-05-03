import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal } from 'react-bootstrap';
import "./Admin.css"

const AdminSubscription = () => {
  const columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Album', field: 'album', sortable: true },
    { headerName: 'Year', field: 'year', sortable: true },
    { headerName: 'Length', field: 'length', sortable: true },
    { headerName: 'Composer', field: 'composer', sortable: true },
    {
      headerName: "Action",
      field: "action",
      sortable: true,
      cellRenderer: (params) => {
        return (
          <button  className=' btn btn-warning' onClick={() => handleViewClick(params.data)}><i class="fa-solid fa-eye"></i></button>
        );
      }
    }
  ];

  const rowData = [
    { name: 'Dragon Rider', album: 'Archangel', year: 2010, length: 1.53, composer: 'Thomas Bergersen' },
    { name: 'Fire Nation', album: 'Invincible', year: 2010, length: 2.59, composer: 'Nick Phoenix' },
    { name: 'Blackheart', album: 'SkyWorld', year: 2012, length: 4.32, composer: 'Thomas Bergersen' }
    // Add more data as needed
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          rowClass="custom-row"
        />
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title >Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {selectedRow ? selectedRow.name : ''}</p>
          <p><strong>Album:</strong> {selectedRow ? selectedRow.album : ''}</p>
          <p><strong>Year:</strong> {selectedRow ? selectedRow.year : ''}</p>
          <p><strong>Length:</strong> {selectedRow ? selectedRow.length : ''}</p>
          <p><strong>Composer:</strong> {selectedRow ? selectedRow.composer : ''}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminSubscription;