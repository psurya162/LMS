import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners"; // Import PacmanLoader

const DashboardHome = ({ handleSubjectClick, userData }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for controlling loader visibility
  const [randomQuote, setRandomQuote] = useState(null); // State to hold a single random quote

  // JSON data of study quotes
  const studyQuotesData = [
    {
      "id": 1,
      "quote": "The only way to learn mathematics is to do mathematics.",
      "author": "Paul Halmos"
    },
    {
      "id": 2,
      "quote": "Learning never exhausts the mind.",
      "author": "Leonardo da Vinci"
    },
    {
      "id": 3,
      "quote": "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      "author": "Malcolm X"
    },
    {
      "id": 4,
      "quote": "Education is not the learning of facts, but the training of the mind to think.",
      "author": "Albert Einstein"
    },
    {
      "id": 5,
      "quote": "The beautiful thing about learning is that no one can take it away from you.",
      "author": "B.B. King"
    },
    {
      "id": 6,
      "quote": "Success is the sum of small efforts, repeated day in and day out.",
      "author": "Robert Collier"
    },
    {
      "id": 7,
      "quote": "The expert in anything was once a beginner.",
      "author": "Helen Hayes"
    },
    {
      "id": 8,
      "quote": "The only person who is educated is the one who has learned how to learn and change.",
      "author": "Carl Rogers"
    },
    {
      "id": 9,
      "quote": "Education is the key to unlocking the world, a passport to freedom.",
      "author": "Oprah Winfrey"
    },
    {
      "id": 10,
      "quote": "The mind is not a vessel to be filled, but a fire to be kindled.",
      "author": "Plutarch"
    }
    // Add more quotes here
  ];

  // Function to shuffle the quotes array
  const shuffleQuotes = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }

    return array;
  };

  useEffect(() => {
    const fetchUserSubjects = async () => {
      try {
        setIsLoading(true); // Show loader before making the API call
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is not available
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/v1/getsubject",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubjects(response.data.result); // Set the fetched subjects data
      } catch (err) {
        console.log("Error Fetching user subjects: " + err);
      } finally {
        // Introduce a delay of 2 seconds before hiding the loader
        setTimeout(() => {
          setIsLoading(false); // Hide loader after a delay
        }, 2000); // Adjust the delay time as needed
      }
    };

    // Fetch user subjects and select a random quote when component mounts
    fetchUserSubjects();
    const shuffledQuotes = shuffleQuotes([...studyQuotesData]);
    setRandomQuote(shuffledQuotes[0]); // Select the first quote after shuffling
  }, [userData]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12">
      <div className="dashboard__content__wraper">
        <div className="dashboard__section__title">
          <h4>Your Subjects</h4>
        </div>
        {isLoading ? ( // Show loader if isLoading is true
          <div
            className="loader-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ScaleLoader color="rgb(32 41 87)" />
            {/* Render a random quote within the loader */}
            {randomQuote && (
              <div className="study-quotes" style={{ marginTop: "20px" }}>
                <p>"{randomQuote.quote}" - {randomQuote.author}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="row">
            {subjects.map((subject) => (
              <div
                className="col-lg-auto col-12 fix-width168 d-flex"
                key={subject.id}
              >
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
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
