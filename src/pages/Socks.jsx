import { Link } from "react-router-dom";

function Socks() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Socks Categories</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/girls-socks" style={linkStyle}>
          <div style={cardStyle}>Girls Socks</div>
        </Link>

        <Link to="/boys-socks" style={linkStyle}>
          <div style={cardStyle}>Boys Socks</div>
        </Link>

        <Link to="/sports-socks" style={linkStyle}>
          <div style={cardStyle}>Sports Socks</div>
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
};

const linkStyle = {
  textDecoration: "none",
};

export default Socks;