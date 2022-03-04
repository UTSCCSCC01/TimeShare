import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { LogIn } from './pages/LogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </Router>
  );
}

export default App;
