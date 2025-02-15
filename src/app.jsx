import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import AdminPage from './pages/admin/Admin';
import ParticipantPage from './pages/participant/Participant.jsx';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/participant" element={<ParticipantPage />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;