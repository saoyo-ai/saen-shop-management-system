import { Link } from "react-router-dom";

import uniformsImage from "../assets/images/uniforms.jpg";
import bookshopImage from "../assets/images/bookshop.jpg";
import sodasImage from "../assets/images/sodas.jpg";
import recordsImage from "../assets/images/records.jpg";

function Dashboard() {
  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>
        SAEN LEDUPOTO SHOP MANAGEMENT SYSTEM
      </h1>

      <div style={gridStyle}>
        <Link to="/uniforms" style={linkStyle}>
          <div style={cardStyle}>
            <img
              src={uniformsImage}
              alt="School Uniforms"
              style={imageStyle}
            />

            <h2>School Uniforms</h2>
          </div>
        </Link>

        <Link to="/bookshop" style={linkStyle}>
          <div style={cardStyle}>
            <img
              src={bookshopImage}
              alt="Bookshop"
              style={imageStyle}
            />

            <h2>Bookshop</h2>
          </div>
        </Link>

        <Link to="/sodas" style={linkStyle}>
          <div style={cardStyle}>
            <img
              src={sodasImage}
              alt="Sodas"
              style={imageStyle}
            />

            <h2>Sodas</h2>
          </div>
        </Link>

        <Link to="/records" style={linkStyle}>
          <div style={cardStyle}>
            <img
              src={recordsImage}
              alt="Records"
              style={imageStyle}
            />

            <h2>Records</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

const pageStyle = {
  padding: "30px",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "38px",
  color: "#1e293b",
  fontWeight: "bold",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  textAlign: "center",
  paddingBottom: "20px",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export default Dashboard;