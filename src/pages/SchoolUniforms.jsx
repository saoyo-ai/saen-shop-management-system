import { useNavigate } from "react-router-dom";

export default function SchoolUniforms() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>School Uniforms</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => navigate("/sweaters")}>
          Sweaters
        </button>

        <button onClick={() => navigate("/ties")}>
          Ties
        </button>

        <button onClick={() => navigate("/shirts")}>
          Shirts
        </button>

        <button onClick={() => navigate("/trousers")}>
          Trousers
        </button>

        <button onClick={() => navigate("/skirts")}>
          Skirts
        </button>

        <button onClick={() => navigate("/socks")}>
          Socks
        </button>

        <button onClick={() => navigate("/tracksuits")}>
          Tracksuits
        </button>
      </div>
    </div>
  );
}