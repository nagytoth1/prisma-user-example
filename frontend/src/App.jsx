import AdminPage from "./pages/AdminPage.jsx";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { ROUTES } from "./routes.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
const BACKEND_PORT = import.meta.env.VITE_BACKEND_URL || 3000;
const BACKEND_URL = `http://${location.hostname}:${BACKEND_PORT}`;
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* wrap the whole application around AuthProvider */}
        <AuthProvider backend={BACKEND_URL}>
          <Navbar />
          <Routes>
            {/* define which page should reload on /login */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            {/* redirection from root to login */}
            <Route
              exact
              path={ROUTES.HOME}
              element={<Navigate to={ROUTES.ADMIN} />}
            />
            <Route
              path={ROUTES.ADMIN}
              element={<AdminPage backend={BACKEND_URL} />}
            />
            <Route path="*" element={<NotFoundPage />} />
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
