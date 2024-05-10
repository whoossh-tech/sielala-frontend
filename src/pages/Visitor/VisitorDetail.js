import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../static/css/Button.css";
import '../../static/css/TenantRegistrationForm.css';
import '../../static/css/TenantApplicantDetail.css';
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { useParams } from "react-router-dom";
import Sidebar from '../dashboard/Sidebar';

const VisitorDetail = () => {
  const navigate = useNavigate();
  const { idVisitor } = useParams();
  const [visitor, setVisitor] = useState();
  const role = localStorage.getItem('role');
  const [activePage, setActivePage] = useState('visitor');
  const [idEvent, setIdEvent] = useState();

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/visitor/detail/${idVisitor}`)
      .then((res) => {
        setVisitor(res.data.visitorData);
        console.log(res.data.visitorData);
        setIdEvent(res.data.visitorData.event.idEvent);
      })
      .catch((err) => console.log(err));

      localStorage.setItem('idSelectedEvent', idEvent);
  });

  const handleBack = () => {
    localStorage.setItem('idSelectedEvent', visitor.event.idEvent);
    navigate(-1);
  };

  return (
    <body>
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage}/>

      <main style={{ marginLeft: "60px" }}>

          {/* Header Start */}
          <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
              <div className="mx-8">
                  <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                  Visitor Detail</h1>
              </div>
              <div>
                    <p className="subtitle">
                        <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> / 
                        <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Visitor List </a>
                        / Detail
                    </p>
                </div>
          </div>
          {/* Header Ends */}

          <div className='content-container my-4'>
            <div>

        <br></br>

        <br></br>
        <h1 style={{ textAlign: "left", marginLeft: 90, fontSize:35 }}><strong>{visitor?.eventPass}</strong></h1>

        <div className="container mx-auto text-left">

        <div style={{ alignContent: "center", paddingLeft: "50px", paddingRight: "50px" }} className="mx-8">
            <table style={{ borderCollapse: "collapse", width: "100%", alignItems: "center", borderRadius: "15px", overflow: "hidden" }}>
                <tbody>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", width: "10%", textAlign: "left" }}>Name :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20, width: "30%" }}><strong>{visitor?.name}</strong></td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Event Pass :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{visitor?.eventPass}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Email :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{visitor?.email}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Telephone :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>+62 {visitor?.telephone}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Age :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{visitor?.age}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Gender :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{visitor?.gender}</td>
                    </tr>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", textAlign: "left" }}>Location :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20 }}>{visitor?.location}</td>
                    </tr>

                </tbody>
            </table>
            
            </div>

            {/* <div className="text-center">
                <button className="button-pink" onClick={handleBack}>
                    Back
                </button>     
            </div> */}
        </div>
    </div>
    </div>
    </main>
    </body>
  );
};

export default VisitorDetail;
