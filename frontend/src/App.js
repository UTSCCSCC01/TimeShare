import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CreateUser } from './pages/CreateUser';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createUser" element={<CreateUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
