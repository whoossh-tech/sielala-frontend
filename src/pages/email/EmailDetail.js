import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { useParams } from "react-router-dom";
import Sidebar from '../dashboard/Sidebar';

const EmailDetail = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const { idEmail } = useParams();
  const [emailDetail, setEmailDetail] = useState();
  const [showRecipient, setShowRecipient] = useState(true);
  const [activePage, setActivePage] = useState('bulk-email');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/email/${idEmail}`)
      .then((res) => {
        setEmailDetail(res.data.data);
        console.log("email detail:")
        console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  });

  const handleBack = () => {
    navigate(-1);
  };

  const toggleRecipient = () => {
    setShowRecipient(!showRecipient);
  };

  return (
    <body>
      <Sidebar activePage={activePage}/>
      <main style={{marginLeft: "60px"}}>
      <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">

{/* Header Start */}
<div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
              <div className="mx-8">
                  <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                  Email Detail</h1>
              </div>
              <div>
                    <p className="subtitle">
                        <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> / 
                        <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Bulk Email Management </a>
                        / Email Detail
                    </p>
                </div>
          </div>
          {/* Header Ends */}

<br></br>

<div className="container mx-auto py-8">
  <div className="flex justify-between items-center mb-4">
    {/* <button className="button-green" onClick={handleBack}>
      Back
    </button> */}
  </div>

  {emailDetail ? (
      <div className="bg-white p-6 rounded-lg shadow-md mb-4" style={{ textAlign: "left", marginLeft: 50, marginRight: 50 }}>
        <div style={{ display: "flex", alignItems: "left", justifyContent: "space-between" }}>
          <h1 className="mx-8" style={{ fontWeight: "bold", textAlign: "left", marginLeft: 30 }}>{emailDetail.subject}</h1>
          <button className="button-grey text-md" onClick={toggleRecipient} style={{ padding: "4px 8px", fontSize: "12px", alignContent: "left" }}>
            {showRecipient ? "▽" : "△"}
          </button>
        </div>
        <p style={{ marginLeft: 30 }} className="text-neutral-60">{emailDetail.dateFormatted}</p>
        <br></br>
        <div style={{ alignContent: "left" }}>
          {showRecipient && (
            <div className="mx-8 text-neutral-80">
              <p>Recipient:</p>
              {emailDetail.addresses.map((address, index) => (
                <p key={index} className="mb-1">▪ {address}</p>
              ))}
            </div>
          )}
        </div>
        <br></br>
        <p className="text-lg mx-8 text-black" style={{ textAlign: "left" }}>
            {emailDetail.body}
        </p>
      </div>
  ) : (
      <p>Retrieving your email...</p>
  )}

  <br></br>
  <br></br>

  </div>
</div>

      </main>
    </body>
    
  );
};

export default EmailDetail;
