import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articles from './components/Articles';
import Birthdays from './components/Birthdays';

function App() {
  return (
    <Router> 
      <div className="App">
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
