import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/effects/CustomCursor';
import PageTransition from './components/effects/PageTransition';
import OpeningLoader from './components/effects/OpeningLoader';

import AIWing from './pages/wings/AIWing';
import DevelopmentWing from './pages/wings/DevelopmentWing';
import DsaWing from './pages/wings/DSAWing';
import RoboticsWing from './pages/wings/RoboticsWing';
import GraphicsWing from './pages/wings/GraphicsWing';

import WingPage from './pages/wings/WingPage';

import useSiteData from './hooks/useSiteData';
import useLenis from './hooks/useLenis';

import Home from './pages/general/Home';
import Wings from './pages/general/Wings';
import Resources from './pages/general/Resources';
import Gallery from './pages/general/Gallery';
import About from './pages/general/About';
import LoginChoice from './pages/general/LoginChoice';
import StudentAuth from './pages/student/StudentAuth';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Admin from './pages/admin/Admin';

function Shell() {
  const data = useSiteData();
  useLenis();

  return (
    <>    
      <CustomCursor />
      <PageTransition />
      <OpeningLoader />

      <Navbar wings={data.wings} />

      <main>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/wings" element={<Wings data={data} />} />
          <Route path="/resources" element={<Resources data={data} />} />
          <Route path="/gallery" element={<Gallery data={data} />} />
          <Route path="/about" element={<About data={data} />} />

          <Route path="/wings/aiml" element={<AIWing />} />
          <Route path="/wings/development" element={<DevelopmentWing />} />
          <Route path="/wings/dsa" element={<DsaWing />} />
          <Route path="/wings/robotics" element={<RoboticsWing />} />
          <Route path="/wings/graphics-design" element={<GraphicsWing />} />
          <Route path="/wings/:slug" element={<WingPage />} />

          <Route path="/login" element={<LoginChoice />} />
          <Route path="/student" element={<StudentAuth mode="login" />} />
          <Route path="/student/login" element={<StudentAuth mode="login" />} />
          <Route path="/student/register" element={<StudentAuth mode="register" />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin data={data} />} />
        </Routes>
      </main>

      <Footer data={data} />
    </>
  );
}

export default function App() {
  return <Shell />;
}