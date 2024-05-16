import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast, Toaster } from "react-hot-toast";
import "../../static/css/Button.css";
import "../../static/css/FormRewardInventory.css";
import "../../static/css/Modal.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { NavbarFinance } from "../../components/navbar/NavbarFinance";
import "../../static/css/event/Event.css";
import Sidebar from "../../pages/dashboard/Sidebar";
import "../../static/css/Style.css";
import "../../static/css/Login.css";
import "../../static/css/RegisterStaffForm.css";

const EditDetailInvoice = () => {
  const { idInvoice } = useParams();
  const url = "http://localhost:8080";
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [activePage, setActivePage] = useState("invoice");

  const [listInvoiceItem, setInvoiceItems] = useState([]);

  const [picName, setPicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  // const [trackingStatus, setTrackingStatus] = useState("");

  const [idEvent, setIdEvent] = useState("");
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`${url}/api/invoice/detail/${idInvoice}`);

        const invoiceData = response.data.data;
        console.log(invoiceData);

        setCompanyName(invoiceData.companyName);
        setCompanyAddress(invoiceData.companyAddress);
        setPicName(invoiceData.picName);
        setInvoiceItems(invoiceData.listInvoiceItem);
        // setTrackingStatus(invoiceData.trackingStatus);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!companyAddress.trim()) {
      newErrors.company_address = "Company Address cannot be empty";
    }

    if (!picName.trim()) {
      newErrors.pic_name = "PIC Name cannot be empty";
    }

    const quantityZero = listInvoiceItem.some((item) => item.quantity < 1);
    if (quantityZero) {
      newErrors.listInvoiceItem = "Quantity must be more than 0";
    }

    const itemEmpty = listInvoiceItem.some((item) => item.item.trim() === "");
    if (itemEmpty) {
      newErrors.listInvoiceItem = "Input for items cannot be empty";
    }

    const quantityEmpty = listInvoiceItem.some((item) => item.quantity === "");
    if (quantityEmpty) {
      newErrors.listInvoiceItem = "Input for quantity cannot be empty";
    }

    const rateEmpty = listInvoiceItem.some((item) => item.rate === "");
    if (rateEmpty) {
      newErrors.listInvoiceItem = "Input for rate cannot be empty";
    }

    const everyItemEmpty = listInvoiceItem.some((item) => item.item.trim() === "" || item.quantity === "" || item.rate === "");
    if (everyItemEmpty) {
      newErrors.listInvoiceItem = "Input for every item, rate, and quantity cannot be empty";
    }

    const anyQuantityNotNumber = listInvoiceItem.some((item) => isNaN(item.quantity));
    if (anyQuantityNotNumber) {
      newErrors.listInvoiceItem = "Input for quantity has to be a number";
    }

    const anyRateNotNumber = listInvoiceItem.some((item) => isNaN(item.rate));
    if (anyRateNotNumber) {
      newErrors.listInvoiceItem = "Input for rate has to be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      openModal();
    } else {
      console.log("Form validation failed");
    }
  };

  const confirmSubmit = async (e) => {
    closeModal();

    try {
      const response = await axios.put(`${url}/api/invoice/edit/${idInvoice}`, {
        companyAddress,
        picName,
        listInvoiceItem,
        // trackingStatus
      });

      localStorage.setItem("idSelectedEvent", idEvent);

      console.log("Invoice edited successfully:", response.data);
      navigate(`/invoice/detail/${idInvoice}`);

      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Invoice edited successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Cannot edit invoice");
    }
  };

  const handleAddRow = () => {
    setInvoiceItems([...listInvoiceItem, { item: "", quantity: "", rate: "" }]);
  };

  const handleInputChange = (index, name, value) => {
    const newListInvoiceItem = [...listInvoiceItem];
    newListInvoiceItem[index][name] = value;
    setInvoiceItems(newListInvoiceItem);
  };

  const handleDeleteRow = (index) => {
    const newListInvoiceItem = [...listInvoiceItem];
    newListInvoiceItem.splice(index, 1);
    setInvoiceItems(newListInvoiceItem);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <body>
      <Sidebar activePage={activePage} />

      <main style={{ marginLeft: "60px" }}>
        {/* Header Start */}
        <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "150px" }}>
          <div className="mx-8">
            <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: "left", fontSize: 50 }}>
              Edit Invoice
            </h1>
          </div>
        </div>
        {/* Header Ends */}

        <div className="content-container my-4">
          <div className="dashboard-container">
            <div>
              <Toaster position="top-center" reverseOrder={false} />

              <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg" onSubmit={(e) => onSubmit(e)}>
                {/* <div className="input-form flex flex-col space-y-1">
          <label className="input-label font-reynaldo text-left" htmlFor="tracking_status">
            Tracking Status
          </label>
          {/* <select id="tracking_status" className="px-4 py-3 w-full focus:outline-none" value={trackingStatus} onChange={(e) => setTrackingStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select> */}
                {/* </div> */}

                <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">
                  <div className="input-form flex flex-col">
                    <label className="input-label font-reynaldo text-left" htmlFor="event">
                      Company Name
                    </label>

                    <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
                      <input id="company_name" className="px-4 py-3 w-full focus:outline-none bg-gray-100" value={companyName} readOnly />
                    </div>
                  </div>

                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="company_address">
                      Company Address<span className="text-danger">*</span>
                    </label>

                    <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.company_address && "border-danger"}`}>
                      <input id="company_address" className="px-4 py-3 w-full focus:outline-none" placeholder="Insert Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                    </div>

                    {errors.company_address && <span className="mt-0.5 text-danger text-xs">{errors.company_address}</span>}
                  </div>

                  {/* product name */}
                  <div className="input-form flex flex-col space-y-1">
                    <label className="input-label font-reynaldo text-left" htmlFor="pic_name">
                      Company PIC<span className="text-danger">*</span>
                    </label>

                    <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.pic_name && "border-danger"}`}>
                      <input id="pic_name" className="px-4 py-3 w-full focus:outline-none" placeholder="Insert Company PIC Name" value={picName} onChange={(e) => setPicName(e.target.value)} />
                    </div>

                    {errors.pic_name && <span className="mt-0.5 text-danger text-xs">{errors.pic_name}</span>}
                  </div>

                  <div>
                    <div className="button-field">
                      <button className="button-green" onClick={handleAddRow}>
                        Add Item
                      </button>
                    </div>
                  </div>

                  {/* initial stock */}
                  <div className="input-form flex flex-col">
                    <label className="input-label font-reynaldo text-left" htmlFor="items">
                      Items<span className="text-danger">*</span>
                    </label>

                    <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                      <table className="event-table mx-8">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {listInvoiceItem.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                  <input className="px-4 py-3 w-full focus:outline-none" type="text" value={item.item} onChange={(e) => handleInputChange(index, "item", e.target.value)} />
                                </div>
                              </td>
                              <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                  <input className="px-4 py-3 w-full focus:outline-none" type="number" value={item.quantity} min="1" onChange={(e) => handleInputChange(index, "quantity", parseInt(e.target.value))} />
                                </div>
                              </td>
                              <td>
                                <div className={`overflow-clip w-100 border border-neutral-40 rounded-lg ${errors.listInvoiceItem && "border-danger"}`}>
                                  <input className="px-4 py-3 w-full focus:outline-none" type="number" value={item.rate} min="1" onChange={(e) => handleInputChange(index, "rate", parseInt(e.target.value))} />
                                </div>
                              </td>
                              <td>
                                <button className="button-red" onClick={() => handleDeleteRow(index)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3">{errors.listInvoiceItem && <span className="mt-0.5 text-danger text-xs">{errors.listInvoiceItem}</span>}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                <br></br>
                <div>
                  <button className="button-green" onClick={handleBack}>
                    Cancel
                  </button>
                  <button className="button-pink" type="submit">
                    Edit
                  </button>
                </div>

                <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation-form">
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                  <p className="text-center text-gray-700">Are you sure you want to edit this invoice?</p>
                  <br></br>
                  <div>
                    <button className="button-red text-center" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="button-green text-center" onClick={confirmSubmit}>
                      Confirm
                    </button>
                  </div>
                </Modal>

                <br></br>
              </form>
            </div>
          </div>
          <script src="script.js"></script>
        </div>
      </main>
    </body>
  );
};
export default EditDetailInvoice;
