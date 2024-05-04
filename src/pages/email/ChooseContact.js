import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../static/css/Modal.css";
import Modal from 'react-modal';
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import Sidebar from '../dashboard/Sidebar';

const ChooseContact = () => {
    const [contacts, setContacts] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [activePage, setActivePage] = useState('bulk-email');

    const [selectedContact, setSelectedContact] = useState([]);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {

        // Pre-filled
        const storedSubject = localStorage.getItem('subject');
        const storedBody = localStorage.getItem('body');
        const storedEvent = localStorage.getItem('idSelectedEvent');
        const storedSelectedContacts = JSON.parse(localStorage.getItem('selectedContacts'));

        if (storedSubject) {
            setSubject(storedSubject);
            localStorage.removeItem('subject'); 
        }

        if (storedBody) {
            setBody(storedBody);
            localStorage.removeItem('body'); 
        }

        if (storedEvent) {
            setSelectedEvent(storedEvent);
            localStorage.removeItem('idSelectedEvent'); 
        }

        if (storedSelectedContacts) {
          setSelectedContact(storedSelectedContacts);
          localStorage.removeItem('selectedContacts');
        }

        if (selectedEvent) {
            axios
            .get(`https://sielala-backend-production.up.railway.app/api/email/contacts/${selectedEvent}`)
            .then((res) => {
                setContacts(res.data.data);
                // console.log(res.data.data);
            })
            .catch((error) => {
                toast.error("Failed to fetch contacts");
            });
        }

        axios
          .get("https://sielala-backend-production.up.railway.app/api/event/view-all")
          .then((res) => {
            setEventData(res.data.data);
          })
          .catch((err) => console.log(err));

    }, [selectedEvent]);

    // handle selected event (dropdown)
    const handleChange = (e) => {
      setSelectedEvent(e.target.value);
    };

    // handle checked & unchecked box
    const handleCheckboxChange = (e, contactId) => {
      console.log("contact id: " + contactId);

      if (e.target.checked) {
        setSelectedContact([...selectedContact, contactId]);
      } else {
        setSelectedContact(selectedContact.filter(id => id !== contactId));
      }

      localStorage.setItem('selectedContacts', JSON.stringify(selectedContact));
    };

    const handleSelectAll = () => {
      
      if (contacts && contacts.length > 0) {
        setSelectAll(!selectAll);
        if (!selectAll) {
          setSelectedContact(contacts.map(contact => contact.idContact));
        } else {
          setSelectedContact([]);
        }
      } else if (!selectedEvent) {
        toast.error("Select event first!")
      } else {
        toast.error("Choose event with contact")
      }
    };

    // handle back button
    const handleBackButton = () => {
      localStorage.setItem('subject', subject);
      localStorage.setItem('body', body);
      navigate(-1);
    };

    const validateForm = () => {
      const newErrors = {};
  
      if (!selectedContact || selectedContact.length === 0) {
          newErrors.selected_contact = "Please select at least one contact";
          toast.error("Please select at least one contact")
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const sendEmailConfirmation = async (e) => {
      e.preventDefault();
      
      if (validateForm()) {
          openModal();
      } else {
          console.log("Form validation failed");
      }
    };
  
    const handleSendEmail = async () => {
      closeModal();
      setIsLoading(true);
      
      try {
        const response = await axios.post('https://sielala-backend-production.up.railway.app/api/email/send', {
            subject,
            body,
            contacts: selectedContact
        })

        console.log('Email sent successfully:', response.data);
        toast.success('Email successfully sent')

        localStorage.removeItem('subject'); 
        localStorage.removeItem('body');
        localStorage.removeItem('idSelectedEvent');  
        localStorage.removeItem('selectedContacts');  

        navigate("/email")

      } catch (error) {
          console.error('Error sending email:', error.response || error.message);
          console.log(subject);
          console.log(body);
          console.log(selectedContact);
          setErrors('Error sending email');

      } finally {
          setIsLoading(false); // Reset loading state
      }
    }

    const handleBack = () => {
      navigate(-1);
    };

    const handleBackEmailList = () => {
      navigate(-2);
    };

    return (
      <body>
        <Sidebar activePage={activePage}/>
        <main style={{marginLeft: "60px"}}>
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
    
          <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
              <div className="mx-8">
                  <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                  Email Contact</h1>
              </div>
              <div>
                    <p className="subtitle">
                    <a href='/dashboard' style={{ textDecoration: 'none' }}> <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp; </a> /
                        <a onClick={handleBackEmailList} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Bulk Email List </a> /
                        <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Create Bulk Email </a> / Choose Email Contact
                    </p>
                </div>
          </div>
          {/* Header Ends */}
        
            <Toaster position="top-center" reverseOrder={false} />

            <br></br>

            <div className="button-field">
              <button className="button-grey" 
                onClick={handleBackButton}
                disabled={isLoading}
              >
                Back
              </button>
              <button
                className="button-pink montserrat"
                type="submit"
                disabled={isLoading}
                onClick={sendEmailConfirmation}
              >
                  {isLoading ? 'Sending...' : 'Send Email'}
              </button>
              <button className="button-brown" onClick={handleSelectAll}>
                {selectAll ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div style={{marginBottom: '10px'}}>
              <p><b>Contacts to be sent: {selectedContact.length}</b></p>
            </div>
        
            {(!selectedEvent) && (
                <div className="text-center text-red-500 font-bold mb-4">
                    Event is not selected, please select event on the dropdown.
                </div>
            )}
        
            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "200px", margin: "0 auto" }}>
                <select
                className="appearance-none px-4 py-3 w-full focus:outline-none"
                onChange={handleChange}
                value={selectedEvent}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#333333',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  padding: '0.5rem 1rem',
                  width: '300px',
                }}
                >
                  <option>select event</option>
                  {eventData && eventData.length > 0 ? (
                      eventData.map((event, index) => (
                      <option key={index} value={event.idEvent}>
                          {event.eventName}
                      </option>
                      ))
                  ) : (
                      <option value="">No events available</option>
                  )}
                </select>
                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="24" 
                        height="24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-chevron-down"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
        
            <br></br>
        
            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                {selectedEvent ? (
                <table className="event-table mx-8">
                    
                    <thead>
                        <tr>
                            <th style={{ width: "10%", textAlign: "center" }}></th>
                            <th style={{ width: "18%", textAlign: "center" }}>Name</th>
                            <th style={{ width: "18%", textAlign: "center" }}>PIC Name</th>
                            <th style={{ width: "18%", textAlign: "center" }}>Email</th>
                            <th style={{ width: "18%", textAlign: "center" }}>Telephone</th>
                            <th style={{ width: "18%", textAlign: "center" }}>Contact Type</th>
                        </tr>
                    </thead>
        
                    <tbody>
                    {contacts && contacts.length > 0 ? (
                        contacts.map((contact, i) => (
                        <tr key={i}>
                          <td>
                            <input 
                              type="checkbox" 
                              id={`checkbox-${i}`} 
                              name={`checkbox-${i}`} 
                              onChange={(e) => handleCheckboxChange(e, contact.idContact)}
                              checked={selectedContact.includes(contact.idContact)}
                            />
                          </td>
                          <td>{contact.name}</td>
                          <td>{contact.picName}</td>
                          <td>{contact.email}</td>
                          <td>{contact.telephone}</td>

                          { contact.type === 'Tenant' && (
                              <td className="text-secondary-80"><b>Tenant</b></td>
                          )}

                          { contact.type === 'Sponsor' && (
                              <td className="text-tertiary-80"><b>Sponsor</b></td>
                          )}

                        </tr>
                        ))

                    ) : (
                        <tr>
                          <td colSpan="6">No contacts available</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                ) : (
                <div className="text-center">Please select an event to view contact</div>
                )}

              <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  id="modal-confirmation-form"
              >
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                  <p className="text-center text-gray-700">Are you sure you want to send the email?</p>
                  <br></br>
                  <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                  <button className="button-green text-center" onClick={handleSendEmail}>Confirm</button>
              </Modal>

            </div>

            <br></br>
            <br></br>

        </div>

        </main>
      </body>
        
    );      
}

export default ChooseContact;