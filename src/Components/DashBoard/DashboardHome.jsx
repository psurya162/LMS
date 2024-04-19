import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import {BounceLoader} from 'react-spinners'

const DashboardHome = ({ handleSubjectClick ,userData ,setUserData }) => {
  const [subjects, setSubjects] = useState([]);
 
  

  useEffect(() => {
    // console.log("useEffect triggered");
    const fetchUserSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is not available
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/v1/getsubject", // Update the endpoint URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
        );
        setSubjects(response.data.result); // Set the fetched subjects data
        // console.log(response.data.result);
      } catch (err) {
        console.log("Error Fetching user subjects: " + err);
      }
    };

    fetchUserSubjects();
  }, [userData]);

 

  

 
  return (
    <>
      <div className="col-xl-9 col-lg-9 col-md-12">
        <div className="dashboard__content__wraper">
          <div className="dashboard__section__title">
            <h4>Your Subjects</h4>
          </div>
          <div className="row">
            {subjects.map((subject) => (
              <div className="col-lg-auto col-12 fix-width168 d-flex" key={subject.id}>
                <Link
                   to={`/chapter/${subject.id}`}
                  className="dashboard__single__counter"
                  
                  onClick={() => handleSubjectClick(subject.id)} // Pass subject ID to parent component
                >
                  <div className="counterarea__text__wraper d-block text-center">
                    <div className="counter__img mb-2 me-0">
                      <img
                       className="img-logo"
                        loading="lazy"
                        src={subject.subject_logo} // Assuming subject logo URL is provided in the response
                        alt="counter"
                      />
                    </div>
                    <div className="counter__content__wraper">
                      <p>{subject.subject_name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
