import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../static/css/Button.css";
import '../../static/css/TenantRegistrationForm.css';
import '../../static/css/TenantApplicantDetail.css';
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import Sidebar from '../dashboard/Sidebar';

const TenantApplicantDetail = () => {
    const navigate = useNavigate();
    const { idTenantApplicant } = useParams();
    const [tenantApplicant, setTenantApplicant] = useState();
    const [eventData, setEventData] = useState();
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const role = localStorage.getItem('role');
    const [activePage, setActivePage] = useState('tenant-applicant');

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        axios
            .get(`https://sielala-backend-production.up.railway.app/api/tenant/detail/${idTenantApplicant}`)
            .then((res) => {
                setTenantApplicant(res.data.data);
                // console.log(res.data.data);
                // localStorage.setItem('idSelectedEvent', res.data.data.event.idEvent);
            })
            .catch((err) => console.log(err));
    });

    const handleBack = () => {
        localStorage.setItem('idSelectedEvent', tenantApplicant.event.idEvent);
        navigate(-1);
    };

    const handleAcceptButton = () => {
        openAcceptModal();

    };
    const handleRejectButton = () => {
        openRejectModal();
    };

    const openAcceptModal = () => {
        setIsAcceptModalOpen(true);
    };

    const closeAcceptModal = () => {
        setIsAcceptModalOpen(false);
    };

    const openRejectModal = () => {
        setIsRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setIsRejectModalOpen(false);
    };

    const confirmAccept = async (e) => {
        closeAcceptModal();

        try {
            const response = await axios.put(`https://sielala-backend-production.up.railway.app/api/tenant/${idTenantApplicant}/accept`);

            // Untuk pre-filled dropdown event
            // localStorage.setItem('idSelectedEvent', idEvent);

            console.log('Tenant Applicant Accepted:', response.data);
            toast.success("Tenant Applicant Accepted");

        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot accept Tenant Applicant");
        }
    };

    const confirmReject = async (e) => {
        closeRejectModal();

        try {
            const response = await axios.put(`https://sielala-backend-production.up.railway.app/api/tenant/${idTenantApplicant}/reject`);

            // Untuk pre-filled dropdown event
            // localStorage.setItem('idSelectedEvent', idEvent);

            console.log('Tenant Applicant Rejected:', response.data);
            toast.success("Tenant Applicant Rejected");

        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot reject Tenant Applicant");
        }
    };

    return (
        <body>
            {/* Sidebar Navigation */}
            <Sidebar activePage={activePage} />

            <main style={{ marginLeft: "60px" }}>

                {/* Header Start */}
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
                    <div className="mx-8">
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                            Tenant Applicant Detail</h1>
                        <div style={{ paddingTop: '25px', textAlign: 'left' }}>
                            <p className="subtitle">
                                <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> /
                                <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Tenant Applicant List </a>
                                / Detail
                            </p>
                        </div>
                    </div>
                </div>
                {/* Header Ends */}

          <div className='content-container my-4'>
            <div>

                        <br></br>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                        {/* <br></br> */}
                        <h1 style={{ textAlign: "left", marginLeft: 50, fontSize: 35 }}><strong>{tenantApplicant?.brandName}</strong></h1>

                        <div className="container mx-auto text-left">
                            <div style={{ alignContent: "center" }} className="mx-8">
                                <table style={{ borderCollapse: "collapse", width: "100%", alignItems: "center", borderRadius: "15px", overflow: "hidden" }}>
                                    <tbody>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", width: "10%", textAlign: "left" }}>Brand Name :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20, width: "30%" }}>{tenantApplicant?.brandName}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Email :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.brandEmail}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Telephone Number :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>+62 {tenantApplicant?.brandTelephone}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Instagram :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.brandInstagram}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Address :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.address}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Description :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.brandDescription}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>PIC Name :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.picName}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Amount of Electricity :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.electricityAmount}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Promo :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.brandPromo}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Product Category :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.category}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Booth Preference :</td>
                                            <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenantApplicant?.boothPreference}</td>
                                        </tr>

                                        <tr>
                                            <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Acceptance Status :</td>

                                            {tenantApplicant?.selectionDone === false && (
                                                // <p className="text-secondary-80" style={{ display: "inline-block" }}><b>Pending</b></p>
                                                <td className="text-secondary-80" style={{ textAlign: "left", marginLeft: 20 }}><b>Pending</b></td>
                                            )}

                                            {(tenantApplicant?.accepted === true && tenantApplicant?.selectionDone === true) && (
                                                // <p className="text-tertiary-80" style={{ display: "inline-block" }}><b>Accepted</b></p>
                                                <td className="text-tertiary-80" style={{ textAlign: "left", marginLeft: 20 }}><b>Accepted</b></td>
                                            )}

                                            {(tenantApplicant?.accepted === false && tenantApplicant?.selectionDone === true) && (
                                                // <p className="text-warning-DEFAULT" style={{ display: "inline-block" }}><b>Rejected</b></p>
                                                <td className="text-warning-DEFAULT" style={{ textAlign: "left", marginLeft: 20 }}><b>Rejected</b></td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {tenantApplicant?.selectionDone ? (
                                <div className="button-list">
                                    {/* <button className="button-pink" onClick={handleBack}>
                        Back to Applicant List
                    </button> */}
                                    <button className="button-green" disabled>
                                        Accept
                                    </button>
                                    <button className="button-red" disabled>
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="button-list">
                                    {/* <button className="button-pink" onClick={handleBack}>
                        Back to Applicant List
                    </button> */}
                                    <button className="button-green" onClick={handleAcceptButton}>
                                        Accept
                                    </button>
                                    <button className="button-red" onClick={handleRejectButton}>
                                        Reject
                                    </button>
                                </div>
                            )}



                            <Modal
                                isOpen={isAcceptModalOpen}
                                onRequestClose={closeAcceptModal}
                                id="modal-confirmation-form"
                            >
                                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                                <p className="text-center text-gray-700">Are you sure you want accept Tenant Applicant?</p>
                                <br></br>
                                <div>
                                    <button className="button-red text-center" onClick={closeAcceptModal}>Cancel</button>
                                    <button className="button-green text-center" onClick={confirmAccept}>Confirm</button>
                                </div>
                            </Modal>

                            <Modal
                                isOpen={isRejectModalOpen}
                                onRequestClose={closeRejectModal}
                                id="modal-confirmation-form"
                            >
                                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                                <p className="text-center text-gray-700">Are you sure you want reject Tenant Applicant?</p>
                                <br></br>
                                <div>
                                    <button className="button-red text-center" onClick={closeRejectModal}>Cancel</button>
                                    <button className="button-green text-center" onClick={confirmReject}>Confirm</button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
};

export default TenantApplicantDetail;
