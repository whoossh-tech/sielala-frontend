import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../../App.css';
import '../../static/css/RewardInventory.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/bg-cover.png';
import { useState, useEffect, useHistory} from "react";
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import {toast, Toaster} from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const RewardInventory = () => {
    const navigate = useNavigate();

    const [rewardData, setRewardData] = useState([]);
    const [countdays, setCountDays] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const dayRangeCount = Array.from({ length: countdays });
    const [day, setDay] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mendapatkan tanggal saat ini
    const currentDate = new Date();
    
    // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
    const eventStartDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.startDate);
    const eventEndDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.endDate);

    const formattedStartDate = new Date(eventStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedEndDate = new Date(eventEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });


    const disableCarryOutStockButton = !selectedEvent || currentDate < eventStartDate || currentDate > eventEndDate || currentDate === eventEndDate;

    const disableAddRewardButton = !selectedEvent

    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Pre-filled dropdown event
        const storedEvent = localStorage.getItem('idSelectedEvent');
        if (storedEvent) {
            setSelectedEvent(storedEvent);
            localStorage.removeItem('idSelectedEvent'); 
        }

        if (selectedEvent) {
            axios.get(`https://sielala-backend-production.up.railway.app/api/reward/view-all/${selectedEvent}`)
            .then(res => {
                setRewardData(res.data.data)
                setCountDays(res.data.dayRange)
                setDay(res.data.newDay);
            }).catch(err => 
                console.log(err)
                
                )
        }

        axios.get('https://sielala-backend-production.up.railway.app/api/reward/view-event-all')
            .then(res => {
                setEventData(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )
    }, [selectedEvent])


    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    function carryOutStock() {
        closeModal();

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (selectedEvent) {
            axios.post(`https://sielala-backend-production.up.railway.app/api/reward/carry-out-stock/${selectedEvent}`)
            .then(res => {
                setRewardData(res.data.data)
                setCountDays(res.data.dayRange)
                setDay(res.data.newDay);
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
                            <p className="subtitle">Manage and view reward's data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <br></br>

            {/* <div>
                <p><b>Select Event First to Manage Reward</b></p>
            </div> */}

            {(!selectedEvent) && (
                <div className="text-center text-red-500 font-bold mb-4">
                    Event is not selected, please select event on the dropdown.
                </div>
            )}

            {/* <br></br> */}

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '300px', margin: '0 auto' }}>
                <div style={{ position: 'relative' }}>
                    <select 
                        className="appearance-none px-4 py-3 w-full focus:outline-none" 
                        onChange={handleChange}
                        value={selectedEvent}
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            borderRadius: '0.375rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            padding: '0.5rem 1rem',
                            width: '300px',
                        }}
                    >
                        <option>select event</option>
                        {eventData && eventData.length > 0 ? 
                            (eventData.map((event, index) => (
                                <option key={index} value={event.idEvent}>{event.eventName}: {event.startDate}</option>
                            ))) : (
                                <option value="">No events available</option>
                            )
                        }
                    </select>
                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            width="24" 
                            height="24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="feather feather-chevron-down"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
            
            <br></br>

            {(selectedEvent && eventData.length > 0) && (
                <div style={{marginBottom: '10px'}}>
                    <p><b>Current Inventory Day Status:</b></p>
                    <p style={{color: '#7D512D'}}><b>Day {day}</b></p>
                </div>
            )}

            {/* <div className="detail-reward">
                    <div className="each-reward">
                            <p className="reward-text-title">Current Inventory Day Status:</p>
                            <p className="reward-text">Day {day}</p>
                    </div>
                </div> */}

            {(selectedEvent && eventData.length > 0) && (
                
                <div className="detail-inventory">
                    {/* <div className="each-reward">
                            <p className="reward-text-title">Event:</p>
                            <p className="reward-text">{eventData.find(event => event.idEvent === selectedEvent)?.eventName}</p>
                    </div> */}
                    <div className="each-inventory">
                            <p className="inventory-text-title">Start Date of Event:</p>
                            <p className="inventory-text">{formattedStartDate}</p>
                    </div>
                    <div className="each-inventory">
                            <p className="inventory-text-title">End Date of Event:</p>
                            <p className="inventory-text">{formattedEndDate}</p>
                    </div>
                </div>
            )}
            
            <div className="button-field">
                
                <button className="button-pink" onClick={handleAddRewardButton} disabled={disableAddRewardButton}>+ Add Reward</button>
                <button className="button-green" onClick={carryOutStockModal} disabled={disableCarryOutStockButton}>Carry Out Stock</button>

            </div>

            <div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    id="modal-confirmation"
                    
                >
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Carry Out Stock</h2>
                    <p className="text-center text-gray-700">Are you sure you want to move remaining stock from DAY {day} of event to DAY {day + 1} of event?</p>
                    <br></br>
                    <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                    <button className="button-green text-center" onClick={carryOutStock}>Confirm</button>
                </Modal>
            </div>


            

            {(selectedEvent && eventData.length > 0) && (
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            {/* Row headers */}
                            <tr>
                                <th style={{borderRight: '1px solid #E3E2E6'}}colSpan="3"> </th>
                                {dayRangeCount.map((day, index) => (
                                    <React.Fragment key={index}>
                                        <th style={{borderRight: '1px solid #E3E2E6'}} colSpan="3">Day {index + 1}</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <thead>
                            {/* Column headers */}
                            <tr>
                                <th>Reward</th>
                                <th>Brand</th>
                                <th style={{borderRight: '1px solid #E3E2E6'}}>Category</th>
                                {dayRangeCount.map((day, index) => (
                                    <React.Fragment key={index}>
                                        <th>Initial</th>
                                        <th>Redeemed</th>
                                        <th style={{borderRight: '1px solid #E3E2E6'}}>Remaining</th>
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
                                        <td style={{borderRight: '1px solid #E3E2E6'}}>CAT {reward.category}</td>
                                        {reward.listDayReward.map((dayReward, j) => (
                                            <React.Fragment key={j}>
                                                <td>{dayReward.stokAwal}</td>
                                                <td>{dayReward.stokRedeemed}</td>
                                                <td style={{borderRight: '1px solid #E3E2E6'}}>{dayReward.stokSisa}</td>
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
            )}
            <br></br>
        </div>
        
    );
}
 
export default RewardInventory;