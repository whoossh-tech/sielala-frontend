import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardInventory from './pages/RewardInventory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/reward-inventory" element={<RewardInventory />}></Route>
            {/* <Route path="reward-inventory/detail/:id" element={<DetailReward/>}></Route> */}
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
