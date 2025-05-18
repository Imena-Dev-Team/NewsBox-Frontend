
import React from "react";
import LandingPage from "./components/Home";
import NewsletterFooter from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footer" element={<NewsletterFooter />} />
      </Routes>
    </Router>
  );
}

export default App;
