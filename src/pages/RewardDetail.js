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
    // const [eventData, setEventData] = useState([]);
    // const [selectedEvent, setSelectedEvent] = useState('');
    const dayRangeCount = Array.from({ length: countdays });
    // const header1 = 3 + (countdays*3)
    // const header2 = 1 + countdays

   useEffect(() => {

    axios.get(`http://localhost:8080/api/reward/detail/${id}`)
    .then(res => {
        setRewardData(res.data.data)
        setCountDays(res.data.dayRange)
    }).catch(err => 
        console.log(err))
   })


    // const handleChange = (e) => {
    //     setSelectedEvent(e.target.value);
    // };

    // function carryOutStock() {
    //     if (selectedEvent) {
    //         axios.post(`http://localhost:8080/api/reward/carry-out-stock/${selectedEvent}`)
    //         .then(res => {
    //             setRewardData(res.data.data)
    //             setCountDays(res.data.dayRange)
    //             toast.success("Reward Carry Out Successfully")
    //         }).catch(function(error) {
    //             if (error.response.status === 400) {
    //                 console.log(error)
    //                 toast.error("Cannot Carry out because this is the last day of event")
    //             } else if (error.response.status === 404) {
    //                 console.log(error)
    //                 toast.error("Cannot Carry out. Reward Inventory is still empty.")
    //             }
    //         })
    //     }
    // }

    // const sortedRewardData = rewardData.map(reward => {
    //     const sortedListDayReward = reward.listDayReward.sort((a, b) => a.day - b.day);
    //     return { ...reward, listDayReward: sortedListDayReward };
    // });


    return (  
        <div className="RewardInventory">
            <div className="mini-card col col-lg-5 reward-detail">
                    <h2>Reward Detail</h2>
            </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

            {rewardData ? (
                <>
                

                <div className="mini-card col col-lg-5 reward-detail">
                    <h2>Reward Detail</h2>
                </div>

                    <div className="mini-card col col-lg-5">
                        <h3 className="attribute">Reward Name:</h3>
                        <p>{rewardData.productName}</p>
                    </div>

                    <div className="col-md-auto"></div>
                    <div className="mini-card col col-lg-5">
                        <h3 className="attribute">Brand:</h3>
                        <p>{rewardData.brandName}</p>
                    </div>            
    

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