import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import backgroundPhoto from "../../assets/bg-cover.png";
import "../../static/css/Visitor.css";
import { Link } from 'react-router-dom';

const Visitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState("");
  const [countDays, setCountDays] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [day, setDay] = useState(0);
  const [checkedState, setCheckedState] = useState([]);

  const role = localStorage.getItem('role');

  // Mendapatkan tanggal saat ini
  const currentDate = new Date();

  // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
  const eventStartDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.startDate);
  const eventEndDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.endDate);
  eventEndDate.setHours(23,59,59,999);

  const timeDiff = Math.abs(currentDate.getTime() - eventStartDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const formattedStartDate = new Date(eventStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedEndDate = new Date(eventEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {

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
          setDay(daysDiff);
        }).catch(err =>
          console.log(err)

        )
    }

    axios.get('http://localhost:8080/api/visitor/view-event-all')
      .then(res => {
        setEventData(res.data.data)

        if (!selectedEvent && res.data.data.length > 0) {
          setSelectedEvent(res.data.data[0].idEvent);
        }
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
    const selectedValue = e.target.value;
    if (selectedValue === "Select event") {
      setSelectedEvent(""); // Reset selectedEvent to empty string
    } else {
      setSelectedEvent(selectedValue);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      axios.get(`http://localhost:8080/api/visitor/attendance/${selectedEvent}`)
        .then(res => {
          setAttendanceData(res.data);
          // console.log(res.data);
          console.log('Attendance Data:', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedEvent]);

  function markAttendance(attendanceId, attended) {
    axios
      .put(`http://localhost:8080/api/visitor/attendance/update/${attendanceId}`, {
        attended: attended,
      })
      .then(res => {
        const updatedAttendanceData = attendanceData.data.map(att => {
          if (att.id === attendanceId) {
            return { ...att, attended: attended };
          } else {
            return att;
          }
        });

        setAttendanceData({ data: updatedAttendanceData });

        console.log(res.data);
      })
      .catch(error => {
        console.error('Error marking attendance:', error);
      });
  }

  useEffect(() => {
    if (selectedEvent && attendanceData.data) {
      const initialCheckedState = attendanceData.data.map(record => ({
        id: record.id,
        checked: record.attended
      }));
      setCheckedState(initialCheckedState);
    }
  }, [selectedEvent, attendanceData.data]);

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      {/* navigation bar */}
      {(role === 'BISDEV') && (
        <NavbarBisdev style={{ zIndex: 999 }} />
      )}

      {(role === 'ADMIN') && (
        <NavbarAdmin style={{ zIndex: 999 }} />
      )}
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

      <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '350px', margin: '0 auto' }}>
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
              width: '350px',
            }}
          >
            <option disabled>Select event</option>
            {eventData && eventData.length > 0 ?
              (eventData.map((event, index) => (
                <option key={index} value={event.idEvent}>{event.eventName}: {event.startDate}</option>
              ))) : (
                <option value="">No events available</option>
              )
            }
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
      </div>

      <br></br>

      {selectedEvent && eventData.length > 0 && (
        <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '350px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <input
              className="search px-4 py-3 w-full focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: '#ffffff',
                color: '#333333',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                padding: '0.5rem 1rem',
                width: '350px',
                paddingRight: '40px',
              }}
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
                className="feather feather-search"
                style={{ color: '#333333' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>
      )}


      <br></br>

      {selectedEvent && eventData.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {currentDate < eventStartDate ? (
            <React.Fragment>
              <p>
                <b>Current Event Day:</b>
              </p>
              <p style={{ color: '#7D512D' }}>
                <b>Event has not started</b>
              </p>
            </React.Fragment>
          ) : currentDate > eventEndDate ? (
            <React.Fragment>
              <p>
                <b>Current Event Day:</b>
              </p>
              <p style={{ color: '#7D512D' }}>
                <b>Event has already passed</b>
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>
                <b>Current Event Day:</b>
              </p>
              <p style={{ color: '#7D512D' }}>
                <b>Day {daysDiff}</b>
              </p>
            </React.Fragment>
          )}
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
              {/* Row headers  */}
              <tr>
                <th style={{ borderRight: '1px solid #E3E2E6' }} colSpan="4"> VISITOR </th>
                <th style={{ borderRight: '1px solid #E3E2E6' }} colSpan={countDays}> ATTENDANCE</th>
              </tr>
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
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterVisitors().map((visitor, visitorIndex) => (
                <tr key={visitorIndex}>
                  <td>
                    <Link to={`/visitor/detail/${visitor.idVisitor}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                    {highlightSearchText(visitor.eventPass)}
                    </Link>
                  </td>
                  <td>{highlightSearchText(visitor.name)}</td>
                  <td>{highlightSearchText(visitor.email)}</td>
                  <td>{highlightSearchText(visitor.telephone)}</td>
                  {[...Array(countDays)].map((_, dayIndex) => {
                    let attendanceRecord = attendanceData.data?.find(
                      record =>
                        record.id_visitor === visitor.idVisitor &&
                        record.day === dayIndex + 1
                    );

                    const checkboxId = `checkbox_${visitor.idVisitor}_${dayIndex + 1}`;

                    const isChecked = attendanceRecord ? attendanceRecord.attended : false;

                    const disableColumns = dayIndex + 1 != day;

                    console.log('Attendance Record:', attendanceRecord);
                    // console.log('Checked State Record:', checkedStateRecord);
                    console.log('Is Checked:', isChecked);

                    return (
                      <td key={dayIndex} style={{ borderRight: '1px solid #E3E2E6' }}>
                        <input
                          type="checkbox"
                          id={checkboxId}
                          checked={isChecked}
                          disabled={disableColumns}
                          onChange={(e) => {
                            if (attendanceRecord) {
                              markAttendance(attendanceRecord.id, e.target.checked);
                            } else {
                              console.error('Attendance record not found');
                            }
                          }}
                        />
                      </td>
                    );
                  })}

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