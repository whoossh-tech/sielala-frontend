import React from 'react';
import { useState, useEffect} from "react";
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';

const RewardInventory = () => {

    const [rewardData, setRewardData] = useState([]);
    const [countdays, setCountDays] = useState(0);
    // const [dayData, setDayData] = useState([]);
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
        })
    }

    axios.get('http://localhost:8080/api/reward/view-event-all')
        .then(res => {
            setEventData(res.data.data)
        })

   }, [selectedEvent])


    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    return (  
        <div className="RewardInventory">
            <h2>Reward Inventory</h2>
            <select name="filter-event" onChange={handleChange}>
                {eventData.map((event, index) => (
                    <option key={index} value={event.idEvent}>{event.eventName}</option>
                ))}
            </select>


            <div className="button-field">
                <button className="button-pink">+ Add Reward</button>
                <button className="button-green">Carry Out Stock</button>
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
                    {rewardData.map((reward, i) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default RewardInventory;