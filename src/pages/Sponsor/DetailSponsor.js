import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/sponsor/DetailSponsor.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const DetailSponsor = () => {
  const navigate = useNavigate();
  const { idSponsor } = useParams();
  const [sponsorData, setSponsorData] = useState();
  const [eventData, setEventData] = useState();
//   const [tenantData, setTenantData] = useState();

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sponsor/detail/${idSponsor}`)
      .then((res) => {
        setSponsorData(res.data.data);
      })
      .catch((err) => console.log(err));
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <NavbarPartnership />

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Sponsor Detail</h1>
              <div>
                  <p className="subtitle">Manage and view sponsor data here.</p>
              </div>
          </div>
      </div>

      <br></br>
      <Toaster
                    position="top-center"
                    reverseOrder={false}
            />

      <br></br>

      <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
          <button className="button-green" onClick={handleBack}>
            Back
          </button>
          <h1 className="text-2xl font-semibold mb-4" style={{ marginLeft: '-6%' }}>Sponsor Detail</h1>
          <div></div>
        </div>
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
            <br></br>

        <h1 className="text-2xl font-semibold mb-4">List Invoice</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <table className="Invoice-table w-full">
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center"}}>ID</th>
                <th style={{ width: "20%", textAlign: "center"}}>Tracking Status</th>
                <th style={{ width: "20%", textAlign: "center"}}>Payment Validation</th>
                <th style={{ width: "20%", textAlign: "center"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {eventData?.listInvoice && eventData.listInvoice.length > 0 ? (
                eventData.listInvoice.map((invoice, i) => (
                  <tr key={i}>
                    <td>{invoice.brandName}</td>
                    <td>{invoice.picName}</td>
                    <td>{invoice.brandEmail}</td>
                    <td>{invoice.brandTelephone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No invoiceData available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DetailSponsor;
