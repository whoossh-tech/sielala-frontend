import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import "../../static/css/email/Emails.css";
import Sidebar from "../dashboard/Sidebar";

const Emails = () => {
  const [emails, setEmails] = useState([]);
  const [activePage, setActivePage] = useState("bulk-email");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/email/retrieve-all")
      .then((res) => {
        setEmails(res.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch emails");
      });
  }, [emails]);

  const handleCreateButton = () => {
    navigate("/email/write");
  };

  return (
    <body>
      <Sidebar activePage={activePage} />
      <main style={{ marginLeft: "60px" }}>
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
          {/* Header Start */}
          <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "150px" }}>
            <div className="mx-8">
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: "left", fontSize: 50 }}>
                Bulk Email Management
              </h1>
              <div>
                <p className="subtitle">
                  <a href="/dashboard" style={{ textDecoration: "none" }}>
                    <span style={{ borderBottom: "1px solid #E685AE" }}>Dashboard</span>&nbsp;
                  </a>
                  / Bulk Email Management
                </p>
              </div>
            </div>
          </div>
          {/* Header Ends */}

          <br></br>

          <div className="button-field">
            <button className="button-pink" onClick={handleCreateButton}>
              + Write Mail
            </button>
          </div>

          <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
            <table className="email-table mx-8 mb-10">
              <tbody>
                {emails && emails.length > 0 ? (
                  emails.map((email, i) => (
                    <tr key={i}>
                      <td style={{ width: "22%", textAlign: "left", verticalAlign: "top" }} className="text-primary-80">
                        <b>To: {email.addresses.join(", ").substring(0, 40)}...</b>
                      </td>
                      <td style={{ width: "2%", textAlign: "left", verticalAlign: "top" }} className="text-neutral-60">
                        {email.addresses.length}
                      </td>
                      <td style={{ width: "66%", textAlign: "left", verticalAlign: "top" }} className="text-neutral-60">
                        <Link to={`/email/${email.idEmail}`} style={{ fontWeight: "bold" }} className="text-lg text-black">
                          {email.subject}
                        </Link>
                        <br></br>
                        <br></br>
                        {email.body.substring(0, 300)}...
                      </td>
                      <td style={{ width: "10%", textAlign: "left", verticalAlign: "top", fontWeight: "bold" }} className="text-tertiary-60">
                        {email.dateFormatted}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No email sent</td>
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

export default Emails;
