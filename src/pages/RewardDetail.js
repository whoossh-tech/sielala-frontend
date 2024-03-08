import React from 'react';
import { useState, useEffect } from "react";
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';
import { useParams, Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const RewardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rewardData, setRewardData] = useState();
    const [countdays, setCountDays] = useState(0);
    const dayRangeCount = Array.from({ length: countdays });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const deleteReward = (e) => {
    //     e.preventDefault();

    //         openModal();
    // };

   useEffect(() => {

    axios.get(`http://localhost:8080/api/reward/detail/${id}`)
    .then(res => {
        setRewardData(res.data.rewardData)
        setCountDays(res.data.dayRange)
    }).catch(err => 
        console.log(err))
   })

   const confirmDelete = async (e) => {
    closeModal();

    try {
        const response = await axios.delete(`http://localhost:8080/api/reward/delete/${id}`);
        console.log('Reward deleted successfully:', response.data);
        navigate('/reward-inventory');
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (  
        <div className="RewardInventory">

            <div className="text-center pt-3">
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
                    <Link to={`/edit-reward/${id}`}>
                        <button className="button-pink">Edit Reward</button>
                    </Link>
                    <button className="button-green" onClick={openModal}>Delete Reward</button>
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
            {/* <div className='modalBackground'>
                <div className="modalContainer"> */}
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                    <p className="text-center text-gray-700">Are you sure you want to delete this reward?</p>
                    <br></br>
                    <div>
                        <button className="button-green text-center" onClick={closeModal}>Cancel</button>
                        <button className="button-pink text-center" onClick={confirmDelete}>Confirm</button>
                    </div>
                {/* </div>
            </div> */}
            </Modal>
        </div>
    );
}
 
export default RewardDetail;