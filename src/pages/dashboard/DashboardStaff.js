// DOKUMEN INI SEBAGAI BENCHMARK SIDEBAR

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, BarChart } from "@mui/x-charts";
import '../../static/css/Dashboard.css';
import backgroundPhoto from "../../assets/bg-cover.png";

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardStaff = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);
    const [event, setEvent] = useState();
    const [rewardRedeemedList, setRewardRedeemedList] = useState([]);
    const [totalPointsRedeemed, setTotalPointsRedeemed] = useState(0);
    const [totalTenantAccepted, setTotalTenantAccepted] = useState(0);

    const colors = ['#FFCDE5', '#DAC1AD', '#EBF0B0', '#FDA7CB', '#A27D60', '#C3CB6B', '#E685AE', '#865C3A', '#A9B245'];

    const role = localStorage.getItem('role');
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

//BEGINI CARANYA
    // <body>
    //     <Sidebar />

    //     <section id="content">
    //         <main></main>
    //     </section>
    // </body>

    return (
        <body>
            {/* <section id="sidebar"> */}
            <Sidebar /> 


            {/* <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                    Event Management</h1>
                    <div>
                        <p className="subtitle">Manage your event here</p>
                    </div>
                </div>
            </div> */}
            {/* </section> */}

            <section id="content">
                {/* <nav>
                    <a href="#" class="nav-link">Categories</a>
                </nav> */}
            <main>
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                    <div>
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Event Management</h1>
                        <div>
                            <p className="subtitle">Manage your event here</p>
                        </div>
                    </div>
                </div>
            {/* Navigation Bar */}
            {/* {( role === 'ADMIN' ) && ( <NavbarAdmin style={{ zIndex: 999 }} />)}
            {( role === 'PARTNERSHIP' ) && ( <NavbarPartnership style={{ zIndex: 999 }} />)}
            {( role === 'BISDEV' ) && ( <NavbarBisdev style={{ zIndex: 999 }} />)}
            {( role === 'FINANCE' ) && ( <NavbarFinance style={{ zIndex: 999 }} />)}
            {( role === 'OPERATION' ) && ( <NavbarOperation style={{ zIndex: 999 }} />)} */}
            {/* <nav>
			<i class='bx bx-menu' ></i>
			<a href="#" class="nav-link">Categories</a> */}
			{/* <form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."></input
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i>
				</div>
			</form> */}
			{/* <input type="checkbox" id="switch-mode" hidden></input>
			<label for="switch-mode" class="switch-mode"></label>
			<a href="#" class="notification">
				<i class='bx bxs-bell' ></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src="img/people.png"></img>
			</a> */}
		{/* </nav> */}
            {/* <Sidebar />  */}
            {/* <br /> */}
    
            <div className="dashboard-container">
                {/* <div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div> */}
                {/* Event Dropdown */}
                <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "200px", margin: "0 auto"}}>

                {/* <div class="head-title"> */}
			
			{/* </div> */}

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
                        width: "100%",
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
                                            style={{ marginTop: '40px', width: '450px' }}
                                        >
                                            <h2><b>Age Distribution - Female</b></h2>
                                            <BarChart
                                                colors={colors}
                                                xAxis={[{ 
                                                    scaleType: 'band', 
                                                    data: generateBarChartDataAge('Female').map(data => data.name) 
                                                }]}
                                                series={[{ 
                                                    data: generateBarChartDataAge('Female').map(data => data.value), 
                                                }]}
                                                width={410}
                                                height={200}
                                            />
                                        </div>
                                    </div>
            
                                    <div className="second-column" style={{ marginLeft: '30px' }}>
                                        <div className="bg-white p-6 rounded-lg shadow-md" 
                                            style={{ marginTop: '40px', width: '450px' }}
                                        >
                                            <h2><b>Age Distribution - Male</b></h2>
                                            <BarChart
                                                colors={colors}
                                                xAxis={[{ 
                                                    scaleType: 'band', 
                                                    data: generateBarChartDataAge('Male').map(data => data.name) 
                                                }]}
                                                series={[{ 
                                                    data: generateBarChartDataAge('Male').map(data => data.value),
                                                }]}
                                                width={410}
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
        </main>
        </section>
        </body>

    )  
}

export { DashboardStaff };