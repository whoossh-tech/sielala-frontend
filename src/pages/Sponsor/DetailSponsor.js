import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const DetailSponsor = () => {
  const navigate = useNavigate();
  const { idSponsor } = useParams();
  const [sponsorData, setSponsorData] = useState();
//   const [tenantData, setTenantData] = useState();

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
      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "120px" }}>
        <div className="text-wrapper">
          <h1 className="title">Sponsor Detail</h1>
          <div className="subtitle-wrapper">
            <p className="subtitle">Manage and view sponsor data here.</p>
          </div>
        </div>
      </div>

      <br></br>

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Detail Sponsor</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <p className="font-semibold mb-2">Company Name:</p>
          <p>{sponsorData?.companyName}</p>
          <p className="font-semibold mb-2">PIC Name:</p>
          <p>{sponsorData?.picName}</p>
          <p className="font-semibold mb-2">Company Address:</p>
          <p>{sponsorData?.companyAddress}</p>
          <p className="font-semibold mb-2">Company Email:</p>
          <p>{sponsorData?.companyEmail}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Invoice</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <table className="Tenant-table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand Name</th>
                <th>PIC Name</th>
                <th>Brand Email</th>
                <th>Brand Telephone</th>
              </tr>
            </thead>
            {/* <tbody>
              {eventData?.listTenant && eventData.listTenant.length > 0 ? (
                eventData.listTenant.map((tenant, i) => (
                  <tr key={i}>
                    <td>{tenant.brandName}</td>
                    <td>{tenant.picName}</td>
                    <td>{tenant.brandEmail}</td>
                    <td>{tenant.brandTelephone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No tenantData available</td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </div>
      
      <div className="button-field">
        <button className="button-green" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailSponsor;
