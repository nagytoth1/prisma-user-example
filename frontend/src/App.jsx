import AdminPage from "./pages/AdminPage.jsx";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginGuard from "./components/LoginGuard.jsx";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { ROUTES } from "./routes.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "localhost:3000";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* wrap the whole application around AuthProvider */}
        <AuthProvider BACKEND_URL={BACKEND_URL}>
          <Routes>
            {/* define which page should reload on /login */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            {/* redirection from root to login */}
            <Route exact path="/" element={<Navigate to={ROUTES.LOGIN} />} />
            <Route element={<LoginGuard />}>
              {/* user manager route protected by*/}
              <Route
                path={ROUTES.ADMIN}
                element={<AdminPage BACKEND_URL={BACKEND_URL} />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
