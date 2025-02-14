import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiHome, FiUsers, FiHelpCircle, FiMenu, FiX } from "react-icons/fi";
import Teams from "./Teams"; // Import Teams component

function AdminPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen h-[100dvh] w-full bg-[#0D0D0D] text-white overflow-x-hidden overflow-y-auto justify-center items-center">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 h-full w-56 bg-gray-900 p-4 flex flex-col shadow-xl transition-transform transform z-50 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative flex-shrink-0`}
      >
        <button className="absolute top-3 right-3 md:hidden text-gray-300 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <FiX size={22} />
        </button>

        <h2 className="text-xl font-extrabold text-purple-400 mb-4 tracking-wide text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3 flex-grow">
          <Link to="/admin" className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-500 transition-all">
            <FiHome className="text-blue-400" size={20} /> <span className="text-base">Dashboard</span>
          </Link>
          <Link to="/admin/teams" className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-500 transition-all">
            <FiUsers className="text-purple-400" size={20} /> <span className="text-base">Teams</span>
          </Link>
          <Link to="/admin/questions" className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-500 transition-all">
            <FiHelpCircle className="text-blue-400" size={20} /> <span className="text-base">Questions</span>
          </Link>
        </nav>

        <div className="pb-4">
          <Link to="/">
            <button className="w-full px-4 py-2 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:scale-105 transition-all">
              Log Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-grow h-full w-full min-w-0 md:overflow-auto overflow-hidden justify-center items-center">
        <header className="w-full bg-gradient-to-r from-purple-600 to-blue-500 p-3 flex items-center justify-between md:justify-center shadow-md relative md:static">
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={22} />
          </button>
          <span className="text-sm md:text-base font-medium text-white text-center w-full">
            Admin Dashboard | Manage Everything Efficiently
          </span>
        </header>

        <div className="flex flex-grow w-full max-w-full md:max-w-[900px] mx-auto items-center justify-center text-center p-3 md:overflow-y-auto overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
