import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/event/CreateEvent.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { toast, Toaster } from "react-hot-toast";
import { subDays, format } from "date-fns";


const EditEvent = () => {
    const { idEvent } = useParams();
    const url = 'http://localhost:8080';
    const navigate = useNavigate();

    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get(`${url}/api/event/detail/${idEvent}`);
                const eventData = response.data.data;
                console.log(eventData);

                setEventName(eventData.eventName);
                setLocation(eventData.location);
                setStartDate(new Date(eventData.startDate));
                setEndDate(new Date(eventData.endDate));
        
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!eventName.trim()) {
            newErrors.event_name = "Event Name cannot be empty";
        }

        if (!location.trim()) {
            newErrors.event_location = "Event location cannot be empty";
        }

        if (endDate <= startDate) {
            newErrors.end_date = "End Date must be greater than Start Date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onEditEvent = async (e) => {
        e.preventDefault();

        console.log(format(startDate, 'dd/MM/yyyy'));
        console.log(format(endDate, 'dd/MM/yyyy'));

        if (validateForm()) {
            openModal(); 
        } else {
            console.log("Form validation failed");
        }
    };

    const confirmEditEvent = async () => {
        closeModal();

        try {
            const response = await axios.put(`${url}/api/event/edit/${idEvent}`, {
                eventName,
                startDate,
                endDate,
                location,
            });
            console.log("Event edited successfully:", response.data);
            navigate("/Event");

            await new Promise((resolve) => setTimeout(resolve, 500))
            toast.success("Event edited successfully");
        } catch (error) {
            console.error("Error editing event:", error);
            toast.error("Cannot edit event");
        }
    };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    //     if (date <= startDate) {
    //         setError("End Date must be greater than Start Date");
    //     } else {
    //         setError("");
    //     }
    // };

  return (
    <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      <NavbarBisdev style={{ zIndex: 20 }}  />

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Edit Event</h1>
              <div>
                  <p className="subtitle">Edit your event here</p>
              </div>
          </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <br></br>

      <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full text-neutral-100 bg-white rounded-2xl shadow-lg" onSubmit={(e) => onEditEvent(e)}>
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
                className="px-4 py-3 w-full focus:outline-none" />

            {/* Error message */}
            {errors.end_date && <span className="mt-0.5 text-danger text-xs">{errors.end_date}</span>}
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

          <div className="input-form flex flex-col space-y-1">
            <button
              className="button-pink montserrat w-full" // Add 'w-full' class to make the button full width
              type="submit"
            >
              Edit
            </button>
          </div>

          <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Edit Event</h2>
            <p className="text-center text-gray-700">Are you sure you want to edit event?</p>
            <br></br>
            <button className="button-green text-center" onClick={confirmEditEvent}>
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

export default EditEvent;
