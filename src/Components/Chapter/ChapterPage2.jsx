import React from "react";
import DashBoardfooter from "../DashBoard/DashBoardfooter";
import DashboardStickybar from "../DashBoard/DashboardStickybar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useParams } from "react-router-dom";
import { useUser } from "../../Store";


const ChapterPage2 = ({ selectedSubjectId }) => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [subjectTitle, setSubjectTitle] = useState(""); // State to store subject title
  const [totalVideos, setTotalVideos] = useState(0); // State to store total number of videos
  const [subject_logo, setSubjectLogo] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null); // State to store the current video URL
  const [books, setBooks] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [playLimit, setPlayLimit] = useState(0);
  const [playL, setPlayL] = useState(0);
  const [is_icon, set_icon] = useState(0);
  const { userData, setUserData } = useUser(); // Use useUser hook
  

  const toggleAccordion = (sectionId) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sectionId ? null : sectionId
    );
  };
  const [activeTab, setActiveTab] = useState("chapt_video");
  const handleBackButtonClick = () => {
    // Navigate back to the dashboard
    navigate("/dashboard");
  };
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const [videos, setVideos] = useState([]);
  const handleVideoClick = (videoUrl, index) => {
    setCurrentVideo(videoUrl); // Set the clicked video URL to the currentVideo state
    setActiveVideoIndex(index); // Set the clicked video index as active
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is not available
          return;
        }

        const response = await axios.get(
          `https://deltaviewlms.onrender.com/api/v1/getvideos/${selectedSubjectId}`, // Use selectedSubjectId as the id parameter
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.videos.length > 0) {
          const { videos, playLimit, playL, subject_logo } = response.data;

          console.log(response.data);
          setSubjectTitle(videos[0].subject_title);
          setSubjectLogo(subject_logo); // Set subject logo in state
          setTotalVideos(playL);
          setVideos(videos);
          setPlayL(playL);
          setPlayLimit(playLimit);
          set_icon(response.data.videoTitles.length);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is not available
          return;
        }

        const response = await axios.get(
          `https://deltaviewlms.onrender.com/api/v1/books/${selectedSubjectId}`, // Use selectedSubjectId as the id parameter
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (selectedSubjectId) {
      fetchVideos();
      fetchBooks();
    }
  }, [selectedSubjectId]);

  // Function to update the class and navigate to dashboard
  const updateClassAndNavigateToDashboard = async (classNumber) => {
    try {
      const response = await axios.put(
        "https://deltaviewlms.onrender.com/api/v1/updategrade",
        { grade: classNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Affected Rows:", response.data.affected_rows);
      const updatedUserData = { ...userData };
      updatedUserData.grade = classNumber;
      setUserData(updatedUserData); // Update userData immediately

      navigate("/dashboard"); // Navigate to dashboard
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error("Failed to update grade");
    }
  };

  const handleBookClick = (bookUrl) => {
    // Navigate to the PDF viewer route with the book URL as a parameter
    navigate(`/pdf-viewer/${encodeURIComponent(bookUrl)}`);
  };

  return (
    <>
      <div className="main_wrapper">
        <DashboardStickybar
          updateClassAndNavigateToDashboard={updateClassAndNavigateToDashboard}
        />

        <section className="learning-sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 bdr-right">
                <div className="custom-sticky sticky-top">
                  <ul
                    className="nav about__button__wrap dashboard__button__wrap mb-4 justify-content-between"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={`single__tab__link ${
                          activeTab === "chapt_video" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("chapt_video")}
                        type="button"
                        aria-selected={activeTab === "chapt_video"}
                        role="tab"
                      >
                        Video
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`single__tab__link ${
                          activeTab === "books" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("books")}
                        type="button"
                        aria-selected={activeTab === "books"}
                        role="tab"
                      >
                        Books
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`single__tab__link ${
                          activeTab === "notes" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("notes")}
                        type="button"
                        aria-selected={activeTab === "notes"}
                        role="tab"
                      >
                        Notes
                      </button>
                    </li>
                  </ul>
                  <div
                    className="tab-content tab__content__wrapper aos-init aos-animate"
                    id="myTabContent"
                    data-aos="fade-up"
                  >
                    <div
                      className={`tab-pane fade ${
                        activeTab === "chapt_video" ? " show active" : ""
                      }`}
                      id="chapt_video"
                      role="tabpanel"
                      aria-labelledby="chapt_video"
                    >
                      {currentVideo && currentVideo.trim() !== "" ? (
                        <video
                          src={currentVideo}
                          width="100%"
                          autoPlay
                          muted
                          controls
                        />
                      ) : (
                        <img
                          src="https://img.freepik.com/free-vector/web-app-subscribe-button-online-followers-vector_1017-45945.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712966400&semt=ais"
                          alt="Placeholder Image"
                          style={{ width: "100%" }}
                        />
                      )}
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "books" ? "show active" : ""
                      }`}
                      id="books"
                      role="tabpanel"
                      aria-labelledby="books"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <h3 className="books-subtitle">{subjectTitle}</h3>
                        </div>
                        {books.map((book) => (
                          <div className="col-lg-6" key={book.id}>
                            <button
                              onClick={() => handleBookClick(book.book_url)}
                              className="practice-box"
                            >
                              <h4>
                                <i className="fa-solid fa-book"></i>
                                {book.books_name}
                              </h4>
                            </button>
                          </div>
                        ))}
                            
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "notes" ? "show active" : ""
                      }`}
                      id="notes"
                      role="tabpanel"
                      aria-labelledby="notes"
                    >
                      Notes content
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="course-layout-content-box custom-sticky sticky-top">
                  <div className="inner-title justify-content-between">
                    <div className="inner-title mb-0">
                      <div className="dashboard__single__counter">
                        <img loading="lazy" src="" alt="Logo" />
                      </div>
                      <div>
                        <h4>{subjectTitle}</h4>
                        <p>
                          <i class="fa-solid fa-book"></i> {totalVideos}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleBackButtonClick}
                      className="btn btn-outline-secondary"
                    >
                      Back
                    </button>
                  </div>
                  <div
                    className="accordion accordion-flush"
                    id="courseaccordion"
                  >
                    {videos.slice(0, playL).map((video, index) => (
                      <div className="accordion-item" key={index}>
                        {/* Accordion header */}
                        <h2
                          className="accordion-header"
                          id={`sec-heading${index + 1}`}
                        >
                          <button
                            className={`accordion-button ${
                              openSection === `sec${index + 1}`
                                ? ""
                                : "collapsed"
                            }`}
                            type="button"
                            onClick={() => toggleAccordion(`sec${index + 1}`)}
                            aria-expanded={openSection === `sec${index + 1}`}
                            aria-controls={`sec${index + 1}`}
                          >
                            <span>Chapter {index + 1} :</span>{" "}
                            {video.chapter_title}
                          </button>
                        </h2>
                        {/* Accordion body */}
                        <div
                          id={`sec${index + 1}`}
                          className={`accordion-collapse collapse ${
                            openSection === `sec${index + 1}` ? "show" : ""
                          }`}
                          aria-labelledby={`sec-heading${index + 1}`}
                          data-bs-parent="#courseaccordion"
                        >
                          <div className="accordion-body course-layout-content-box-inner ps-0 pe-0">
                            <ul className="nav nav-tabs d-block" role="tablist">
                              {/* Rendering video links */}
                              {videos
                                .filter(
                                  (videoItem) =>
                                    videoItem.chapter_title ===
                                    video.chapter_title
                                )
                                .map((videoItem, i) => {
                                  if (
                                    i < playLimit ||
                                    playLimit === videos.length
                                  ) {
                                    return (
                                      <li
                                        key={i}
                                        className="nav-item d-block"
                                        role="presentation"
                                      >
                                        <button
                                          className={`nav-link ${
                                            activeVideoIndex === i && index < 3
                                              ? "active"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            handleVideoClick(videoItem.url, i)
                                          }
                                        >
                                          <i
                                            className={`${
                                              activeVideoIndex === i &&
                                              index < 3
                                                ? "fa-solid fa-circle-play"
                                                : is_icon === 3
                                                ? "fa-solid fa-lock"
                                                : "fa-solid fa-circle-play"
                                            }`}
                                          />
                                          {i + 1}. {videoItem.video_title}
                                        </button>
                                      </li>
                                    );
                                  }
                                  return null;
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DashBoardfooter />
      </div>
    </>
  );
};

export default ChapterPage2;
