import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CreateTimetable } from './pages/CreateTimetable';
import { App2 } from './pages/CreateTimetable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createTimetable" element={<App2/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
