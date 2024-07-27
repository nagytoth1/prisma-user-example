import { ROUTES } from "../routes";
import { useAuth } from "../hooks/AuthProvider";
export default function Navbar() {
  const auth = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light mb-3">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href={ROUTES.HOME}>
                Home<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <button
                className="btn bg-transparent text-danger"
                onClick={() => auth.logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
