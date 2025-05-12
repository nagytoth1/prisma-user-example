import AdminPage from "./pages/AdminPage.jsx";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { ROUTES } from "./routes.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* wrap the whole application around AuthProvider */}
        <AuthProvider>
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
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
