import { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articles from './components/Articles';
import Birthdays from './components/Birthdays';

function App() {
  return (
    <Router> 
      <div className="max-w-7xl mx-auto px-8 py-8 text-center">
        <Header />
        <Routes>
          <Route path='/Birthdays' element={<Birthdays />} />
          <Route path="/Articles" element={<Articles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
