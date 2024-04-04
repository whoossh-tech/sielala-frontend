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

const TenantApplicantDetail = () => {
  const navigate = useNavigate();
  const { idTenantApplicant } = useParams();
  const [tenantApplicant, setTenantApplicant] = useState();
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

            <div className="button-list">
                <button className="button-pink" onClick={handleBack}>
                    Back to Applicant List
                </button>

                <button className="button-green" onClick={handleBack}>
                    Accept
                </button>
                <button className="button-red" onClick={handleBack}>
                    Reject
                </button>
               
            </div>
        </div>
    </div>
  );
};

export default TenantApplicantDetail;
