import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, BarChart } from "@mui/x-charts";
import '../../static/css/Dashboard.css';

import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { NavbarBisdev } from '../../components/navbar/NavbarBisdev';
import { NavbarFinance } from '../../components/navbar/NavbarFinance';
import { NavbarOperation } from '../../components/navbar/NavbarOperation';

const DashboardStaff = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);
    const [event, setEvent] = useState();

    const colors = ['#FDA7CB', '#A27D60', '#C3CB6B', '#E685AE', '#865C3A', '#A9B245', '#FFCDE5', '#DAC1AD', '#EBF0B0'];

    const role = localStorage.getItem('role');
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        if (selectedEvent) {
            axios
            .get(`http://localhost:8080/api/event/detail/${selectedEvent}`)
            .then((res) => {
                setEvent(res.data.data);
            })
            .catch((err) => console.log(err));
        }

        axios
            .get("http://localhost:8080/api/event/view-all")
            .then((res) => {
            setEventData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, [selectedEvent]);

    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
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

    return (
        <main>

            {/* Navigation Bar */}
            {( role === 'ADMIN' ) && ( <NavbarAdmin style={{ zIndex: 999 }} />)}
            {( role === 'PARTNERSHIP' ) && ( <NavbarPartnership style={{ zIndex: 999 }} />)}
            {( role === 'BISDEV' ) && ( <NavbarBisdev style={{ zIndex: 999 }} />)}
            {( role === 'FINANCE' ) && ( <NavbarFinance style={{ zIndex: 999 }} />)}
            {( role === 'OPERATION' ) && ( <NavbarOperation style={{ zIndex: 999 }} />)}
            <br></br>

            <div style={{ marginLeft: '70px', marginRight: '30px', marginBottom: '40px' }}>

                {/* Event Dropdown */}
                <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "200px", margin: "0 auto" }}>
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

                {/* Age Distribution */}
                <div className="columns-2">
                    <div className="first-column">
                        <div className="bg-white p-6 rounded-lg shadow-md" 
                            style={{ marginTop: '40px', width: '450px' }}
                        >
                            <h2><b>Age Distribution - Female</b></h2>
                            <BarChart
                                colors={colors}
                                xAxis={[{ scaleType: 'band', data: generateBarChartDataAge('Female').map(data => data.name) }]}
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
                                xAxis={[{ scaleType: 'band', data: generateBarChartDataAge('Male').map(data => data.name) }]}
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

        </main>
    )
}

export { DashboardStaff };