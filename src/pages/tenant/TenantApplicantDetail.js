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

const TenantApplicantDetail = () => {
  const navigate = useNavigate();
  const { idTenantApplicant } = useParams();
  const [tenantApplicant, setTenantApplicant] = useState();
  const [eventData, setEventData] = useState();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const role = localStorage.getItem('role');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tenant/detail/${idTenantApplicant}`)
      .then((res) => {
        setTenantApplicant(res.data.data);
        // console.log(res.data.data);
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
        const response = await axios.put(`http://localhost:8080/api/tenant/${idTenantApplicant}/accept`);

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
        const response = await axios.put(`http://localhost:8080/api/tenant/${idTenantApplicant}/reject`);

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
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
        {( role === 'PARTNERSHIP' ) && (
            <NavbarPartnership style={{ zIndex: 999 }} />
        )}

        {( role === 'ADMIN' ) && (
            <NavbarAdmin style={{ zIndex: 999 }} />
        )}

        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
            <div>
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                Tenant Applicant Detail</h1>
                <div>
                    <p className="subtitle">Manage and view tenant applicant data here.</p>
                </div>
            </div>
        </div>

        <br></br>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />

        <br></br>

        <div className="container mx-auto py-8 text-left">
            <div className="grid grid-cols-2 gap-4 text-left">
                <div className="first-column">
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Name :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.brandName}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>PIC Name :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.picName}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Email :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.brandEmail}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Telephone Number :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>+62 {tenantApplicant?.brandTelephone}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Instagram :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.brandInstagram}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Address :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.address}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Description :</p>
                        <p className="text-tertiary-90">{tenantApplicant?.brandDescription}</p>
                    </div>
                </div>
                <div className="second-column">
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Event :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.event.eventName}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Amount of Electricity :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.electricityAmount}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Promo :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.brandPromo}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Product Category :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.category}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Booth Preference :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenantApplicant?.boothPreference}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Acceptance Status :</p>

                        { tenantApplicant?.selectionDone === false && (
                            <p className="text-secondary-80" style={{ display: "inline-block" }}><b>Pending</b></p>
                        ) }

                        { (tenantApplicant?.accepted === true && tenantApplicant?.selectionDone === true) && (
                            <p className="text-tertiary-80" style={{ display: "inline-block" }}><b>Accepted</b></p>
                        ) }

                        { (tenantApplicant?.accepted === false && tenantApplicant?.selectionDone === true) && (
                            <p className="text-warning-DEFAULT" style={{ display: "inline-block" }}><b>Rejected</b></p>
                        ) } 
                    </div>
                </div>
            </div>

            { tenantApplicant?.selectionDone ? (
                <div className="button-list">
                    <button className="button-pink" onClick={handleBack}>
                        Back to Applicant List
                    </button>
                    <button className="button-green" disabled>
                        Accept
                    </button>
                    <button className="button-red" disabled>
                        Reject
                    </button>
                </div>
            ) : ( 
                <div className="button-list">
                    <button className="button-pink" onClick={handleBack}>
                        Back to Applicant List
                    </button>
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
                id="modal-accept-tenant"
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
                id="modal-reject-tenant"
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
  );
};

export default TenantApplicantDetail;
