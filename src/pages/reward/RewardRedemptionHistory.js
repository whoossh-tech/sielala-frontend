import React from "react";
import axios from "axios";
import Modal from "react-modal";

import "../../App.css";
import "../../static/css/RewardRedemptionHistory.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { useState, useEffect, useHistory } from "react";
import { NavbarOperation } from "../../components/navbar/NavbarOperation";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

const RewardRedemptionHistory = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [activePage] = useState("reward-redemption");

  const [rewardRedeemedList, setRewardRedeemedList] = useState([]);
  const [countdays, setCountDays] = useState(0);
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const dayRangeCount = Array.from({ length: countdays });
  const [search, setSearch] = useState("");
  // const [day, setDay] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mendapatkan tanggal saat ini
  const currentDate = new Date();

  // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
  const eventStartDate = new Date(eventData.find((event) => event.idEvent === selectedEvent)?.startDate);
  const eventEndDate = new Date(eventData.find((event) => event.idEvent === selectedEvent)?.endDate);
  eventEndDate.setHours(23, 59, 59, 999);

  const timeDiff = Math.abs(currentDate.getTime() - eventStartDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const formattedStartDate = new Date(eventStartDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const formattedEndDate = new Date(eventEndDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const disableRedeemRewardButton = !selectedEvent || currentDate < eventStartDate || currentDate > eventEndDate;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Pre-filled dropdown event
    const storedEvent = localStorage.getItem("idSelectedEvent");
    if (storedEvent) {
      setSelectedEvent(storedEvent);
      localStorage.removeItem("idSelectedEvent");
    }

    if (selectedEvent) {
      axios
        .get(`http://localhost:8080/api/reward/reward-redemption-history/${selectedEvent}`)
        .then((res) => {
          setRewardRedeemedList(res.data.data);
          // setCountDays(res.data.dayRange)
          // setDay(res.data.newDay);
        })
        .catch((err) => console.log(err));
    }

    axios
      .get("http://localhost:8080/api/reward/view-event-all")
      .then((res) => {
        setEventData(res.data.data);

        // if (!selectedEvent && res.data.data.length > 0) {
        //     setSelectedEvent(res.data.data[0].idEvent);
        // }
      })
      .catch((err) => console.log(err));
  }, [selectedEvent]);

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleRedeemRewardButton = () => {
    if (selectedEvent) {
      navigate(`/add-redemption-data/${selectedEvent}`);
    } else {
      toast.error("Please select event first");
    }
  };

  function formatingDate(value) {
    return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  const filterReward = () => {
    if (!search.trim()) return rewardRedeemedList;
    return rewardRedeemedList.filter((rewardRedeemed) => {
      // Memeriksa apakah eventPass, name, atau email mengandung kata kunci pencarian
      return (
        rewardRedeemed.visitor.eventPass.toLowerCase().includes(search.toLowerCase()) ||
        rewardRedeemed.visitor.name.toLowerCase().includes(search.toLowerCase()) ||
        rewardRedeemed.visitor.email.toLowerCase().includes(search.toLowerCase()) ||
        rewardRedeemed.reward.productName.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const highlightSearchText = (text) => {
    if (!search.trim()) return text;
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

  return (
    <body>
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} />
      <main style={{ marginLeft: "60px" }}>
        {/* Header Start */}
        <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "150px" }}>
          <div className="mx-8">
            <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: "left", fontSize: 50 }}>
              Reward Redemption History
            </h1>
            <div>
              <p className="subtitle">
                <a href="/dashboard" style={{ textDecoration: "none" }}>
                  <span style={{ borderBottom: "1px solid #E685AE" }}>Dashboard</span>&nbsp;
                </a>
                / Reward Redemption History
              </p>
            </div>
          </div>
        </div>
        {/* Header Ends */}
        <Toaster position="top-center" reverseOrder={false} />

        <br></br>

        {/* <div>
                <p><b>Select Event First to Manage Reward</b></p>
            </div> */}

        {!selectedEvent && <div className="text-center text-red-500 font-bold mb-4">Event is not selected, please select event on the dropdown.</div>}

        {/* <br></br> */}

        <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "400px", margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <select
              className="appearance-none px-4 py-3 w-full focus:outline-none"
              onChange={handleChange}
              value={selectedEvent}
              style={{
                backgroundColor: "#ffffff",
                color: "#333333",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                padding: "0.5rem 1rem",
                width: "400px",
              }}
            >
              <option value="">Select event</option>
              {eventData && eventData.length > 0 ? (
                eventData.map((event, index) => (
                  <option key={index} value={event.idEvent}>
                    {event.eventName}: {event.startDate}
                  </option>
                ))
              ) : (
                <option value="">No events available</option>
              )}
            </select>
            <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <br></br>

        {selectedEvent && eventData.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <p>
              <b>Current Event Day:</b>
            </p>

            {currentDate.getTime() < eventStartDate.getTime() ? (
              <p style={{ color: "#7D512D" }}>
                <b>Event has not started</b>
              </p>
            ) : currentDate.getTime() > eventEndDate.getTime() ? (
              <p style={{ color: "#7D512D" }}>
                <b>Event has already passed</b>
              </p>
            ) : (
              <p style={{ color: "#7D512D" }}>
                <b>Day {daysDiff}</b>
              </p>
            )}
          </div>
        )}

        {/* <div className="detail-reward">
                    <div className="each-reward">
                            <p className="reward-text-title">Current Inventory Day Status:</p>
                            <p className="reward-text">Day {day}</p>
                    </div>
                </div> */}

        {selectedEvent && eventData.length > 0 && (
          <React.Fragment>
            <div className="detail-inventory">
              {/* <div className="each-reward">
                                <p className="reward-text-title">Event:</p>
                                <p className="reward-text">{eventData.find(event => event.idEvent === selectedEvent)?.eventName}</p>
                        </div> */}
              <div className="each-inventory">
                <p className="inventory-text-title">Start Date of Event:</p>
                <p className="inventory-text">{formattedStartDate}</p>
              </div>
              <div className="each-inventory">
                <p className="inventory-text-title">End Date of Event:</p>
                <p className="inventory-text">{formattedEndDate}</p>
              </div>
            </div>

            <div className="search-and-button-container">
              <div className="button-container">
                <button className="button-pink" onClick={handleRedeemRewardButton} disabled={disableRedeemRewardButton}>
                  Redeem Reward
                </button>
              </div>
              <div className="search-container">
                <input
                  className="search px-4 py-3 w-full focus:outline-none"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    borderRadius: "0.375rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    padding: "0.5rem 1rem",
                    width: "300px",
                    border: "1px solid #ccc",
                  }}
                />
                <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
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
                    style={{ color: "#333333" }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        {selectedEvent && eventData.length > 0 && (
          <div className="mb-3 mx-8" style={{ display: "flex", justifyContent: "center" }}>
            <table className="reward-redemption-table">
              <thead>
                {/* Column headers */}
                <tr>
                  <th>Points</th>
                  <th>Event Pass</th>
                  <th>Visitor Name</th>
                  <th>Email</th>
                  <th>Reward</th>
                  <th>Date Redeemed</th>
                </tr>
              </thead>
              <tbody>
                {rewardRedeemedList && rewardRedeemedList.length > 0 ? (
                  filterReward().map((rewardRedeemed, i) => (
                    <tr key={i}>
                      <td>{rewardRedeemed.pointsRedeemed}</td>
                      <td>{highlightSearchText(rewardRedeemed.visitor.eventPass)}</td>
                      <td>{highlightSearchText(rewardRedeemed.visitor.name)}</td>
                      <td>{highlightSearchText(rewardRedeemed.visitor.email)}</td>
                      <td>
                        {rewardRedeemed.reward.productName} {rewardRedeemed.reward.brandName}
                      </td>
                      <td>{formatingDate(rewardRedeemed.redeemDate)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Reward Redemption History is empty</td>
                  </tr>
                )}
              </tbody>
              {search.trim() && filterReward().length === 0 && (
                <tr>
                  <td colSpan="12">No Reward Redeemed match the search criteria</td>
                </tr>
              )}
            </table>
          </div>
        )}
        <br></br>
      </main>
    </body>
  );
};

export default RewardRedemptionHistory;
