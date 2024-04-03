import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import backgroundPhoto from "../../assets/bg-cover.png";
import "../../static/css/Visitor.css";

const Visitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState("");
  const [countDays, setCountDays] = useState(0);
  const dayRangeCount = Array.from({ length: countDays });
  const [attendanceData, setAttendanceData] = useState([]);
  const [day, setDay] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

    // Mendapatkan tanggal saat ini
    const currentDate = new Date();
    
    // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
    const eventStartDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.startDate);
    const eventEndDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.endDate);

    const formattedStartDate = new Date(eventStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedEndDate = new Date(eventEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const disableCheckbox = !selectedEvent || currentDate < eventStartDate || currentDate > eventEndDate || currentDate === eventEndDate;

    // const disableAddRewardButton = !selectedEvent

    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {

        // Pre-filled dropdown event
        const storedEvent = localStorage.getItem('idSelectedEvent');
        if (storedEvent) {
            setSelectedEvent(storedEvent);
            localStorage.removeItem('idSelectedEvent'); 
        }

        if (selectedEvent) {
            axios.get(`http://localhost:8080/api/visitor/view-all/${selectedEvent}`)
            .then(res => {
                setVisitors(res.data.data)
                setCountDays(res.data.dayRange)
                setDay(res.data.newDay);
            }).catch(err => 
                console.log(err)
                
                )
        }

        axios.get('http://localhost:8080/api/visitor/view-event-all')
            .then(res => {
                setEventData(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )
    }, [selectedEvent])

    const filterVisitors = () => {
      if (!search.trim()) return visitors;
      return visitors.filter((visitor) =>
        Object.values(visitor).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      );
    };
  
    const highlightSearchText = (text) => {
      const parts = text.split(new RegExp(`(${search})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span key={index} className="highlighted-text">
            {part}
          </span>
        ) : (
          part
        )
      );
    };


    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    useEffect(() => {
      if (selectedEvent) {
          axios.get(`http://localhost:8080/api/visitor/attendance/${selectedEvent}`)
              .then(res => {
                  setAttendanceData(res.data);
                  console.log(res.data);
              })
              .catch(err => {
                  console.log(err);
              });
      }
  }, [selectedEvent]);

    function markAttendance(attendanceId, attended) {
    
      axios.put(`http://localhost:8080/api/visitor/attendance/${attendanceId}`, {
        attended: attended,
      })
      .then(res => {
        // Handle success response if needed
        console.log(res.data);
      })
      .catch(error => {
        // Handle error response
        console.error('Error marking attendance:', error);
      });
    }

    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarPartnership style={{ zIndex: 999 }}/>

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Visitor Management</h1>
                    <div>
                            <p className="subtitle">Manage and view visitors data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <br></br>

            {(!selectedEvent) && (
                <div className="text-center text-red-500 font-bold mb-4">
                    Event is not selected, please select event on the dropdown.
                </div>
            )}

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '300px', margin: '0 auto' }}>
                <div style={{ position: 'relative' }}>
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
                        {eventData && eventData.length > 0 ? 
                            (eventData.map((event, index) => (
                                <option key={index} value={event.idEvent}>{event.eventName}: {event.startDate}</option>
                            ))) : (
                                <option value="">No events available</option>
                            )
                        }
                    </select>

                    <input
                      className="search"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

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
            </div>
            
            <br></br>

            {selectedEvent && eventData.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <p>
                        <b>Current Event Day:</b>
                      </p>
                      <p style={{ color: '#7D512D' }}>
                        <b>Day {day}</b>
                      </p>
                    </div>
            )}

            {(selectedEvent && eventData.length > 0) && (
                
                <div className="detail-inventory">
                    <div className="each-inventory">
                            <p className="inventory-text-title">Start Date of Event:</p>
                            <p className="inventory-text">{formattedStartDate}</p>
                    </div>
                    <div className="each-inventory">
                            <p className="inventory-text-title">End Date of Event:</p>
                            <p className="inventory-text">{formattedEndDate}</p>
                    </div>
                </div>
            )}

            {(selectedEvent && eventData.length > 0) && (
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            {/* Row headers */}
                            {/* <tr>
                                <th style={{borderRight: '1px solid #E3E2E6'}}colSpan="3"> ATTENDANCE</th>
                            </tr> */}
                        </thead>
                        <thead>
                            {/* Column headers */}
                            <tr>
                                <th>Event Pass</th>
                                <th>Name</th>
                                <th>Email</th> 
                                <th>Telephone No.</th>
                                {[...Array(countDays)].map((_, index) => (
                                <React.Fragment key={index}>
                                  <th style={{ borderRight: '1px solid #E3E2E6' }}>Day {index + 1}</th>
                                  {/* <th style={{ borderRight: '1px solid #E3E2E6' }}>Attendance</th> */}
                                </React.Fragment>
                              ))}
                            </tr>
                        </thead>
                        <tbody>
                          {filterVisitors().map((visitor, visitorIndex) => (
                            <tr key={visitorIndex}>
                              <td>{highlightSearchText(visitor.eventPass)}</td>
                              <td>{highlightSearchText(visitor.name)}</td>
                              <td>{highlightSearchText(visitor.email)}</td>
                              <td>{highlightSearchText(visitor.telephone)}</td>
                              {[...Array(countDays)].map((_, dayIndex) => (
                                <React.Fragment key={dayIndex}>
                                  <td>
                                  <input
                                    type="checkbox"
                                    disabled={disableCheckbox}
                                    checked={(attendanceData || []).find(att => att.day === dayIndex)?.attended || false}
                                    onChange={(e) => {
                                        const newCheckedValue = e.target.checked;
                                        if (newCheckedValue !== ((attendanceData || []).find(att => att.day === dayIndex) || {}).attended) {
                                            markAttendance(visitor.id, dayIndex, newCheckedValue);
                                        }
                                    }}
                                  />
                                  </td>
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                          {filterVisitors().length === 0 && (
                            <tr>
                              <td colSpan="4">No visitors match the search criteria</td>
                            </tr>
                          )}
                        </tbody>
                    </table>
                </div>
            )}
            <br></br>
        </div>
        
    );
}
 
export default Visitor;