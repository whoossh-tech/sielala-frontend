import React from 'react';
import { useState, useEffect} from "react";
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';

const RewardInventory = () => {

    const [rewardData, setRewardData] = useState([]);
    const [countdays, setCountDays] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const dayRangeCount = Array.from({ length: countdays });
    // const header1 = 3 + (countdays*3)
    // const header2 = 1 + countdays

   useEffect(() => {

    if (selectedEvent) {
        axios.get(`http://localhost:8080/api/reward/view-all/${selectedEvent}`)
        .then(res => {
            setRewardData(res.data.data)
            setCountDays(res.data.dayRange)
        }).catch(err => 
            console.log(err)
            
            )
    }

    axios.get('http://localhost:8080/api/reward/view-event-all')
        .then(res => {
            setEventData(res.data.data)
        })
   }, [selectedEvent])


    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    function carryOutStock() {
        if (selectedEvent) {
            axios.post(`http://localhost:8080/api/reward/carry-out-stock/${selectedEvent}`)
            .then(res => {
                setRewardData(res.data.data)
                setCountDays(res.data.dayRange)
                toast.success("Reward Carry Out Successfully")
            }).catch(function(error) {
                if (error.response.status === 400) {
                    console.log(error)
                    toast.error("Cannot Carry out because this is the last day of event")
                } else if (error.response.status === 404) {
                    console.log(error)
                    toast.error("Cannot Carry out. Reward Inventory is still empty.")
                }
            })
        }
    }

    const sortedRewardData = rewardData.map(reward => {
        const sortedListDayReward = reward.listDayReward.sort((a, b) => a.day - b.day);
        return { ...reward, listDayReward: sortedListDayReward };
    });


    return (  
        <div className="RewardInventory">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h2>Reward Inventory</h2>
            <select name="filter-event" onChange={handleChange}>
                <option>select event</option>
                {eventData && eventData.length > 0 ? 
                (eventData.map((event, index) => (
                        <option key={index} value={event.idEvent}>{event.eventName}</option>
                    ))
                ) : (
                    <option value="">No events available</option>
                )}
            </select>

            <div className="button-field">
                <button className="button-pink">+ Add Reward</button>
                <button className="button-green" onClick={carryOutStock}>Carry Out Stock</button>
            </div>

            <table>
                <thead>
                    {/* Row headers */}
                    <tr>
                        <th colSpan="3"> </th>
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
                        <th>Reward</th>
                        <th>Brand</th>
                        <th>Category</th>
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
                    {sortedRewardData && sortedRewardData.length > 0 ? (
                        sortedRewardData.map((reward, i) => (
                            <tr key={i}>
                                <td>{reward.productName}</td>
                                <td>{reward.brandName}</td>
                                <td>{reward.category}</td>
                                {reward.listDayReward.map((dayReward, j) => (
                                    <React.Fragment key={j}>
                                        <td>{dayReward.stokAwal}</td>
                                        <td>{dayReward.stokRedeemed}</td>
                                        <td>{dayReward.stokSisa}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3 + dayRangeCount.length * 3}>No rewards available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
 
export default RewardInventory;