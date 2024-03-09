import React from 'react';
import axios from "axios";
import { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import {toast, Toaster} from 'react-hot-toast';
import { NavbarOperation } from '../components/navbar/NavbarOperation';
import '../static/css/Button.css';
import '../static/css/FormRewardInventory.css';
import '../static/css/Modal.css';
import backgroundPhoto from '../assets/bg-cover.png';

const EditRewardInventory = () => {
    const { idReward } = useParams();
    const url = 'http://localhost:8080';
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [category, setCategory] = useState('');
    const [listDayReward, setListDayReward] = useState([]);
    const [countDays, setCountDays] = useState(1);
    const [eventName, setEventName]  = useState('');
    const [errors, setErrors] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchRewardData = async () => {
            try {
                const response = await axios.get(`${url}/api/reward/detail/${idReward}`);
                const rewardData = response.data.rewardData;
                // console.log(rewardData);

                setProductName(rewardData.productName);
                setBrandName(rewardData.brandName);
                setCategory(rewardData.category);
                setListDayReward(rewardData.listDayReward);
                setEventName(rewardData.event.eventName);
                setCountDays(response.data.daysRange);
          
            } catch (error) {
                console.error('Error fetching reward data:', error);
            }
        };

        fetchRewardData();
    }, [idReward]);

    const validateForm = () => {
        const newErrors = {};

        if (!brandName.trim()) {
            newErrors.brand_name = 'Brand Name cannot be empty';
        }

        if (!productName.trim()) {
            newErrors.product_name = 'Product Name cannot be empty';
        }

        if (!category || isNaN(category)) {
            newErrors.category = 'Category cannot be empty';
        }
        
        const allStocksEmpty = listDayReward.every(day => day.stokAwal === 0 || day.stokAwal === null || day.stokAwal === undefined || Number.isNaN(day.stokAwal));
        if (allStocksEmpty) {
            newErrors.listDayReward = 'Fill at least one Initial Stock';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (validateForm()){
            openModal();
        } else {
            console.log('Form validation failed');
        }
    };

    const confirmSubmit = async (e) => {
        closeModal();

        try {
            const response = await axios.put(`${url}/api/reward/edit/${idReward}`, {
                productName,
                brandName,
                category,
                listDayReward
            });
            
            console.log('Reward edited successfully:', response.data);
            navigate('/reward-inventory');

            await new Promise((resolve) => setTimeout(resolve, 500))
            toast.success("Reward edited successfully");
            
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot edit reward");
        }
    };

    const renderDayRewardRows = () => {
        // sort array by the day
        const sortedDayRewards = [...listDayReward].sort((a, b) => a.day - b.day);
    
        return sortedDayRewards.map(dayReward => (
            <tr key={dayReward.id}>
                <td>{`Day ${dayReward.day}`}</td>
                <td>
                    <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listDayReward && "border-danger"}`}>
                        <input
                            className="px-4 py-3 w-full focus:outline-none"
                            type="number"
                            value={dayReward.stokAwal || ''}  
                            min="0"
                            onChange={(e) => handleDayStockChange(dayReward.day, parseInt(e.target.value))}
                        />
                    </div>
                </td>
            </tr>
        ));
    };

    const handleDayStockChange = (day, value) => {
        const index = listDayReward.findIndex(dayReward => dayReward.day === day);
        if (index !== -1) {
            // Copy the array and update the stokAwal 
            const updatedListDayReward = [...listDayReward];
            updatedListDayReward[index] = { ...updatedListDayReward[index], stokAwal: value };
            setListDayReward(updatedListDayReward);
        }
    };

    return (
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
        <NavbarOperation />

        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
            <div>
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                    Edit Reward</h1>
                <div>
                        <p className="subtitle">Manage and view reward’s data here.</p>
                </div>
            </div>
        </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

        <form
            className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
             onSubmit={(e) => onSubmit(e)}
        >

        {/* <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Edit Reward</h1> */}
        <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

            {/* brand name */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_name">
                Brand Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_name && "border-danger"}`}>
                <input
                id="brand_name"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="Insert Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                />
            </div>

            {errors.brand_name && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_name}
                </span>
            )}
            </div>

            {/* product name */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="product_name">
                Product Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.product_name && "border-danger"}`}>
                <input
                id="product_name"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="Insert Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)} 
                />
            </div>

            {errors.product_name && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.product_name}
                </span>
            )}
            </div>

            {/* category */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="category">
                Category<span className="text-danger">*</span>
            </label>

            <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_category && "border-danger"}`}>
                <select
                id="category"
                className="appearance-none px-4 py-3 w-full focus:outline-none"
                placeholder="Choose category"
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
                >
                <option>Choose category</option>
                <option value="1">CAT 1</option>
                <option value="2">CAT 2</option>
                </select>
            </div>

            {errors.category && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.category}
                </span>
            )}
            </div>

            {/* event */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="event">
                Event
            </label>

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
                <input
                    id="event"
                    className="px-4 py-3 w-full focus:outline-none bg-gray-100"
                    value={eventName}
                    readOnly
                />
            </div>
            </div>

            {/* initial stock */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="category">
                Stock<span className="text-danger">*</span>
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Initial Stock</th>
                    </tr>
                </thead>
                <tbody>{renderDayRewardRows()}</tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            {errors.listDayReward && (
                                <span className="mt-0.5 text-danger text-xs">
                                    {errors.listDayReward}
                                </span>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>

        </div>

        <br></br>
        <div>
            <button className="button-green" onClick={() => navigate(-1)}>Cancel</button>
            <button className="button-pink" type="submit">Save Reward</button>
        </div>

        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            id="modal-confirmation"
        >
        {/* <div className='modalBackground'>
            <div className="modalContainer"> */}
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                <p className="text-center text-gray-700">Are you sure you want to edit reward?</p>
                <br></br>
                <div>
                    <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                    <button className="button-green text-center" onClick={confirmSubmit}>Confirm</button>
                </div>
            {/* </div>
        </div> */}
        </Modal>

        <br></br>

        </form>
        </div>
    );
};
export default EditRewardInventory;