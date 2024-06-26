import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import "../../static/css/sponsor/DetailSponsor.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Sidebar from '../dashboard/Sidebar'

const DetailSponsor = () => {
  const navigate = useNavigate();
  const { idSponsor } = useParams();

  const [idEvent, setIdEvent] = useState("");
  const [sponsorData, setSponsorData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [statusInvoice, setStatusInvoice] = useState('');
  const [eventData, setEventData] = useState();
  const role = localStorage.getItem('role');
  const [activePage] = useState('contact');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`https://sielala-backend-production.up.railway.app/api/sponsor/detail/${idSponsor}`)
      .then((res) => {
        setSponsorData(res.data.data);
        setIdEvent(res.data.idEvent);
        // setIdInvoice(res.data.data.idInvoice)
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://sielala-backend-production.up.railway.app/api/invoice/invoice-status/${idSponsor}`)
      .then((res) => {
        setStatusInvoice(res.data.statusInvoice);

        if (res.data.statusInvoice != "null") {
          setInvoiceData(res.data.invoice)
        }
      })
      .catch((err) => console.log(err));

    localStorage.setItem('idSelectedEvent', idEvent);
  });

  const handleBack = () => {
    localStorage.setItem('idSelectedEvent', idEvent);
    navigate("/contact");
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
              Sponsor Detail</h1>
            <div>
              <p className="subtitle">
                <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> /
                <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Partnership Management </a>
                / Detail
              </p>
            </div>
          </div>
        </div>
        {/* Header Ends */}

        <br></br>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-semibold mb-4 text-center">Sponsor Detail</h1>
          <br></br>

          <div className="detail-sponsor bg-white p-6 rounded-lg shadow-md mb-4">
            <div className="each-sponsor">
              <p className="sponsor-text-title">Company Name :</p>
              <p className="sponsor-text">{sponsorData?.name}</p>
            </div>
            <div className="each-sponsor">
              <p className="sponsor-text-title">PIC Name :</p>
              <p className="sponsor-text">{sponsorData?.picName}</p>
            </div>
            <div className="each-sponsor">
              <p className="sponsor-text-title">Company Address :</p>
              <p className="sponsor-text">{sponsorData?.address}</p>
            </div>
            <div className="each-sponsor">
              <p className="sponsor-text-title">Company Email :</p>
              <p className="sponsor-text">{sponsorData?.email}</p>
            </div>
            <div className="each-sponsor">
              <p className="sponsor-text-title">Company Telephone :</p>
              <p className="sponsor-text">{sponsorData?.telephone}</p>
            </div>
          </div>

          <br></br>

          <div>
            <div className="button-field " style={{ marginLeft: '80px' }}>
              {/* <button className="button-green" onClick={handleBack}>Back</button> */}
              <Link to={`/sponsor/edit/${idSponsor}`}>
                <button className="button-pink">Edit Sponsor</button>
              </Link>
              {(role === 'PARTNERSHIP' || role === 'ADMIN') && (statusInvoice == "null") && (
                <Link to={`/invoice/create/${idSponsor}`}>
                  <button className="button-brown">Create Invoice</button>
                </Link>
              )}
            </div>
          </div>

          <br></br>

          <h1 className="text-2xl font-semibold mb-4">Invoice</h1>
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

      </main>
    </body>
  );
};

export default DetailSponsor;
