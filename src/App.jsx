import React from "react";
import NewsletterFooter from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Duplicates from "./pages/Blogs/All";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Birthdays from "./pages/Birthdays";
import Members from "./pages/Members";
import Header from "./components/Header";
import SignUp from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import FamilyReunion from "./pages/Blogs/ReunionBlog";
import Landing from "./pages/Landing";
import About from "./pages/About";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import PaginatedShowcase from "./pages/Story";
import Resources from "./pages/Resources";

// ✅ Protects routes for authenticated users
function PrivateRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null; // Wait for auth state

  // If not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not a member
  if (user?.userType !== "member") {
    return <Navigate to="/home" replace />;
  }

  // ✅ Otherwise, show the page
  return children;
}

// ✅ Checks profile completion for signup
function RequireProfileCompletion({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Must be a member (guests can't create profiles)
  if (user?.userType !== "member") {
    return <Navigate to="/home" replace />;
  }

  // If already has profile, redirect to home
  if (user?.hasProfile || user?.profileData) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const path = (location.pathname || "").toLowerCase();
  const hideHeader = path === "/" || path === "/login" || path === "/signup";
  const hideFooter = path === "/" || path === "/login" || path === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/union" element={<FamilyReunion />} />
          <Route
            path="/signup"
            element={
              <RequireProfileCompletion>
                <SignUp />
              </RequireProfileCompletion>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/all" element={<Duplicates />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />

          {/* ✅ Protect the story page */}
          <Route
            path="/story"
            element={
              <PrivateRoute>
                <PaginatedShowcase />
              </PrivateRoute>
            }
          />

          <Route
            path="/birthdays"
            element={
              <RequireAuth>
                <Birthdays />
              </RequireAuth>
            }
          />

          <Route
            path="/members"
            element={
              <RequireAuth>
                <Members />
              </RequireAuth>
            }
          />

          {/* Blog detail routes */}
          <Route path="/union/:slug" element={<FamilyReunion />} />

          {/* Catch-all: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideFooter && <NewsletterFooter />}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
