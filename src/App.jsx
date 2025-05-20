
import React from "react";
import LandingPage from "./components/Home";
import NewsletterFooter from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Duplicates from "./components/All";
import Gallery from "./Gallery";
import { LogIn } from "lucide-react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footer" element={<NewsletterFooter />} />
           <Route path="/all" element={< Duplicates />} />
           <Route path="/gallery" element={ <Gallery/>} />
           <Route path="/login" element={ <LogIn/>}/>
           <Route path="/signup" element={ <signUp/>}/>

           
      </Routes>
    </Router>
  );
}

export default App;
