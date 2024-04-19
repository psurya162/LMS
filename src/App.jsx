import React from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import SelectBoard from './Components/SelectBoard/SelectBoard';
import SelectLanguage from './Components/SelectLanguage/SelectLanguage';
import SelectClass from './Components/SelectClass/SelectClass';
import SelectStream from './Components/SelectStream/SelectStream';
import AboutUs from './Components/AboutUs/AboutUs';
import Navbar from './Components/Navbar/Navbar';
import DeltaView from './Components/DeltaViewApp/DeltaView';
import DeltaPartner from './Components/DeltaPartner/DeltaPartner';
import ContactUs from './Components/ContactUs/ContactUs';
import DashBoard2 from  './Components/DashBoard/DashBoard2';
import ChapterPage2 from './Components/Chapter/ChapterPage2';

const App = () => {
  // Get the current location
  const location = useLocation();

  // Check if the current location is /login or /sign-up
  const hideNavbar = location.pathname === '/login' || location.pathname === '/sign-up' || location.pathname === '/select-board' || location.pathname === '/select-language' || location.pathname === '/select-class' || location.pathname === '/select-stream' || location.pathname === '/dashboard' || location.pathname.startsWith('/chapter');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/select-board' element={<SelectBoard />} />
        <Route path='/select-language' element={<SelectLanguage />} />
        <Route path='/select-class' element={<SelectClass />} />
        <Route path='/select-stream' element={<SelectStream />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/Delta-view-app' element={<DeltaView />} />
        <Route path='/Delta-Partner' element={<DeltaPartner />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/dashboard' element={<DashBoard2 />} />
        <Route  path="/chapter/:subjectId" element={<ChapterPage2Wrapper />} />
      </Routes>
    </>
  );
};

const ChapterPage2Wrapper = () => {
  const { subjectId } = useParams();
  return <ChapterPage2 selectedSubjectId={subjectId}  />;
};

export default App;
