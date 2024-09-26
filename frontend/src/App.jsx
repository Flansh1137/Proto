
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Homepage from './components/homepage/homepage';
import CounselorLogin from './components/Login/CounselorLogin/CounselorLogin';
import NewRegistrationForm from './components/Login/CounselorLogin/newRegistration';
import MainProgram from './components/Login/CounselorLogin/mainProgram';
import DataAnalysis from './components/Login/CounselorLogin/dataAnalysis';
import ErrorBoundary from './components/ErrorBoundary';
import ViewData from './components/Login/CounselorLogin/ViewData';
import LoginPage from './components/Login/LoginPage';
import Cloud from './components/Login/AdminLogin/cloud';
import Rtsp from './components/Login/AdminLogin/rtsp';
// import LoginSelection from './components/Login/LoginSelection';
import CombinedBarChart from './components/Login/CounselorLogin/BarChart';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Counselor-Login" element={<CounselorLogin />} />
          <Route path="/new-registration" element={<NewRegistrationForm />} />
          <Route path="/main-program" element={<MainProgram />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/view-data" element={<ViewData />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path='/login-selection' element={<LoginSelection />} /> */}
          <Route path='/rtsp' element={<Rtsp />} />
          <Route path='/cloud' element={<Cloud />} />
          <Route path='/CombinedBarChart' element={<CombinedBarChart />} />

        </Routes>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
