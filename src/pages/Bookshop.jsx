import { useNavigate } from "react-router-dom";

export default function Bookshop() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bookshop Categories</h1>

      <div style={{ display: "grid", gap: "10px", maxWidth: "350px" }}>
        <button
          onClick={() => navigate("/exercise-books")}
        >
          Exercise Books
        </button>

        <button
          onClick={() => navigate("/setbooks")}
        >
          Setbooks
        </button>

        <button
          onClick={() => navigate("/textbooks")}
        >
          Textbooks
        </button>

        <button
          onClick={() => navigate("/junior-books")}
        >
          Junior & Lower Primary Books
        </button>

        <button
          onClick={() => navigate("/stationeries")}
        >
          Other Stationeries
        </button>
      </div>
    </div>
  );
}