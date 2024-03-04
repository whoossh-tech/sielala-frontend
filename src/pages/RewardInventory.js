import React from 'react';
import { useState, useEffect} from "react";
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';

const RewardInventory = () => {

    const [rewardData, setRewardData] = useState([]);

   useEffect(() => {
    axios.get('http://localhost:8080/api/reward/view-all')
    .then(res => {
        setRewardData(res.data.data)
    })
   }, [])


    return (  
        <div className="RewardInventory">
            <h2>Reward Inventory</h2>
            <div className="button-field">
                <button className="button-pink">+ Add Reward</button>
                <button className="button-green">Carry Out Stock</button>
            </div>
            <table >
                <tr>
                    <th>Product Name</th>
                    <th>Brand Name</th>
                    <th>Category</th>
                </tr>
                {rewardData.map((reward, i) => (
                    <tr key={i}>
                        <td>{reward.productName}</td>
                        <td>{reward.brandName}</td>
                        <td>{reward.category}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
 
export default RewardInventory;