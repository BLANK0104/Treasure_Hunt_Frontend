import { Link } from "react-router-dom";

{/* BUILD REST OF THE PARTICIPANT PAGE HERE */}
function ParticipantPage() {
  return (
    <div>
      <h1>This is Participant page</h1>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default ParticipantPage;
