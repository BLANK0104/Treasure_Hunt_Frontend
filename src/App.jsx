import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./pages/ParticipantPage";
import AdminPage from "./pages/AdminPage";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/ParticipantPage">
          <button>Go to Participant Page</button>
        </Link>
        <Link to="/AdminPage">
          <button>Go to Admin Page</button>
        </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ParticipantPage" element={<ParticipantPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
