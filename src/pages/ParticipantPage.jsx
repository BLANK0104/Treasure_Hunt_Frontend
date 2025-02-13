import { Link } from "react-router-dom";

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
