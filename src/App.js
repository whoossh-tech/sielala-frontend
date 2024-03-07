import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardInventory from './pages/RewardInventory';
import FormRewardInventory from './pages/FormRewardInventory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/reward-inventory" element={<RewardInventory />}></Route>
            <Route path="/add-reward-inventory/:idEvent" element={<FormRewardInventory />}></Route>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
