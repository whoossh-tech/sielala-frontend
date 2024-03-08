import React from 'react';
import { useState, useEffect} from "react";
import '../App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';
import { useParams, Link, useNavigate} from "react-router-dom";
import backgroundPhoto from '../assets/bg-cover.png';

const RewardDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate(); 

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


    const handleBack = () => {
        navigate(-1); // Redirect back to the previous page
    };

    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '120px' }}>
                <div className="text-wrapper">
                    <h1 className="title">Reward Detail</h1>
                    <div className="subtitle-wrapper">
                        <p className="subtitle">Manage and view reward’s data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

            <br></br>

            {rewardData ? (
                <>

            <br></br>

            <div className="detail-reward">
                <div className="each-reward">
                        <p className="reward-text-title">Reward:</p>
                        <p className="reward-text">{rewardData.productName}</p>
                </div>
                <div className="each-reward">
                        <p className="reward-text-title">Brand:</p>
                        <p className="reward-text">{rewardData.brandName}</p>
                </div>
                <div className="each-reward">
                        <p className="reward-text-title">Category:</p>
                        <p className="reward-text">{rewardData.category}</p>
                </div>
                <div className="each-reward">
                        <p className="reward-text-title">Event:</p>
                        <p className="reward-text">{rewardData.event.eventName}</p>
                </div>
            </div>

            <br></br>
            <br></br>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div>
                
    
            <br></br>

            <div className="button-field">
                <button className="button-green" onClick={handleBack}>Back</button>
                <button className="button-pink">Edit Reward</button>
                <button className="button-red">Delete Reward</button>
            </div>
            </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}
 
export default RewardDetail;