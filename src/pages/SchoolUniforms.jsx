import { Link } from "react-router-dom";

function SchoolUniforms() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>School Uniforms</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/sweaters" style={linkStyle}>
          <div style={cardStyle}>Sweaters</div>
        </Link>

        <Link to="/trousers" style={linkStyle}>
          <div style={cardStyle}>Trousers</div>
        </Link>

        <Link to="/shirts" style={linkStyle}>
          <div style={cardStyle}>Shirts</div>
        </Link>

        <Link to="/skirts" style={linkStyle}>
          <div style={cardStyle}>Skirts</div>
        </Link>

        <Link to="/ties" style={linkStyle}>
          <div style={cardStyle}>Ties</div>
        </Link>

        <Link to="/tracksuits" style={linkStyle}>
          <div style={cardStyle}>Track Suits</div>
        </Link>

        <Link to="/socks" style={linkStyle}>
          <div style={cardStyle}>Socks</div>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  color: "black",
  cursor: "pointer",
};

const linkStyle = {
  textDecoration: "none",
};

export default SchoolUniforms;