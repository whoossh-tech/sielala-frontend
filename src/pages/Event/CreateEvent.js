import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/event/CreateEvent.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { subDays } from "date-fns";
import Sidebar from '../../pages/dashboard/Sidebar';
import '../../static/css/Style.css';


const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [description, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [activePage, setActivePage] = useState('event');

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!eventName.trim()) {
      newErrors.event_name = "Event Name cannot be empty";
    }

    if (!description.trim()) {
      newErrors.description = "Event Description cannot be empty";
    }

    if (!location.trim()) {
      newErrors.event_location = "Event location cannot be empty";
    }

    if (endDate < startDate) {
      newErrors.date = "End Date must be greater than Start Date";
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCreateEvent = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      openModal(); // Open the modal if the form is valid
    } else {
      console.log("Form validation failed");
    }
  };

  const confirmCreateEvent = async () => {
    closeModal();
    // Perform API call to create event
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.post("http://localhost:8080/api/event/create", {
        eventName,
        description,
        startDate,
        endDate,
        location,
      });
      console.log("Event created successfully:", response.data);
      navigate("/Event");

      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Event created successfully")
      toast.success("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Event cannot created");
    }
  };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  //   if (date <= startDate) {
  //     setError("End Date must be greater than Start Date");
  //   } else {
  //     setError("");
  //   }
  // };

  return (
    <body>
      <Sidebar activePage={activePage}/> 

      <main style={{ marginLeft: "60px" }}>

        {/* Header Start */}
        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '130px' }}>
            <div className="mx-8">
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                Create Event</h1>
            </div>
        </div>
        {/* Header Ends */}

        <div className='content-container my-4'>
          <div className="dashboard-container"></div>
            </div>
            {/* <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none"> */}
              <style>{reynaldoStyles}</style>


              <Toaster position="top-center" reverseOrder={false} />

              <br></br>

              <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full text-neutral-100 bg-white rounded-2xl shadow-lg" onSubmit={(e) => onCreateEvent(e)}>
                <div className="flex flex-col items-stretch space-y-4 mt-3 w-full">
                  {/* Event Name */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="event_name">
                      Event Name<span className="text-danger">*</span>
                    </label>

                    <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.event_name && "border-danger"}`}>
                      <input id="event_name" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Lala Market" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>

                    {errors.event_name && <span className="mt-0.5 text-danger text-xs">{errors.event_name}</span>}
                  </div>

                  {/* Event Description */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="event_description">
                      Event Description<span className="text-danger">*</span>
                    </label>

                    <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.description && "border-danger"}`}>
                      {/* <input id="description" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Summer Bazaar of LALA MARKET is back!" value={description} onChange={(e) => setEventDescription(e.target.value)} /> */}
                      <textarea
                        id="description"
                        className="px-4 py-3 w-full h-40 focus:outline-none" // Sesuaikan tinggi textarea sesuai kebutuhan
                        placeholder="ex. Summer Bazaar of LALA MARKET is back!"
                        value={description}
                        onChange={(e) => setEventDescription(e.target.value)}
                      />
                    </div>

                    {errors.description && <span className="mt-0.5 text-danger text-xs">{errors.description}</span>}
                  </div>

                  {/* Start Date */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="start_date">
                      Start Date<span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      id="start_date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={subDays(new Date(), 0)} // Set minDate to today or later
                      className="px-4 py-3 w-full focus:outline-none"
                    />

                    {/* Error message */}
                    {errors.date && <span className="mt-0.5 text-danger text-xs">{errors.date}</span>}

                  </div>

                  {/* End Date */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="end_date">
                      End Date<span className="text-danger">*</span>
                    </label>

                    <DatePicker 
                        id="end_date" 
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)}
                        minDate={subDays(new Date(), 0)}
                        className="px-4 py-3 w-full focus:outline-none" 
                    />

                    {/* Error message */}
                    {errors.date && <span className="mt-0.5 text-danger text-xs">{errors.date}</span>}
                  </div>

                  {/* Event Location */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="event_location">
                      Event Location<span className="text-danger">*</span>
                    </label>

                    <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.event_location && "border-danger"}`}>
                      <input id="event_location" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Chillax, Sudirman" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>

                    {errors.event_location && <span className="mt-0.5 text-danger text-xs">{errors.event_location}</span>}
                  </div>

                  <br></br>

                  <div className="input-form flex flex-col space-y-1 items-center">
                    <button
                      className="button-pink montserrat w-48"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>

                  <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation-form">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Create Event</h2>
                    <p className="text-center text-gray-700">Are you sure you want to create event?</p>
                    <br></br>
                    <button className="button-red text-center" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="button-green text-center" onClick={confirmCreateEvent}>
                      Confirm
                    </button>
                  </Modal>

                  <br></br>
                </div>
              </form>
            {/* </main> */}
            
          <script src="script.js"></script>  
        </main>
    </body>

  );
};

export default CreateEvent;
