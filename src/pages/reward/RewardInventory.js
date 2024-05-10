import React from "react";
import axios from "axios";
import Modal from "react-modal";

import "../../App.css";
import "../../static/css/RewardInventory.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { useState, useEffect, useHistory } from "react";
import { NavbarOperation } from "../../components/navbar/NavbarOperation";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../dashboard/Sidebar';

const RewardInventory = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [activePage] = useState('reward-inventory');

    const [rewardData, setRewardData] = useState([]);
    const [countdays, setCountDays] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const dayRangeCount = Array.from({ length: countdays });
    const [day, setDay] = useState(0);
    const [search, setSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mendapatkan tanggal saat ini
    const currentDate = new Date();

    // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
    const eventStartDate = new Date(eventData.find((event) => event.idEvent === selectedEvent)?.startDate);
    const eventEndDate = new Date(eventData.find((event) => event.idEvent === selectedEvent)?.endDate);
    eventEndDate.setHours(23, 59, 59, 999);

    const formattedStartDate = new Date(eventStartDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const formattedEndDate = new Date(eventEndDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    const disableCarryOutStockButton = !selectedEvent || currentDate < eventStartDate || currentDate > eventEndDate || currentDate === eventEndDate;

    const disableAddRewardButton = !selectedEvent || currentDate > eventEndDate;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                .get(`http://localhost:8080/api/reward/view-all/${selectedEvent}`)
                .then((res) => {
                    console.log(res.data.data);
                    setRewardData(res.data.data);
                    setCountDays(res.data.dayRange);
                    setDay(res.data.newDay);
                })
                .catch((err) => console.log(err));
        }

        axios
            .get("http://localhost:8080/api/reward/view-event-all")
            .then((res) => {
                setEventData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, [selectedEvent]);

    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    function carryOutStock() {
        closeModal();

        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (selectedEvent) {
            axios
                .post(`http://localhost:8080/api/reward/carry-out-stock/${selectedEvent}`)
                .then((res) => {
                    setRewardData(res.data.data);
                    setCountDays(res.data.dayRange);
                    setDay(res.data.newDay);
                    toast.success("Reward Carry Out Successfully");
                })
                .catch(function (error) {
                    if (error.response.status === 400) {
                        console.log(error);
                        toast.error("Cannot carry out stock because this is the last day of event");
                    } else if (error.response.status === 404) {
                        console.log(error);
                        toast.error("Cannot carry out stock. Reward Inventory is still empty.");
                    }
                });
        }
    }

    function carryOutStockModal() {
        if (selectedEvent) {
            openModal();
        } else {
            toast.error("Please select event first");
        }
    }

    const sortedRewardData = rewardData.map((reward) => {
        const sortedListDayReward = reward.listDayReward.sort((a, b) => a.day - b.day);
        return { ...reward, listDayReward: sortedListDayReward };
    });

    const handleAddRewardButton = () => {
        if (selectedEvent) {
            navigate(`/add-reward/${selectedEvent}`);
        } else {
            toast.error("Please select event first");
        }
    };

    const filterReward = () => {
        if (!search.trim()) return rewardData;
        return rewardData.filter((reward) => Object.values(reward).some((value) => typeof value === "string" && value.toLowerCase().includes(search.toLowerCase())));
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

    return (
        <body>
            {/* Sidebar Navigation */}
            <Sidebar activePage={activePage} />
            <main style={{ marginLeft: "60px" }}>

                {/* Header Start */}
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
                    <div className="mx-8">
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                            Reward Inventory</h1>
                        <div>
                            <p className="subtitle">
                                <a href='/dashboard' style={{ textDecoration: 'none' }}>
                                    <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp;
                                </a>
                                / Reward Inventory
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
                    <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "400px", margin: "0 auto" }}>
                        <div style={{ position: "relative" }}>
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
                                    width: "400px",
                                    paddingRight: "40px",
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
                )}

                <br></br>

                {selectedEvent && eventData.length > 0 && (
                    <div style={{ marginBottom: "10px" }}>
                        <p>
                            <b>Current Inventory Day Status:</b>
                        </p>
                        <p style={{ color: "#7D512D" }}>
                            <b>Day {day}</b>
                        </p>
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
                        <div className="button-area" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="button-pink" onClick={handleAddRewardButton} disabled={disableAddRewardButton}>+ Add Reward</button>
                            <button className="button-green" onClick={carryOutStockModal} disabled={disableCarryOutStockButton}>Carry Out Stock</button>
                        </div>

                    </React.Fragment>
                )}

                <div>
                    <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation-form">
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Carry Out Stock</h2>
                        <p className="text-center text-gray-700">
                            Are you sure you want to move remaining stock from DAY {day} of event to DAY {day + 1} of event?
                        </p>
                        <br></br>
                        <button className="button-red text-center" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="button-green text-center" onClick={carryOutStock}>
                            Confirm
                        </button>
                    </Modal>
                </div>

                {selectedEvent && eventData.length > 0 && (
                    <div className="mb-3 mx-8" style={{ display: "flex", justifyContent: "center" }}>
                        <table className="reward-table">
                            <thead>
                                {/* Row headers */}
                                <tr>
                                    <th style={{ width: "15%", borderRight: "1px solid #E3E2E6" }}> </th>
                                    <th style={{ width: "15%", borderRight: "1px solid #E3E2E6" }}> </th>
                                    <th style={{ width: "8%", borderRight: "1px solid #E3E2E6" }}> </th>
                                    {dayRangeCount.map((day, index) => (
                                        <React.Fragment key={index}>
                                            <th style={{ textAlign: "center", borderRight: "1px solid #E3E2E6", borderBottom: "1px solid #E3E2E6" }} colSpan="3">
                                                Day {index + 1}
                                            </th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <thead>
                                {/* Column headers */}
                                <tr>
                                    <th style={{ borderRight: "1px solid #E3E2E6" }}>Reward</th>
                                    <th style={{ borderRight: "1px solid #E3E2E6" }}>Brand</th>
                                    <th style={{ borderRight: "1px solid #E3E2E6" }}>Category</th>
                                    {dayRangeCount.map((day, index) => (
                                        <React.Fragment key={index}>
                                            <th style={{ width: "8%", borderRight: "1px solid #E3E2E6" }}>Initial</th>
                                            <th style={{ width: "8%", borderRight: "1px solid #E3E2E6" }}>Redeemed</th>
                                            <th style={{ width: "8%", borderRight: "1px solid #E3E2E6" }}>Remaining</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedRewardData && sortedRewardData.length > 0 ? (
                                    filterReward().map((reward, i) => (
                                        <tr key={i}>
                                            <td>
                                                <Link to={`/reward-inventory/detail/${reward.idProduct}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                                                    {highlightSearchText(reward.productName)}
                                                </Link>
                                                {/* <a href={`/reward-inventory/detail/${reward.idProduct}`} style={{ color: '#A9B245', fontWeight: 'bold'}}>{reward.productName}</a> */}
                                            </td>
                                            <td>{highlightSearchText(reward.brandName)}</td>
                                            <td style={{ borderRight: "1px solid #E3E2E6" }}>CAT {reward.category}</td>
                                            {reward.listDayReward.map((dayReward, j) => (
                                                <React.Fragment key={j}>
                                                    <td>{dayReward.stokAwal}</td>
                                                    <td>{dayReward.stokRedeemed}</td>
                                                    <td style={{ borderRight: "1px solid #E3E2E6" }}>{dayReward.stokSisa}</td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3 + dayRangeCount.length * 3}>No rewards available</td>
                                    </tr>
                                )}
                            </tbody>
                            {search.trim() && filterReward().length === 0 && (
                                <tr>
                                    <td colSpan="12">No Reward match the search criteria</td>
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

export default RewardInventory;