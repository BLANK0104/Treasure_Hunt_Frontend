import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <h1>This is Admin Page</h1>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default AdminPage;
