import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardInventory from './pages/RewardInventory';
import FormRewardInventory from './pages/FormRewardInventory';
import EditRewardInventory from './pages/EditRewardInventory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/reward-inventory" element={<RewardInventory />}></Route>
            <Route path="/add-reward/:idEvent" element={<FormRewardInventory />}></Route>
            <Route path="/edit-reward/:idReward" element={<EditRewardInventory />}></Route>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
