import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import backgroundPhoto from '../assets/bg-cover.png';
import { useState, useEffect, useHistory} from "react";
import { NavbarOperation } from '../components/navbar/NavbarOperation';
import {toast, Toaster} from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const RewardInventory = () => {
    const navigate = useNavigate();

    const [rewardData, setRewardData] = useState([]);
    const [countdays, setCountDays] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const dayRangeCount = Array.from({ length: countdays });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        closeModal();

        if (selectedEvent) {
            axios.post(`http://localhost:8080/api/reward/carry-out-stock/${selectedEvent}`)
            .then(res => {
                setRewardData(res.data.data)
                setCountDays(res.data.dayRange)
                toast.success("Reward Carry Out Successfully")
            }).catch(function(error) {
                if (error.response.status === 400) {
                    console.log(error)
                    toast.error("Cannot carry out stock because this is the last day of event")
                } else if (error.response.status === 404) {
                    console.log(error)
                    toast.error("Cannot carry out stock. Reward Inventory is still empty.")
                }
            })
        } 
    }

    function carryOutStockModal() {
        if (selectedEvent){
            openModal();
        } else {
            toast.error('Please select event first');
        }
    }

    const sortedRewardData = rewardData.map(reward => {
        const sortedListDayReward = reward.listDayReward.sort((a, b) => a.day - b.day);
        return { ...reward, listDayReward: sortedListDayReward };
    });

    const handleAddRewardButton = () => {
        if (selectedEvent) {
          navigate(`/add-reward/${selectedEvent}`);
        } else {
          toast.error('Please select event first');
        }
      };


    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarOperation style={{ zIndex: 999 }}/>

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Reward Inventory</h1>
                    <div>
                            <p className="subtitle">Manage and view reward’s data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <br></br>

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '200px', margin: '0 auto' }}>
                <select 
                    className="appearance-none px-4 py-3 w-full focus:outline-none" 
                    onChange={handleChange}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#333333',
                        borderRadius: '0.375rem',
                        border: '1px solid #E3E2E6',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        padding: '0.5rem 1rem',
                        width: '200px',
                        alignItems: 'center', justifyContent : 'center'
                    }}
                >
                    <option>select event</option>
                    {eventData && eventData.length > 0 ? 
                        (eventData.map((event, index) => (
                            <option key={index} value={event.idEvent}>{event.eventName}</option>
                        ))) : (
                            <option value="">No events available</option>
                        )
                    }
                </select>
            </div>
            
            <br></br>


            <div className="button-field">
                
                <button className="button-pink" onClick={handleAddRewardButton}>+ Add Reward</button>
                <button className="button-green" onClick={carryOutStockModal}>Carry Out Stock</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-confirmation"
                
            >
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Carry Out Stock</h2>
                <p className="text-center text-gray-700">Are you sure you want to move remaining stock to the next day of event?</p>
                <br></br>
                <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                <button className="button-green text-center" onClick={carryOutStock}>Confirm</button>
            </Modal>

            </div>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
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
                                    <td>
                                        <Link to={`/reward-inventory/detail/${reward.idProduct}`} style={{ color: '#A9B245', fontWeight: 'bold'}}>{reward.productName}</Link>
                                        {/* <a href={`/reward-inventory/detail/${reward.idProduct}`} style={{ color: '#A9B245', fontWeight: 'bold'}}>{reward.productName}</a> */}
                                    </td>
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
            <br></br>
        </div>
    );
}
 
export default RewardInventory;