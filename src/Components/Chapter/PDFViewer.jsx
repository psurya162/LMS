
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PDFViewer = () => {
  const { bookUrl } = useParams();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back
  };

  return (
    <>
      <div style={{ position: "relative", backgroundColor: "white" }}>
        <button
          className="btn btn-primary m-2"
          onClick={handleBackButtonClick}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <iframe
          src={bookUrl + "#toolbar=0"}
          title="PDF Viewer"
          width="100%"
          height="700px"
          style={{ zIndex: 0 }}
        ></iframe>
      </div>
    </>
  );
};

export default PDFViewer;
