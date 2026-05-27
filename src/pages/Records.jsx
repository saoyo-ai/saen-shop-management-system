import { Link } from "react-router-dom";

function Records() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Records</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/daily-records">
          <button>Daily Records</button>
        </Link>

        <Link to="/record-history">
          <button>Record History</button>
        </Link>
      </div>
    </div>
  );
}

export default Records;