import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, BarChart } from "@mui/x-charts";
import '../../static/css/Dashboard.css';
// import backgroundPhoto from "../../assets/bg-cover.png";
import backgroundPhoto from '../../assets/background.svg';
import visitorIcon from "../../assets/dashboard/Ticket.png";
import tenantIcon from "../../assets/dashboard/Tent.png";
import sponsorIcon from "../../assets/dashboard/Megaphone.png";
import rewardIcon from "../../assets/dashboard/Wrapped gift.png";
import pointsIcon from "../../assets/dashboard/Bullseye.png";
import { reynaldoStyles } from "../../assets/fonts/fonts";

import Sidebar from './Sidebar';
import '../../static/css/Style.css';

const DashboardStaff = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);
    const [event, setEvent] = useState();
    const [rewardInventoryList, setRewardInventoryList] = useState([]);
    const [rewardRedeemedList, setRewardRedeemedList] = useState([]);
    const [sponsorList, setSponsorList] = useState([]);
    const [totalPointsRedeemed, setTotalPointsRedeemed] = useState(0);
    const [totalTenantAccepted, setTotalTenantAccepted] = useState(0);
    const [activePage] = useState('dashboard');

    // Mendapatkan tanggal mulai dan akhir dari event yang dipilih
    const eventStartDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.startDate);
    const eventEndDate = new Date(eventData.find(event => event.idEvent === selectedEvent)?.endDate);
    eventEndDate.setHours(23, 59, 59, 999);

    const formattedStartDate = new Date(eventStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedEndDate = new Date(eventEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const colors = ['#FFB2D3', '#B69478', '#D3DA80', '#F59FC3', '#8C6749', '#B2BA59', '#CC6E99', '#7D512D', '#9FA834'];

    const role = localStorage.getItem('role');
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/event/view-all")
            .then((res) => {
                setEventData(res.data.data);

                if (!selectedEvent && res.data.data.length > 0) {
                    setSelectedEvent(res.data.data[0].idEvent);
                }

            })
            .catch((err) => console.log(err));

        if (selectedEvent) {
            axios
                .get(`http://localhost:8080/api/event/detail/${selectedEvent}`)
                .then((res) => {
                    setEvent(res.data.data);
                    const totalAccepted = res.data.data.listTenant.filter(tenant => tenant.accepted).length;
                    setTotalTenantAccepted(totalAccepted);
                })
                .catch((err) => console.log(err));

            axios.get(`http://localhost:8080/api/reward/view-all/${selectedEvent}`)
                .then(res => {
                    setRewardInventoryList(res.data.data)
                })
                .catch((err) => console.log(err));

            axios
                .get(`http://localhost:8080/api/reward/reward-redemption-history/${selectedEvent}`)
                .then((res) => {
                    setRewardRedeemedList(res.data.data);
                })
                .catch((err) => console.log(err));

            axios
                .get(`http://localhost:8080/api/contact/all/${selectedEvent}`)
                .then((res) => {
                    const filteredContactList = res.data.data.filter((entry) => entry.type === 'Sponsor');
                    setSponsorList(filteredContactList);
                })
                .catch((err) => console.log(err));
        }
    }, [selectedEvent]);

    useEffect(() => {
        if (rewardRedeemedList.length > 0) {
            const totalPoints = rewardRedeemedList.reduce((acc, redeemedItem) => {
                return acc + redeemedItem.pointsRedeemed;
            }, 0);
            setTotalPointsRedeemed(totalPoints);
        } else {
            setTotalPointsRedeemed(0);
        }
    }, [rewardRedeemedList]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "Select event") {
            setSelectedEvent("");
        } else {
            setSelectedEvent(selectedValue);
        }
    };

    // visitor location
    const generatePieChartDataLocation = () => {
        if (!event || !event.listVisitor) return [];

        const locations = event.listVisitor.map(visitor => visitor.location);
        const locationCounts = locations.reduce((acc, location) => {
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(locationCounts).map(([location, count]) => ({
            name: location,
            value: count,
            label: location
        }));
    };

    // visitor gender
    const generatePieChartDataGender = () => {
        if (!event || !event.listVisitor) return [];

        const gender = event.listVisitor.map(visitor => visitor.gender);
        const genderCounts = gender.reduce((acc, gender) => {
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(genderCounts).map(([gender, count]) => ({
            name: gender,
            value: count,
            label: gender
        }));
    };

    // visitor age
    const generateBarChartDataAge = (gender) => {
        if (!event || !event.listVisitor) return [];

        const filteredVisitors = event.listVisitor.filter(visitor => visitor.gender === gender);
        const ageCounts = filteredVisitors.reduce((acc, visitor) => {
            const ageGroup = visitor.age;
            acc[ageGroup] = (acc[ageGroup] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(ageCounts).map(([ageGroup, count]) => ({
            name: ageGroup,
            value: count,
            label: ageGroup
        }));
    };

    // <body>
    //     <Sidebar />
    //      <main>
    // Header
    // <div className='content-container my-4'>
    //      current code (kecuali tag <main> kalo ada)
    // </div>
    //      </main>
    // </body>

    return (
        <body>
            {/* <div className="object-cover absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}> */}
            {/* Sidebar Navigation */}
            <style>{reynaldoStyles}</style>
            <Sidebar activePage={activePage}/>

            <main style={{ marginLeft: "60px", padding: "5px" }}>

                <div className='content-container'>
                    <div className="dashboard-container">
                        {/* <h1 id="page-title" className="font-reynaldo mb-2 text-general mx-8" style={{ paddingTop: 20, textAlign: 'center', fontSize: 50 }}>
                            Welcome to {role}'s Dashboard!</h1> */}
                        {/* Event Dropdown */}
                        <br></br>
                        <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "400px", margin: "0 auto" }}>
                            <select
                                className="appearance-none px-4 py-3 w-full focus:outline-none"
                                onChange={handleChange}
                                value={selectedEvent}
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#333333",
                                    borderRadius: "0.375rem",
                                    border: "1px solid #E3E2E6",
                                    fontSize: "1rem",
                                    lineHeight: "1.5",
                                    padding: "0.5rem 1rem",
                                    width: "400px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >

                                {eventData.length > 0 ? (
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

                        {/* Display charts or message */}
                        {event ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ padding: 0, margin: 0 }}>
                                    {/* First Column */}
                                    <div className="col-span-1 md:col-span-3">
                                        {/* Event detail card */}
                                        <div className="box-info bg-primary-10 rounded-lg py-3 px-8" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            <div className="flex justify-between">
                                                <div className='text-left'>
                                                    {/* <h1 className='text-2xl my-2'>{event.eventName}</h1> */}
                                                    <h1 className="font-reynaldo mb-2 text-general" style={{ paddingTop: 5, textAlign: 'left', fontSize: 30 }}>
                                                        {event.eventName}</h1>
                                                    <p className="text-md mb-2 text-center">
                                                        📆 {formattedStartDate} - {formattedEndDate} | 📍 {event.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Event Pie Charts */}
                                        <div className="pie-charts-container" style={{ display: 'flex', gap: '20px' }}>
                                            {/* Visitor Location Distribution */}
                                            {event.listVisitor && event.listVisitor.length > 0 ? (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Location Distribution</b></h2>
                                                    <PieChart
                                                        colors={colors}
                                                        series={[{
                                                            data: generatePieChartDataLocation(),
                                                            innerRadius: 20,
                                                            outerRadius: 90,
                                                            paddingAngle: 5,
                                                            cornerRadius: 5,
                                                            startAngle: 0,
                                                            endAngle: 360,
                                                            cx: 100,
                                                            cy: 110,
                                                        },]}
                                                        height={210}
                                                        width={390}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Location Distribution</b></h2>
                                                    <p style={{ textAlign: 'center' }}>No visitors yet</p>
                                                </div>
                                            )}

                                            {/* Visitor Gender Distribution */}
                                            {event.listVisitor && event.listVisitor.length > 0 ? (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Gender Distribution</b></h2>
                                                    <PieChart
                                                        colors={colors}
                                                        series={[{
                                                            data: generatePieChartDataGender(),
                                                            innerRadius: 20,
                                                            outerRadius: 90,
                                                            paddingAngle: 5,
                                                            cornerRadius: 5,
                                                            startAngle: 0,
                                                            endAngle: 360,
                                                            cx: 100,
                                                            cy: 110,
                                                            fontSize: 15
                                                        },]}
                                                        height={210}
                                                        width={320}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Gender Distribution</b></h2>
                                                    <p style={{ textAlign: 'center' }}>No visitors yet</p>
                                                </div>
                                            )}
                                        </div>


                                        {/* Age Distribution Bar Chart */}
                                        <div className="bar-charts-container" style={{ display: 'flex', gap: '20px' }}>
                                            {event.listVisitor && event.listVisitor.length > 0 ? (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Age Distribution - Female</b></h2>
                                                    <BarChart
                                                        colors={colors}
                                                        xAxis={[{
                                                            scaleType: 'band',
                                                            data: generateBarChartDataAge('Female').map(data => data.name),
                                                            colorMap: {
                                                                type: 'ordinal',
                                                                colors: ['#FFB2D3', '#B69478', '#D3DA80', '#F59FC3', '#8C6749', '#B2BA59', '#CC6E99', '#7D512D', '#9FA834']
                                                            }
                                                        }]}
                                                        series={[{
                                                            data: generateBarChartDataAge('Female').map(data => data.value),
                                                        }]}
                                                        width={400}
                                                        height={200}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Gender Distribution</b></h2>
                                                    <p style={{ textAlign: 'center' }}>No visitors yet</p>
                                                </div>
                                            )}

                                            {event.listVisitor && event.listVisitor.length > 0 ? (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Age Distribution - Male</b></h2>
                                                    <BarChart
                                                        colors={colors}
                                                        xAxis={[{
                                                            scaleType: 'band',
                                                            data: generateBarChartDataAge('Male').map(data => data.name),
                                                            colorMap: {
                                                                type: 'ordinal',
                                                                colors: ['#FFB2D3', '#B69478', '#D3DA80', '#F59FC3', '#8C6749', '#B2BA59', '#CC6E99', '#7D512D', '#9FA834']
                                                            }
                                                        }]}
                                                        series={[{
                                                            data: generateBarChartDataAge('Male').map(data => data.value),
                                                        }]}
                                                        width={400}
                                                        height={200}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="box-info bg-white p-6 rounded-lg shadow-md" style={{ marginTop: '20px', width: 'calc(50% - 10px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                    <h2><b>Visitor Gender Distribution</b></h2>
                                                    <p style={{ textAlign: 'center' }}>No visitors yet</p>
                                                </div>
                                            )}

                                        </div>
                                    </div>


                                    {/* Second Column */}
                                    <div className="col-span-1 md:col-span-1">
                                        {/* show totals data */}
                                        <div className="totals-container">
                                            <div class="box-info bg-tertiary-10 mb-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                                                <img src={visitorIcon} alt="Ticket" style={{ width: '60px', marginRight: '20px' }} />
                                                <div>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '14px' }}>Visitors</p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{event.listVisitor ? event.listVisitor.length : 0} <span style={{ fontSize: '14px' }}>registered</span></p>
                                                </div>
                                            </div>
                                            <div class="box-info bg-secondary-10 mb-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                                                <img src={sponsorIcon} alt="Megaphone" style={{ width: '60px', marginRight: '20px' }} />
                                                <div>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '14px' }}>Sponsors</p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{sponsorList.length} <span style={{ fontSize: '14px' }}>sponsors</span></p>
                                                </div>
                                            </div>
                                            <div class="box-info bg-tertiary-20 mb-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                                                <img src={tenantIcon} alt="Tent" style={{ width: '60px', marginRight: '20px' }} />
                                                <div>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '14px' }}>Tenants</p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{event.listTenant ? event.listTenant.length : 0} <span style={{ fontSize: '14px' }}>registered</span></p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{totalTenantAccepted} <span style={{ fontSize: '14px' }}>accepted</span></p>
                                                </div>
                                            </div>
                                            <div class="box-info bg-primary-10 mb-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                                                <img src={rewardIcon} alt="Gift" style={{ width: '60px', marginRight: '20px' }} />
                                                <div>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '14px' }}>Rewards</p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{rewardInventoryList.length} <span style={{ fontSize: '14px' }}>product types</span></p>
                                                </div>
                                            </div>
                                            <div class="box-info bg-tertiary-30 mb-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                                                <img src={pointsIcon} alt="Bullseye" style={{ width: '60px', marginRight: '20px' }} />
                                                <div>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '14px' }}>Rewards Redeemed</p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{rewardRedeemedList.length} <span style={{ fontSize: '14px' }}>rewards</span></p>
                                                    <p style={{ marginBottom: '5px', textAlign: 'left', fontSize: '24px' }}>{totalPointsRedeemed} <span style={{ fontSize: '14px' }}>points</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        ) : (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <b>No events have been made.</b>
                            </div>
                        )}

                        <br></br>

                    </div>
                    <script src="script.js"></script>
                </div>
            </main>
            {/* </div> */}
        </body >

    )
}

export { DashboardStaff };