import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/sponsor/CreateSponsor.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { toast, Toaster } from "react-hot-toast";

const CreateSponsor = () => {
  const [picName, setPicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreateSponsor = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      openModal(); // Open the modal if the form is valid
    } else {
      console.log("Form validation failed");
    }
  };

  const confirmCreateSponsor = async () => {
    closeModal();
    // Perform API call to Add Sponsor
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.post("http://localhost:8080/api/sponsor/create", {
        picName,
        companyName,
        companyAddress,
        companyEmail,
      });
      console.log("Sponsor created successfully:", response.data);
      navigate("/Sponsor");

      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success("Sponsor added successfully");
    } catch (error) {
      console.error("Error creating sponsor:", error);
      toast.error("Cannot creating sponsor")
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!companyName.trim()) {
      newErrors.company_name = "Company Name cannot be empty";
    }

    if (!companyAddress.trim()) {
      newErrors.company_address = "Company Address cannot be empty";
    }

    if (!picName.trim()) {
      newErrors.pic_name = "PIC Name cannot be empty";
    }

    if (!companyEmail.trim()) {
      newErrors.company_email = "Company Email cannot be empty";
    } else if (!/^\S+@\S+$/i.test(companyEmail)) {
      newErrors.company_email = "Email is not valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      <NavbarPartnership />

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Add Sponsor</h1>
              <div>
                  <p className="subtitle">Add sponsor data here</p>
              </div>
          </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <br></br>

      <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full text-neutral-100 bg-white rounded-2xl shadow-lg" onSubmit={(e) => onCreateSponsor(e)}>
        <div className="flex flex-col items-stretch space-y-4 mt-3 w-full">
          {/* Company name */}
          <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="company_name">
              Company Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.company_name && "border-danger"}`}>
              <input id="company_name" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Lala Market" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            {errors.company_name && <span className="mt-0.5 text-danger text-xs">{errors.company_name}</span>}
          </div>

          {/* PIC name */}
          <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="pic_name">
              PIC Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.pic_name && "border-danger"}`}>
              <input id="pic_name" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Amanda Maretha" value={picName} onChange={(e) => setPicName(e.target.value)} />
            </div>

            {errors.pic_name && <span className="mt-0.5 text-danger text-xs">{errors.pic_name}</span>}
          </div>

          {/* Company Address */}
          <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="company_address">
              Company Address<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.company_address && "border-danger"}`}>
              <input id="company_address" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Kemang Raya No. 12" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
            </div>

            {errors.company_address && <span className="mt-0.5 text-danger text-xs">{errors.company_address}</span>}
          </div>

          {/* Company Email */}
          <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="company_email">
              Company Email<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.company_email && "border-danger"}`}>
              <input id="company_email" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. amanda@lalamarket.com" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
            </div>

            {errors.company_email && <span className="mt-0.5 text-danger text-xs">{errors.company_email}</span>}
          </div>

          <br></br>

          <div className="input-form flex flex-col space-y-1">
            <button
              className="button-pink montserrat w-full" // Add 'w-full' class to make the button full width
              type="submit"
            >
              Add
            </button>
          </div>

          {/* <button
                className="button-pink montserrat"
                type="submit"
            >
                Create
            </button> */}

          <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Add Sponsor</h2>
            <p className="text-center text-gray-700">Are you sure you want to Add Sponsor?</p>
            <br></br>
            <button className="button-green text-center" onClick={confirmCreateSponsor}>
              Confirm
            </button>
            <button className="button-pink text-center" onClick={closeModal}>
              Cancel
            </button>
          </Modal>

          <br></br>
        </div>
      </form>
    </main>
  );
};

export default CreateSponsor;