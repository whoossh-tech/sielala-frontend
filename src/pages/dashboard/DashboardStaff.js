import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, BarChart } from "@mui/x-charts";
import '../../static/css/Dashboard.css';
import backgroundPhoto from "../../assets/bg-cover.png";

import Sidebar from './Sidebar';
import '../../static/css/Style.css';

const DashboardStaff = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);
    const [event, setEvent] = useState();
    const [rewardRedeemedList, setRewardRedeemedList] = useState([]);
    const [totalPointsRedeemed, setTotalPointsRedeemed] = useState(0);
    const [totalTenantAccepted, setTotalTenantAccepted] = useState(0);
    const [activePage, setActivePage] = useState('dashboard');

    const colors = ['#FFB2D3', '#B69478', '#D3DA80', '#F59FC3', '#8C6749', '#B2BA59', '#CC6E99', '#7D512D', '#9FA834'];

    const role = localStorage.getItem('role');
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const changeActivePage = (page) => {
        setActivePage(page);
      };

    useEffect(() => {
        axios
            .get("https://sielala-backend-production.up.railway.app/api/event/view-all")
            .then((res) => {
            setEventData(res.data.data);

            if (!selectedEvent && res.data.data.length > 0) {
                setSelectedEvent(res.data.data[0].idEvent);
            }

            })
            .catch((err) => console.log(err));

        if (selectedEvent) {
            axios
            .get(`https://sielala-backend-production.up.railway.app/api/event/detail/${selectedEvent}`)
            .then((res) => {
                setEvent(res.data.data);
                const totalAccepted = res.data.data.listTenant.filter(tenant => tenant.accepted).length;
                    setTotalTenantAccepted(totalAccepted);
            })
            .catch((err) => console.log(err));

            axios
                .get(`https://sielala-backend-production.up.railway.app/api/reward/reward-redemption-history/${selectedEvent}`)
                .then((res) => {
                    setRewardRedeemedList(res.data.data);
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
                // <div className='content-container my-8'>
                //      current code (kecuali tag <main> kalo ada)
                // </div>
    //      </main>
    // </body>

    return (
        <body>
            {/* Sidebar Navigation */}
            <Sidebar activePage={activePage}/> 

            <main style={{ marginLeft: "60px" }}>

                {/* Header Start */}
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '130px' }}>
                    <div className="mx-8">
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                        Dashboard</h1>
                    </div>
                </div>
                {/* Header Ends */}

                <div className='content-container my-8'>
                    <div className="dashboard-container">
                        {/* Event Dropdown */}
                        <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "400px", margin: "0 auto"}}>
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
                                    {event.eventName}: {event.startDate}
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
            
                        {/* Display charts or message */}
                        { event ? (
                            <div>
                                {(event.listVisitor.length === 0) && ( 
                                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                        {/* no registered visitors yet => won't show chart */}
                                        <b>There are currently no registered visitors for this event.</b>
                                    </div>
                                )}

                                {(event.listVisitor.length > 0) && ( 
                                    <div>

                                        {/* Event Pie Charts */}
                                        <div className="columns-2" style={{ display: 'flex' }}>
                                            <div className="first-column">
                                                <div className="bg-white p-6 rounded-lg shadow-md" 
                                                    style={{ marginTop: '40px', width: '415px' }}
                                                >
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
                                            </div>
                    
                                            <div className="second-column" style={{ marginLeft: '30px' }}>
                                                <div className="bg-white p-6 rounded-lg shadow-md" 
                                                    style={{ marginTop: '40px', width: '350px' }}
                                                >
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
                                            </div>
                                        </div>
                    
                                        {/* Age Distribution Bar Chart */}
                                        <div className="columns-2">
                                            <div className="first-column">
                                                <div className="bg-white p-6 rounded-lg shadow-md" 
                                                    style={{ marginTop: '40px', width: '430px' }}
                                                >
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
                                            </div>
                    
                                            <div className="second-column" style={{ marginLeft: '30px' }}>
                                                <div className="bg-white p-6 rounded-lg shadow-md" 
                                                    style={{ marginTop: '40px', width: '430px' }}
                                                >
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
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* show totals data */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                                    <div className="card">
                                        <p>Total Tenant Applicants: {event.listTenant ? event.listTenant.length : 0}</p>
                                        <p>Total Tenant Accepted: {totalTenantAccepted}</p>
                                    </div>
                                    <div className="card">
                                        <p>Total Reward Redeemed: {rewardRedeemedList.length}</p>
                                    </div>
                                    <div className="card">
                                        <p>Total Points Redeemed: {totalPointsRedeemed}</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <b>No events have been made.</b>
                            </div>

                        )}
                    </div>
                    <script src="script.js"></script>  
            </div>
        </main>
    </body>

    )  
}

export { DashboardStaff };