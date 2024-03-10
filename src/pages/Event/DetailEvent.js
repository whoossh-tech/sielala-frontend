// import React, { useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { reynaldoStyles } from "../../assets/fonts/fonts";
// import "../../static/css/event/CreateEvent.css";
// import "../../static/css/Button.css";
// import backgroundPhoto from "../../assets/bg-cover.png";
// import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
// import { toast, Toaster } from "react-hot-toast";
// import { subDays } from "date-fns";

// const EventDetail = () => {
//   const navigate = useNavigate();
//   const [eventData, setEventData] = useState();
//   const [tenantData, setTenantData] = useState();

//   const [eventName, setEventName] = useState("");
//   const [idEvent, setIdEvent] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [location, setLocation] = useState("");
//   const [listTenant, setListTenant] = useState([]);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/event/detail/${idEvent}")
//       .then((res) => {
//         setEventName(res.data.eventName);
//         setIdEvent(res.data.idEvent);
//         setStartDate(res.data.startDate);
//         setEndDate(res.data.endDate);
//         setLocation(res.data.location);
//         setListTenant(res.data.listTenant);
//       })
//       .catch((err) => console.log(err));
//   });

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
//       <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "120px" }}>
//         <div className="text-wrapper">
//           <h1 className="title">Event Detail</h1>
//           <div className="subtitle-wrapper">
//             <p className="subtitle">Manage and view event data here.</p>
//           </div>
//         </div>
//       </div>

//       <br></br>

//       <div className="detail-event">
//         <div className="each-event">
//           <p className="event-text-title">Event Name:</p>
//           <p className="event-text">{eventData.eventName}</p>
//         </div>
//         <div className="each-event">
//           <p className="event-text-title">Start Date:</p>
//           <p className="event-text">{eventData.startDate}</p>
//         </div>
//         <div className="each-event">
//           <p className="event-text-title">End Date:</p>
//           <p className="event-text">{eventData.endDate}</p>
//         </div>
//         <div className="each-event">
//           <p className="event-text-title">Location:</p>
//           <p className="event-text">{eventData.location}</p>
//         </div>
//         {/* <div className="each-event">
//           <p className="event-text-title">Accepted Tenant:</p>
//           <p className="event-text">{eventData.listTenant}</p>
//         </div> */}
//       </div>

//       <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
//         <h1>Accepted Tenant</h1>
//         <table className="Tenant-table">
//           <thead>
//             {/* Row headers */}
//             <tr>
//               <th>ID</th>
//               <th>Brand Name</th>
//               <th>PIC Name</th>
//               <th>Brand Email</th>
//               <th>Brand Telephone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {listTenant && listTenant.length > 0 ? (
//               listTenant.map((tenant, i) => (
//                 <tr key={i}>
//                   <td>{tenant.brandName}</td>
//                   <td>{tenant.picName}</td>
//                   <td>{tenant.brandEmail}</td>
//                   <td>{tenant.brandTelephone}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No listTenant available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="button-field">
//         <button className="button-green" onClick={handleBack}>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };
