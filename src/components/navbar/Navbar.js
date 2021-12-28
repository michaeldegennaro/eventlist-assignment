import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const handleSignOut = () => {
    localStorage.clear();
  };
  return (
    <div className="nav-container">
      <h2>Event List</h2>
      <ul className="list">
        {!window.localStorage.getItem("user") && (
          <>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Signup
              </Link>
            </li>
          </>
        )}
        {window.localStorage.getItem("user") && (
          <li onClick={handleSignOut}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
