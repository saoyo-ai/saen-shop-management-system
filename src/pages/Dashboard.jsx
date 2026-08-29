import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <button
        onClick={() => navigate("/record-history")}
        style={{
          padding: "20px 40px",
          fontSize: "24px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        📒 Records
      </button>
    </div>
  );
}