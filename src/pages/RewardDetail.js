import React from 'react';
import { useState, useEffect} from "react";
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';
import { useParams, Link } from "react-router-dom";

const RewardDetail = () => {

    const { id } = useParams();

    const [rewardData, setRewardData] = useState();
    const [countdays, setCountDays] = useState(0);
    const dayRangeCount = Array.from({ length: countdays });

   useEffect(() => {

    axios.get(`http://localhost:8080/api/reward/detail/${id}`)
    .then(res => {
        setRewardData(res.data.data)
        setCountDays(res.data.dayRange)
    }).catch(err => 
        console.log(err))
   })


    return (  
        <div className="RewardInventory">

            <div class="text-center pt-3">
                <h2>Reward Detail</h2>
            </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

            {rewardData ? (
                <>

            <div className="mb-3">
                <strong>Reward</strong> : <span>{rewardData.productName}</span>
            </div>

            <br></br>

            <div className="mb-3">
                <strong>Brand</strong> : <span>{rewardData.brandName}</span>
            </div>

            <br></br>

            <div className="mb-3">
                <strong>Category</strong> : <span> CAT {rewardData.category}</span>
            </div>

            <br></br>

            <div className="mb-3">
                <strong>Event</strong> : <span>{rewardData.event.eventName}</span>
            </div>          

            <br></br>

                <table>
                    <thead>
                        {/* Row headers */}
                        <tr>
                            {dayRangeCount.map((day, index) => (
                                <React.Fragment key={index}>
                                    <th colSpan="3">Day {index + 1}</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <thead>
                        {/* Column headers */}
                        <tr>
                            {dayRangeCount.map((day, index) => (
                                <React.Fragment key={index}>
                                    <th>Initial</th>
                                    <th>Redeemed</th>
                                    <th>Remaining</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {rewardData.listDayReward.map((dayReward, j) => (
                                <React.Fragment key={j}>
                                    <td>{dayReward.stokAwal}</td>
                                    <td>{dayReward.stokRedeemed}</td>
                                    <td>{dayReward.stokSisa}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    </tbody>
                </table>
    
                <div className="button-field">
                    <button className="button-pink">Edit Reward</button>
                    <button className="button-green">Delete Reward</button>
                </div>
            </>
                ) : (
                    <p>Loading...</p>
                )}

        </div>
    );
}
 
export default RewardDetail;