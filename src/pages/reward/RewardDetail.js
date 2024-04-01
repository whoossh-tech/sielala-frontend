import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useState, useEffect} from "react";
import {toast, Toaster} from 'react-hot-toast';
import { useParams, Link, useNavigate } from "react-router-dom";
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import '../../App.css';
import '../../static/css/RewardInventory.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/bg-cover.png';

const RewardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rewardData, setRewardData] = useState();
    const [countdays, setCountDays] = useState(0);
    const [idEvent, setIdEvent] = useState('');
    const dayRangeCount = Array.from({ length: countdays });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

   useEffect(() => {

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:8080/api/reward/detail/${id}`)
    .then(res => {
        setRewardData(res.data.rewardData)
        setCountDays(res.data.daysRange)
        setIdEvent(res.data.rewardData.event.idEvent)
    }).catch(err => 
        console.log(err))
    })

   const confirmDelete = async (e) => {
    closeModal();

    try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.delete(`http://localhost:8080/api/reward/delete/${id}`);

        // Untuk pre-filled dropdown event
        localStorage.setItem('idSelectedEvent', idEvent);
    
        console.log('Reward deleted successfully:', response.data);
        localStorage.setItem('idSelectedEvent', idEvent);
        navigate('/reward-inventory');

        await new Promise((resolve) => setTimeout(resolve, 500))
        toast.success("Reward deleted successfully");
    } catch (error) {
        console.error('Error:', error);
        toast.error("Cannot delete reward");
    }
};

    const handleBack = () => {
        localStorage.setItem('idSelectedEvent', idEvent);
        navigate(-1); // Redirect back to the previous page
    };

    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarOperation />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Reward Detail</h1>
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

            <div>
                {rewardData.redeemed ? (
                    <div className="button-field">
                        <button className="button-green" onClick={handleBack}>Back</button>
                        <button className="button-pink" disabled>Edit Reward</button>
                        <button className="button-red" disabled>Delete Reward</button>
                    </div>
                ) : (
                    <div className="button-field">
                        <button className="button-green" onClick={handleBack}>Back</button>
                        <Link to={`/edit-reward/${id}`}>
                            <button className="button-pink">Edit Reward</button>
                        </Link>
                        <button className="button-red" onClick={openModal}>Delete Reward</button>
                    </div>
                )}
            </div>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        {/* Row headers */}
                        <tr>
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
                        <tr>
                            {rewardData.listDayReward.map((dayReward, j) => (
                                <React.Fragment key={j}>
                                    <td>{dayReward.stokAwal}</td>
                                    <td>{dayReward.stokRedeemed}</td>
                                    <td style={{borderRight: '1px solid #E3E2E6'}}>{dayReward.stokSisa}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
            ) : (
                <p>Loading...</p>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-confirmation"
            >
            
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                <p className="text-center text-gray-700">Are you sure you want to delete this reward?</p>
                <br></br>
                <div>
                    <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                    <button className="button-green text-center" onClick={confirmDelete}>Confirm</button>
                </div>
                
            </Modal>
            <br></br>
        </div>
    );
}
 
export default RewardDetail;