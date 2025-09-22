import React from "react";
import NewsletterFooter from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Duplicates from "./components/All";
import Gallery from "./Gallery";
import Head from "./components/Head";
import Articles from "./components/Articles";
import Birthdays from "./components/Birthdays";
import Header from "./components/Header";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import FamilyReunion from "./components/Singleb";
import Landing from "./components/landing";
import { AuthProvider, useAuth } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const path = (location.pathname || '').toLowerCase();
  const hideHeader = path === "/" || path === "/login" || path === "/signup";
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/union" element={<FamilyReunion />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Head />} />
        <Route path="/footer" element={<NewsletterFooter />} />
        <Route path="/all" element={<Duplicates />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/Birthdays"
          element={
            <RequireAuth>
              <Birthdays />
            </RequireAuth>
          }
        />
        <Route path="/Articles" element={<Articles />} />
        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
