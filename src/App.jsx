import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./pages/ParticipantPage";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Questions from "./pages/Questions";

function Home() {
  return (
    <>
    {/* INTEGRATE THE LOGIN PAGE HERE, AND USE THESE 2 BUTTONS TO REDIRECT TO ADMIN AND PARTICIPANT AFTER LOGIN */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/participant">
          <button>Go to Participant Page</button>
        </Link>
        <Link to="/admin">
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
        <Route path="/participant" element={<ParticipantPage />} />

        {/* Admin Panel with Nested Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />
          <Route path="questions" element={<Questions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
