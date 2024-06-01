import React from 'react'; // Import React explicitly for clarity
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Loader from './scenes/loader/Loader'; // Assuming Loader.scss and Loader.js exist
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppInterface from './scenes/App/AppInteface';


function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<AppInterface />} />
          {/* Add more routes as needed for different components/pages */}
        </Routes>
      </div>
  );
}

export default App;
