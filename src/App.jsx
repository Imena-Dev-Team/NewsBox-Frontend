import React from "react";
import LandingPage from "./components/Home";
import NewsletterFooter from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Duplicates from "./components/All";
import Gallery from "./Gallery";
import { LogIn } from "lucide-react";
import Head from "./components/Head";
import Articles from './components/Articles';
import Birthdays from './components/Birthdays';
import Header from "./components/Header";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/footer" element={<NewsletterFooter />} />
           <Route path="/all" element={< Duplicates />} />
           <Route path="/gallery" element={ <Gallery/>} />
           <Route path="/login" element={ <LogIn/>}/>
           <Route path="/signup" element={ <signUp/>}/>
            <Route path='/Birthdays' element={<Birthdays />} />
          <Route path="/Articles" element={<Articles />} />

           
      </Routes>
      <div className="min-h-screen bg-[#fafafa]">
        <Header />

        <Head />
      </div>
    </Router>
  )


}

export default App
