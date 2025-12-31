import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

/* Protected Route */
export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
