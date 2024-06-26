

import React from "react";
import { Routes, Route ,useParams  } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import HeroSection from "./Components/HeroSection/HeroSection";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import DeltaView from "./Components/DeltaViewApp/DeltaView";
import DeltaPartner from "./Components/DeltaPartner/DeltaPartner";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import SelectBoard from "./Components/SelectBoard/SelectBoard";
import SelectLanguage from "./Components/SelectLanguage/SelectLanguage";
import SelectClass from "./Components/SelectClass/SelectClass";
import SelectStream from "./Components/SelectStream/SelectStream";
import DashBoard2 from "./Components/DashBoard/DashBoard2";
import ChapterPage2 from "./Components/Chapter/ChapterPage2";
import Admin from "./Components/Admin/Admin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import PDFViewer from "./Components/Chapter/PDFViewer";
import ErrorPage from "./Components/Errorpage/ErrorPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/Delta-view-app" element={<DeltaView />} />
          <Route path="/Delta-Partner" element={<DeltaPartner />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/select-board" element={<SelectBoard />} />
        <Route path="/select-language" element={<SelectLanguage />} />
        <Route path="/select-class" element={<SelectClass />} />
        <Route path="/select-stream" element={<SelectStream />} />
        <Route path="/dashboard" element={<DashBoard2 />} />
        <Route path="/chapter/:subjectId" element={<ChapterPage2Wrapper />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/pdf-viewer/:bookUrl" element={<PDFViewer />} />
        <Route path="*" element={<ErrorPage/> } />
      </Routes>

      
    </>
  );
};
const ChapterPage2Wrapper = () => {
  const { subjectId } = useParams();
  return <ChapterPage2 selectedSubjectId={subjectId} />;
};

export default App;
