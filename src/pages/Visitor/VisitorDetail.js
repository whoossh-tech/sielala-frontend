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

const VisitorDetail = () => {
  const navigate = useNavigate();
  const { idVisitor } = useParams();
  const [visitor, setVisitor] = useState();
  const role = localStorage.getItem('role');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/visitor/detail/${idVisitor}`)
      .then((res) => {
        setVisitor(res.data.visitorData);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  });

  const handleBack = () => {
    localStorage.setItem('idSelectedEvent', visitor.event.idEvent);
    navigate(-1);
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
        {(role === 'BISDEV') && (
        <NavbarBisdev style={{ zIndex: 999 }} />
      )}

      {(role === 'ADMIN') && (
        <NavbarAdmin style={{ zIndex: 999 }} />
      )}

        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
            <div>
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                Visitor Detail</h1>
                {/* <div>
                    <p className="subtitle">Manage and view tenant applicant data here.</p>
                </div> */}
                <div>
                    <p className="subtitle">
                        <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> / 
                        <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Visitor List </a>
                        / Detail
                    </p>
                </div>
            </div>
        </div>

        <br></br>

        <br></br>
        {/* <h1 style={{ textAlign: "left", marginLeft: 120 }}>{tenantApplicant?.brandName}</h1> */}

        <div className="container mx-auto text-left">
            <table style={{ marginLeft: 80, marginRight: 80, borderCollapse: "collapse", width: 1100, alignItems: "center" }}>
                <tbody>
                    <tr>
                        <td className="text-tertiary-90" style={{ fontWeight: "bold", backgroundColor: "#E685AE", color: "white", width: "10%", textAlign: "left" }}>Name :</td>
                        <td style={{ color: "black", textAlign: "left", marginLeft: 20, width: "30%" }}>{visitor?.name}</td>
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

            
            <div className="button-list">
                <button className="button-pink" onClick={handleBack}>
                    Back
                </button>     
            </div>
        
        </div>
    </div>
  );
};

export default VisitorDetail;
