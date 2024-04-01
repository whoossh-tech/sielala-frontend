import React from 'react';
import axios from "axios";
import { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import {toast, Toaster} from 'react-hot-toast';
import '../../static/css/Button.css';
import '../../static/css/invoice/FormCreateInvoice.css';
import '../../static/css/Modal.css';
import backgroundPhoto from '../../assets/bg-cover.png';
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import Sponsor from '../Sponsor/Sponsor';

const CreateInvoice = () => {
    const { idSponsor } = useParams();
    const url = 'http://localhost:8080';
    const navigate = useNavigate();

    // const [sponsorName, setSponsorName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [picName, setPicName] = useState('');
    const [listInvoiceItem, setInvoiceItems] = useState([{ item: '', quantity: '', rate: '' }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchSponsorInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get(`${url}/api/sponsor/detail/${idSponsor}`);
                console.log(response.data);
                const sponsor = response.data.data;
                console.log(sponsor.companyName);
                // setSponsorName(sponsor.companyName);
                setCompanyName(sponsor.companyName);
                setCompanyAddress(sponsor.companyAddress);
                setPicName(sponsor.picName);
            } catch (error) {
                console.error('Error fetching sponsor information:', error);
            }
        };

        fetchSponsorInfo();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!companyAddress.trim()) {
            newErrors.company_address = 'Company Address cannot be empty';
        }

        if (!picName.trim()) {
            newErrors.pic_name = 'PIC Name cannot be empty';
        }
        
            // Validasi apakah ada item yang kosong
        // const anyItemEmpty = listInvoiceItem.some(item => item.item.trim() === '' || item.quantity === '' || item.rate === '');
        // if (anyItemEmpty) {
        //     newErrors.listInvoiceItem = 'Input for items cannot be empty';
        // }

        // const everyItemEmpty = listInvoiceItem.some(item => item.item.trim() === '' || item.quantity === '' || item.rate === '');
        // if (everyItemEmpty) {
        //     newErrors.listInvoiceItem = 'Input for item, rate, and quantity cannot be empty';
        // }

        const itemEmpty = listInvoiceItem.some(item => item.item.trim() === '');
        if (itemEmpty) {
            newErrors.listInvoiceItem = 'Input for items cannot be empty';
        }

        const quantityEmpty = listInvoiceItem.some(item => item.quantity === '');
        if (quantityEmpty) {
            newErrors.listInvoiceItem = 'Input for quantity cannot be empty';
        }

        const rateEmpty = listInvoiceItem.some(item => item.rate === '');
        if (rateEmpty) {
            newErrors.listInvoiceItem = 'Input for rate cannot be empty';
        }

    
        const everyItemEmpty = listInvoiceItem.some(item => item.item.trim() === '' || item.quantity === '' || item.rate === '');
        if (everyItemEmpty) {
            newErrors.listInvoiceItem = 'Input for every item, rate, and quantity cannot be empty';
        }

        // Validasi apakah semua nilai quantity adalah angka
        const anyQuantityNotNumber = listInvoiceItem.some(item => isNaN(item.quantity));
        if (anyQuantityNotNumber) {
            newErrors.listInvoiceItem = 'Input for quantity has to be a number';
        }

        // Validasi apakah semua nilai rate adalah angka
        const anyRateNotNumber = listInvoiceItem.some(item => isNaN(item.rate));
        if (anyRateNotNumber) {
            newErrors.listInvoiceItem = 'Input for rate has to be a number';
        }

        // const allItemsEmpty = listInvoiceItem.every(item => item.item.trim() === '' || item.quantity === '' || item.rate === '' || isNaN(item.quantity) || isNaN(item.rate));
        // if (allItemsEmpty) {
        //     newErrors.listInvoiceItem = 'Input for items cannot be empty';
        // }

        // const quantityNumber = listInvoiceItem.every(item => isNaN(item.quantity));
        // if (quantityNumber) {
        //     newErrors.listInvoiceItem = 'Input for quantity has to be a number';
        // }

        // const rateNumber = listInvoiceItem.every(item => isNaN(item.rate));
        // if (rateNumber) {
        //     newErrors.listInvoiceItem = 'Input for rate has to be a number';
        // }

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

            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const response = await axios.post(`${url}/api/invoice/add/${idSponsor}`, {
                companyName,
                companyAddress,
                picName,
                listInvoiceItem,
                type: "sponsor"
            });
            // Untuk pre-filled dropdown event
            // localStorage.setItem('idSelectedEvent', idEvent);

            console.log('Invoice Created successfully:', response.data);
            navigate('/reward-inventory');

            await new Promise((resolve) => setTimeout(resolve, 500))
            toast.success("Invoice Created Successfully");
            
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot add reward");
        }
    };

    const handleAddRow = () => {
        setInvoiceItems([...listInvoiceItem, { item: '', quantity: '', rate: '' }]);
    };

    const handleDeleteRow = (index) => {
        const newListInvoiceItem = [...listInvoiceItem];
        newListInvoiceItem.splice(index, 1); // Hapus item dari listInvoiceItem
        setInvoiceItems(newListInvoiceItem); // Atur listInvoiceItem dengan array yang baru
    };
    
    // const handleInputChange = (index, input) => {
    //     const { name, value } = input.target;
    //     const list = [...listInvoiceItem];
    //     list[index][name] = value;
    //     setInvoiceItems(list);
    // };

    // const handleInputChange = (index, event) => {
    //     const { name, value } = event;
    //     const newList = [...listInvoiceItem];
    //     newList[index][name] = value;
    //     setInvoiceItems(newList);
    // };

    const handleInputChange = (index, name, value) => {
        const newListInvoiceItem = [...listInvoiceItem]; // Salin listInvoiceItem ke array baru
        newListInvoiceItem[index][name] = value; // Perbarui nilai item dengan nilai baru
        setInvoiceItems(newListInvoiceItem); // Atur listInvoiceItem dengan array yang baru
    };

    // const updatedDayRewards = [...listDayReward];
    //     updatedDayRewards[index] = { ...updatedDayRewards[index], stokAwal: value };

    const handleBack = () => {
        // Untuk pre-filled dropdown event
        // localStorage.setItem('idSelectedEvent', idEvent);
        navigate(-1);
    }

    return (
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarOperation />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Create Invoice</h1>
                    <div>
                            <p className="subtitle">Manage and view invoice's data here.</p>
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

            {/* <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Add New Reward</h1> */}
            <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

                {/* brand name */}
                {/* <div className="input-form flex flex-col space-y-1">
                <label className="input-label font-reynaldo text-left" htmlFor="company_name">
                    Company Name<span className="text-danger">*</span>
                </label>

                <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
                    <input
                        id="company_name"
                        className="px-4 py-3 w-full focus:outline-none bg-gray-100"
                        value={companyName}
                        readOnly
                    />
                </div> */}


                {/* event */}
                <div className="input-form flex flex-col">
                    <label className="input-label font-reynaldo text-left" htmlFor="event">
                        Company Name
                    </label>

                    <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
                        <input
                            id="company_name"
                            className="px-4 py-3 w-full focus:outline-none bg-gray-100"
                            value={companyName}
                            readOnly
                        />
                    </div>
                </div>

                {/* {errors.brand_name && (
                    <span className="mt-0.5 text-danger text-xs">
                    {errors.brand_name}
                    </span>
                )} */}
                {/* </div> */}

                {/* product name */}
                <div className="input-form flex flex-col space-y-1">
                <label className="input-label font-reynaldo text-left" htmlFor="company_address">
                    Company Address<span className="text-danger">*</span>
                </label>

                <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.company_address && "border-danger"}`}>
                    <input
                    id="company_address"
                    className="px-4 py-3 w-full focus:outline-none"
                    placeholder="Insert Company Address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)} 
                    />
                </div>

                {errors.company_address && (
                    <span className="mt-0.5 text-danger text-xs">
                    {errors.company_address}
                    </span>
                )}
                </div>

                {/* product name */}
                <div className="input-form flex flex-col space-y-1">
                <label className="input-label font-reynaldo text-left" htmlFor="pic_name">
                    Company PIC<span className="text-danger">*</span>
                </label>

                <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.pic_name && "border-danger"}`}>
                    <input
                    id="pic_name"
                    className="px-4 py-3 w-full focus:outline-none"
                    placeholder="Insert Company PIC Name"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)} 
                    />
                </div>

                {errors.pic_name && (
                    <span className="mt-0.5 text-danger text-xs">
                    {errors.pic_name}
                    </span>
                )}
                </div>

                <div>
                    <div className="button-field">
                        <button className="button-green" onClick={handleAddRow}>Add Item</button>
                    </div>
                </div>

                {/* initial stock */}
                <div className="input-form flex flex-col">
                <label className="input-label font-reynaldo text-left" htmlFor="items">
                    Items<span className="text-danger">*</span>
                </label>

                <table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listInvoiceItem.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                    <input
                                        className="px-4 py-3 w-full focus:outline-none"
                                        type="text"
                                        value={item.item}  
                                        // min="0"
                                        // disabled={index+1 < day}
                                        onChange={(e) => handleInputChange(index, 'item', e.target.value)}
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                    <input
                                        className="px-4 py-3 w-full focus:outline-none"
                                        type="number"
                                        value={item.quantity}  
                                        min="0"
                                        // disabled={index+1 < day}
                                        onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value))}
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                    <input
                                        className="px-4 py-3 w-full focus:outline-none"
                                        type="number"
                                        value={item.rate}  
                                        min="0"
                                        // disabled={index+1 < day}
                                        onChange={(e) => handleInputChange(index, 'rate', parseInt(e.target.value))}
                                    />
                                </div>
                            </td>
                            <td>
                                {/* Tombol hapus */}
                                <button className="button-red"onClick={() => handleDeleteRow(index)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3">
                            {errors.listInvoiceItem && (
                                <span className="mt-0.5 text-danger text-xs">
                                    {errors.listInvoiceItem}
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
                <button className="button-green" onClick={handleBack}>Cancel</button>
                <button className="button-pink" type="submit">Create Invoice</button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-confirmation"
            >
            {/* <div className='modalBackground'>
                <div className="modalContainer"> */}
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                    <p className="text-center text-gray-700">Are you sure you want to create this invoice?</p>
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

export default CreateInvoice;