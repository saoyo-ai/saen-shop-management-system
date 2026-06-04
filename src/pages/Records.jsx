import { useNavigate } from "react-router-dom";

export default function Records() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Records System</h1>

      <div style={{ display: "grid", gap: "10px", maxWidth: "300px" }}>
        <button onClick={() => navigate("/daily-records")}>
          Daily Records
        </button>

        <button onClick={() => navigate("/record-history")}>
          Records History
        </button>
      </div>
    </div>
  );
}