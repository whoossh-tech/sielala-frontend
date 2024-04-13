import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const TenantDetail = () => {
  const navigate = useNavigate();
  const { idTenant } = useParams();
  const [tenant, setTenant] = useState();
  const [eventData, setEventData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [statusInvoice, setStatusInvoice] = useState('');
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const role = localStorage.getItem('role');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`https://sielala-backend-production.up.railway.app/api/contact/detail/tenant/${idTenant}`)
      .then((res) => {
        setTenant(res.data.data);
      })
      .catch((err) => console.log(err));

      axios
      .get(`https://sielala-backend-production.up.railway.app/api/invoice/invoice-status/${idTenant}`)
      .then((res) => {
        setStatusInvoice(res.data.statusInvoice);
        if (res.data.statusInvoice != "null") {
            setInvoiceData(res.data.invoice)
          }
      })
      .catch((err) => console.log(err));

  });

  const handleBack = () => {
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
                Tenant Detail</h1>
                <div>
                    <p className="subtitle">Manage and view tenant data here.</p>
                </div>
            </div>
        </div>

        <br></br>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />

        <br></br>

        <div className="flex justify-between items-center mb-4 mx-8">
            <button className="button-green" onClick={handleBack}>
            Back
            </button>
            <h1 className="text-2xl font-semibold mb-4" style={{ marginLeft: '-6%' }}>Tenant Detail</h1>
            <div></div>
        </div>

        <div className="container mx-auto py-8 text-left">
            <div className="grid grid-cols-2 gap-4 text-left">
                <div className="first-column">
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Name :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.name}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Email :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.email}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Telephone Number :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>+62 {tenant?.telephone}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Instagram :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.brandInstagram}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Address :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.address}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Description :</p>
                        <p className="text-tertiary-90">{tenant?.brandDescription}</p>
                    </div>
                </div>
                <div className="second-column">
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>PIC Name :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.picName}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Amount of Electricity :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.electricityAmount}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Brand Promo :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.brandPromo}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Product Category :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.category}</p>
                    </div>
                    <div className="mb-3">
                        <p style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold" }}>Booth Preference :</p>
                        <p className="text-tertiary-90" style={{ display: "inline-block" }}>{tenant?.boothPreference}</p>
                    </div>
                </div>
            </div>

            {/* <div>
                <div className="button-field">
                    <Link to={`/invoice/create/${idTenant}`}>
                        <button className="button-green">Create Invoice</button>
                    </Link>
                </div>
            </div> */}

            {( role === 'PARTNERSHIP' || role === 'ADMIN' ) && (statusInvoice == "null") && (
                <div className="container mx-auto py-8 text-left">
                    {/* Your existing code */}
                    
                    <div className="button-field text-center"> {/* Added text-center class */}
                        <Link to={`/invoice/create/${idTenant}`}>
                            <button className="button-green">Create Invoice</button>
                        </Link>
                    </div>

                    {/* Your existing code */}
                </div>
            )}

            <h1 className="text-2xl font-semibold mb-4 text-center">Invoice Data</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <table className="Invoice-table w-full">
                    <thead>
                        <tr>
                            <th style={{ width: "20%", textAlign: "center"}}>Invoice ID</th>
                            <th style={{ width: "20%", textAlign: "center"}}>Company</th>
                            <th style={{ width: "20%", textAlign: "center"}}>Type</th>
                            <th style={{ width: "20%", textAlign: "center"}}>Tracking Status</th>
                            <th style={{ width: "20%", textAlign: "center"}}>Payment Validation</th>
                            <th style={{ width: "20%", textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {invoiceData ? (
                        <tr>
                            <td>{invoiceData.idInvoice}</td>
                            <td>{invoiceData.companyName}</td>
                            <td>{invoiceData.type}</td>
                            <td>{invoiceData.trackingStatus}</td>
                            <td>{invoiceData.paymentStatus}</td>
                            <td>
                                <Link to={`/invoice/detail/${invoiceData.idInvoice}`}>
                                    <button className="button-green-invoice">Detail</button>
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">No invoice Data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

        </div>
    </div>
  );
};

export default TenantDetail;
