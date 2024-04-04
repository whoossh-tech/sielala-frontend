import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../static/css/Button.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";

const CreateEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const validateForm = () => {
    const newErrors = {};

    if (!subject.trim()) {
      newErrors.subject = "Mail subject cannot be empty";
    }

    if (!body.trim()) {
      newErrors.body = "Mail body cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {

        localStorage.setItem('subject', subject);
        localStorage.setItem('body', body);

        navigate("/email/choose-contact")

    } else {
        console.log("Form validation failed");
    }
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  useEffect (() => {

    // Pre-filled
    const storedSubject = localStorage.getItem('subject');
    const storedBody = localStorage.getItem('body');

    if (storedSubject && !subject) {
      setSubject(storedSubject);
      localStorage.removeItem('subject');
    }

    if (storedBody && !body) {
      setBody(storedBody);
      localStorage.removeItem('body');
    }
  })

  return (
    <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>

      {/* navigation bar */}
      {( role === 'BISDEV' ) && (
        <NavbarBisdev style={{ zIndex: 999 }} />
      )}

      {( role === 'PARTNERSHIP' ) && (
        <NavbarPartnership style={{ zIndex: 999 }} />
      )}

      {( role === 'ADMIN' ) && (
        <NavbarAdmin style={{ zIndex: 999 }} />
      )}

      {/* header */}
      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Send Bulk Email</h1>
              <div>
                  <p className="subtitle">Write your email here</p>
              </div>
          </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {/* write email form */}
      <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full text-neutral-100 bg-white rounded-2xl shadow-lg" onSubmit={(e) => sendEmail(e)}>
        <div className="flex flex-col items-stretch space-y-4 mt-3 w-full mx-10">

          {/* Subject */}
          <div className="flex flex-col space-y-1"
            style={{ marginLeft: 70, marginRight: 70 }}
          >
            <label className="input-label font-reynaldo text-left" htmlFor="subject">
              Subject<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.subject && "border-danger"}`}>
              <input id="subject" className="px-4 py-3 w-full focus:outline-none" placeholder="Email subject..." value={subject} onChange={handleChangeSubject} />
            </div>

            {errors.subject && <span className="mt-0.5 text-danger text-xs">{errors.subject}</span>}
          </div>

          {/* Body */}
          <div className="flex flex-col space-y-1"
            style={{ marginLeft: 70, marginRight: 70 }}
          >
            <label className="input-label font-reynaldo text-left" htmlFor="body">
              Body<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.body && "border-danger"}`}>
              <textarea id="body" 
                className="px-4 py-3 w-full h-40 focus:outline-none" 
                placeholder="Email body..." 
                value={body} 
                onChange={handleChangeBody} 
                style={{ height: 300 }}
              />
            </div>

            {errors.body && <span className="mt-0.5 text-danger text-xs">{errors.body}</span>}
          </div>

          <br></br>

          <div className="button-list"
            style={{ marginLeft: 0 }}
          >
            <button
                className="button-pink"
                type="submit"
            >
                Send To
            </button>
          </div>

          <br></br>
        </div>
      </form>
    </main>
  );
};

export default CreateEmail;
