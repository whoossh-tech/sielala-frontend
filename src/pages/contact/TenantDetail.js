import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../static/css/Button.css";
import "../../static/css/DetailTenant.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const TenantDetail = () => {
  const navigate = useNavigate();
  const { idTenant } = useParams();
  const [idEvent, setIdEvent] = useState("");
  const [tenant, setTenant] = useState();
  const [eventData, setEventData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [statusInvoice, setStatusInvoice] = useState("");
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`https://sielala-backend-production.up.railway.app/api/contact/detail/tenant/${idTenant}`)
      .then((res) => {
        setTenant(res.data.data);
        setIdEvent(res.data.idEvent);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://sielala-backend-production.up.railway.app/api/invoice/invoice-status/${idTenant}`)
      .then((res) => {
        setStatusInvoice(res.data.statusInvoice);
        if (res.data.statusInvoice != "null") {
          setInvoiceData(res.data.invoice);
        }
      })
      .catch((err) => console.log(err));

      localStorage.setItem('idSelectedEvent', idEvent);
  });

  const handleBack = () => {
    // Untuk pre-filled dropdown event
    localStorage.setItem("idSelectedEvent", idEvent);
    navigate("/contact");
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      {role === "PARTNERSHIP" && <NavbarPartnership style={{ zIndex: 999 }} />}

      {role === "ADMIN" && <NavbarAdmin style={{ zIndex: 999 }} />}

      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
        <div>
          <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: "left", fontSize: 50 }}>
            Tenant Detail
          </h1>
          {/* <div>
            <p className="subtitle">Manage and view tenant data here.</p>
          </div> */}
          <div>
            <p className="subtitle">
                <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> / 
                <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Partnership Management </a>
                / Detail
            </p>
          </div>
        </div>
      </div>

      <br></br>
      <Toaster position="top-center" reverseOrder={false} />

      {/* <div className="flex justify-between items-center mb-4 mx-8">
        <button className="button-green" onClick={handleBack}>
          Back
        </button>
      </div> */}

      <br></br>
      <h1 style={{ textAlign: "left", marginLeft: 120 }}>{tenant?.name}</h1>

        <div className="container mx-auto text-left">
          <div style={{ alignContent: "center" }} className="mx-8">
            <table style={{ borderCollapse: "collapse", width: "100%", alignItems: "center" }}>
                <tbody>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", width: "10%", textAlign: "left" }}>Brand Name :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20, width: "30%" }}>{tenant?.name}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Email :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.email}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Telephone Number :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>+62 {tenant?.telephone}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Instagram :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.brandInstagram}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Address :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.address}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Description :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.brandDescription}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>PIC Name :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.picName}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Amount of Electricity :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.electricityAmount}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Brand Promo :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.brandPromo}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Product Category :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.category}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Booth Preference :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{tenant?.boothPreference}</td>
                    </tr>
                </tbody>
            </table>
          </div>

          <div className="container mx-auto py-8 text-center">
            <div className="button-field">
              {/* <button className="button-green" onClick={handleBack}>
                Back
              </button> */}
              <Link to={`/tenant/edit/${idTenant}`}>
                <button className="button-pink">Edit Tenant</button>
              </Link>
              {(role === "PARTNERSHIP" || role === "ADMIN") && statusInvoice == "null" && (
                <Link to={`/invoice/create/${idTenant}`}>
                  <button className="button-brown">Create Invoice</button>
                </Link>
              )}
            </div>
          </div>

        <h1 className="text-2xl font-semibold mb-4 text-center">Invoice Data</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <table className="Invoice-table w-full">
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center" }}>Invoice ID</th>
                <th style={{ width: "20%", textAlign: "center" }}>Company</th>
                <th style={{ width: "20%", textAlign: "center" }}>Type</th>
                <th style={{ width: "20%", textAlign: "center" }}>Tracking Status</th>
                <th style={{ width: "20%", textAlign: "center" }}>Payment Validation</th>
                <th style={{ width: "20%", textAlign: "center" }}>Action</th>
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
