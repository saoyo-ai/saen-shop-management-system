import { Link } from "react-router-dom";

function Bookshop() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bookshop Categories</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/exercise-books" style={linkStyle}>
          <div style={cardStyle}>Exercise Books</div>
        </Link>

        <Link to="/setbooks" style={linkStyle}>
          <div style={cardStyle}>Setbooks</div>
        </Link>

        <Link to="/textbooks" style={linkStyle}>
          <div style={cardStyle}>Textbooks</div>
        </Link>

        <Link to="/junior-books" style={linkStyle}>
          <div style={cardStyle}>
            Junior & Lower Primary Books
          </div>
        </Link>

        <Link to="/other-stationaries" style={linkStyle}>
          <div style={cardStyle}>Other Stationaries</div>
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

export default Bookshop;