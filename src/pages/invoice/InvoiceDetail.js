import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useState, useEffect} from "react";
import {toast, Toaster} from 'react-hot-toast';
import { useParams, Link, useNavigate } from "react-router-dom";
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import '../../App.css';
import '../../static/css/invoice/DetailInvoice.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/bg-cover.png';

const InvoiceDetail = () => {
    const { idInvoice } = useParams();
    const url = 'http://localhost:8080';

    const navigate = useNavigate();

    const [invoiceData, setInvoiceData] = useState();
    const [countdays, setCountDays] = useState(0);
    const [idEvent, setIdEvent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

   useEffect(() => {

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:8080/api/invoice/detail/${idInvoice}`)
        .then(res => {
            setInvoiceData(res.data.data)
            setIdEvent(res.data.data.event.idEvent)
        }).catch(err => 
            console.log(err))
        })

    const handleBack = () => {
        localStorage.setItem('idSelectedEvent', idEvent);
        navigate(-1);
    };

    const handleNotify = async (e) => {
        setIsLoading(true);
        closeModal();

        try {
            const response = await axios.put(`${url}/api/invoice/notify/${idInvoice}`);
            toast.success("Successfully notified");
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleGenerate = async (e) => {
        try {
            // const response = await axios.get(`${url}/api/invoice/generate-pdf/invoice/${idInvoice}`, {
            //     responseType: 'blob'
            // });
    
            // const file = new Blob([response.data], { type: 'application/pdf' });
            // const fileURL = URL.createObjectURL(file);
    
            // window.open(fileURL, '_blank');
            const response = await axios.get(`${url}/api/invoice/generate-pdf/invoice/${idInvoice}`, {
                responseType: 'blob'
            });
    
            // Membuat objek URL untuk blob
            const fileURL = URL.createObjectURL(new Blob([response.data]));
    
            // Membuat elemen <a> untuk men-download file
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', `SIELALA_INVOICE_${invoiceData.companyName}.pdf`);
    
            // Menambahkan elemen <a> ke dokumen dan memicu klik pada elemen tersebut
            document.body.appendChild(link);
            link.click();
    
            // Menghapus elemen <a> setelah proses download selesai
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot generate invoice");
        }
    };

    function formatRupiah(angka) {
        var formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        });
        return formatter.format(angka);
    }

    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarOperation />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Invoice Detail</h1>
                    <div>
                            <p className="subtitle">Manage and view invoice's data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

            <br></br>

        {invoiceData ? (
                <>
            <br></br>

            <div className="detail-invoice">
                <div className="each-invoice">
                        <p className="invoice-text-title">Tenant/Sponsor:</p>
                        <p className="invoice-text">{invoiceData.companyName}</p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">Type:</p>
                        <p className="invoice-text">{invoiceData.type}</p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">Address:</p>
                        <p className="invoice-text">{invoiceData.companyAddress}</p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">PIC Name:</p>
                        <p className="invoice-text">{invoiceData.picName}</p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">Date Issued:</p>
                        <p className="invoice-text">
                        {new Date(invoiceData.dateIssued).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">Tracking Status:</p>
                        <p className="invoice-text">{invoiceData.trackingStatus}</p>
                </div>
                <div className="each-invoice">
                        <p className="invoice-text-title">Payment Status:</p>
                        <p className="invoice-text">{invoiceData.paymentStatus}</p>
                </div>
            </div>

            <br></br>
            <br></br>

            <div>
                <div className="button-field">
                    <button className="button-green" onClick={handleBack}>Back</button>
                    <Link to={`/invoice/edit-detail/${idInvoice}`}>
                        <button className="button-pink">Edit Invoice</button>
                    </Link>
                    <button className="button-brown" onClick={handleGenerate}>Generate to PDF</button>

                    { (invoiceData.trackingStatus === 'Issued' || invoiceData.trackingStatus === 'Pending') && (
                        <button className="button-green" onClick={openModal} disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Notify Client'}
                        </button>
                    )}
                </div>
                    
            </div>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        {/* Row headers */}
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            </tr>
                    </thead>
                    <tbody>
                        {invoiceData.listInvoiceItem.map((itemInvoice, j) => (
                            <tr key={j}>
                                <td>{itemInvoice.item}</td>
                                <td>{itemInvoice.quantity}</td>
                                <td>{formatRupiah(itemInvoice.rate)}</td>
                                <td>{formatRupiah(itemInvoice.totalAmountItem)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tbody>
                        <tr>
                            <td colSpan={3}>Total</td>
                            <td>{formatRupiah(invoiceData.totalAmount)}</td>
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
                <p className="text-center text-gray-700">Are you sure you want to notify the client?</p>
                <br></br>
                <div>
                    <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                    <button className="button-green text-center" onClick={handleNotify}>Confirm</button>
                </div>
                
            </Modal>
            <br></br>
        </div>
    );
}
 
export default InvoiceDetail;