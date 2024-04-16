import React from "react";
import axios from "axios";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";
import { NavbarOperation } from "../../components/navbar/NavbarOperation";
import "../../App.css";
import "../../static/css/invoice/DetailInvoice.css";
import "../../static/css/Button.css";
import "../../static/css/Modal.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { NavbarFinance } from "../../components/navbar/NavbarFinance";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

const InvoiceDetail = () => {
  const { idInvoice } = useParams();
  const url = "http://localhost:8080";

  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState();
  const [countdays, setCountDays] = useState(0);
  const [idEvent, setIdEvent] = useState("");
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [paymentImage, setPaymentImage] = useState(null);
  const [paymentImageUrl, setPaymentImageUrl] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [isEditDisabled, setIsEditDisabled] = useState(false);  
  const [selectedStatus, setSelectedStatus] = useState("");
  

  const role = localStorage.getItem("role");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleValidateButton = () => {
    openValidateModal();
  };

  const openValidateModal = () => {
    setIsValidateModalOpen(true);
  };

  const closeValidateModal = () => {
    setIsValidateModalOpen(false);
  };

  const handleDeclineButton = () => {
    openDeclineModal();
  };

  const openDeclineModal = () => {
    setIsDeclineModalOpen(true);
  };

  const closeDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(`http://localhost:8080/api/invoice/detail/${idInvoice}`)
      .then((res) => {
        setInvoiceData(res.data.data);
        setIdEvent(res.data.data.event.idEvent);
        const storedPaymentImageUrl = localStorage.getItem("paymentImageUrl");
        if (storedPaymentImageUrl) {
          setPaymentImageUrl(storedPaymentImageUrl);
        } else {
          setPaymentImageUrl(res.data.data.paymentImageUrl);
          localStorage.setItem("paymentImageUrl", res.data.data.paymentImageUrl);
        }
      })
      .catch((err) => console.log(err));
  }, [idInvoice]);

  const handleBack = () => {
    localStorage.setItem("idSelectedEvent", idEvent);
    navigate(-1);
  };

  const uploadPaymentProof = async (idInvoice, file) => {
    if (!file) {
      toast.alert("Please select a payment proof image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // menggunakan "file" sebagai kunci

    try {
      const response = await axios.post(`${url}/api/invoice/upload-payment-proof/${idInvoice}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // menentukan tipe konten sebagai form-data
        },
      });

      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result;
        toast.success("Payment proof uploaded successfully");

        setPaymentImageUrl(base64Data);
        localStorage.setItem("paymentImageUrl", base64Data); // Memperbarui URL gambar
        // setIsValidated(true); // Mengatur status validasi gambar menjadi true
        console.log("Payment image URL (base64):", base64Data);
      };
      reader.onerror = (error) => {
        console.error(error);
        toast.error("Error converting payment proof to base64");
      };
    } catch (error) {
      console.error(error);
      toast.error("Error uploading payment proof");
    }
  };

  const confirmValidate = async () => {
    closeValidateModal();

    try {
      const response = await axios.put(`http://localhost:8080/api/invoice/validate-payment-proof/${idInvoice}`);
      console.log("Payment validated :", response.data);

      toast.success("Payment proof validated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error validating payment proof");
    }
  };

  const confirmDecline = async () => {
    closeDeclineModal();

    try {
      const response = await axios.put(`http://localhost:8080/api/invoice/decline-payment-proof/${idInvoice}`);
      console.log("Payment validation declined :", response.data);
      toast.success("Payment proof declined successfully");
      setIsDeclined(true);
    } catch (error) {
      console.error(error);
      toast.error("Error declining payment proof");
    }
  };

  const handleNotify = async (e) => {
    setIsLoading(true);
    closeModal();

    try {
      const response = await axios.put(`${url}/api/invoice/notify/${idInvoice}`);
      toast.success("Successfully notified");
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    try {
      const response = await axios.get(`${url}/api/invoice/generate-pdf/invoice/${idInvoice}`, {
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");

      // const response = await axios.get(`${url}/api/invoice/generate-pdf/invoice/${idInvoice}`, {
      //     responseType: 'blob'
      // });

      // // Membuat objek URL untuk blob
      // const fileURL = URL.createObjectURL(new Blob([response.data]));

      // // Membuat elemen <a> untuk men-download file
      // const link = document.createElement('a');
      // link.href = fileURL;
      // link.setAttribute('download', `SIELALA_INVOICE_${invoiceData.companyName}.pdf`);

      // // Menambahkan elemen <a> ke dokumen dan memicu klik pada elemen tersebut
      // document.body.appendChild(link);
      // link.click();

      // Menghapus elemen <a> setelah proses download selesai
      // document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Cannot generate invoice");
    }
  };

  function formatRupiah(angka) {
    var formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(angka);
  }

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      {role === "PARTNERSHIP" && <NavbarPartnership style={{ zIndex: 999 }} />}

      {role === "FINANCE" && <NavbarFinance style={{ zIndex: 999 }} />}

      {role === "ADMIN" && <NavbarAdmin style={{ zIndex: 999 }} />}

      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
        <div>
          <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: "left", fontSize: 50 }}>
            Invoice Detail
          </h1>
          <div>
            <p className="subtitle">Manage and view invoice's data here.</p>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <br></br>
      <br></br>

      <h1 className="text-2xl font-semibold mb-4 text-center">Invoice Detail</h1>

      {invoiceData ? (
        <>
          <br></br>

          <div className="detail-invoice">
            <div className="each-invoice">
              <p className="invoice-text-title">Tenant/Sponsor:</p>
              <p className="invoice-text">{invoiceData.companyName}</p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">Type:</p>
              <p className="invoice-text">{invoiceData.type}</p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">Address:</p>
              <p className="invoice-text">{invoiceData.companyAddress}</p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">PIC Name:</p>
              <p className="invoice-text">{invoiceData.picName}</p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">Date Issued:</p>
              <p className="invoice-text">
                {new Date(invoiceData.dateIssued).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">Tracking Status:</p>
              <p className="invoice-text">{invoiceData.trackingStatus}</p>
            </div>
            <div className="each-invoice">
              <p className="invoice-text-title">Payment Status:</p>
              <p className="invoice-text">{invoiceData.paymentStatus}</p>
            </div>
          </div>

          <br></br>
          <br></br>

          <div>
            <div className="button-field">
              <button className="button-green" onClick={handleBack}>
                Back
              </button>

              {(role === "PARTNERSHIP" || role === "ADMIN") && (
                <Link to={`/invoice/edit-detail/${idInvoice}`}>
                  <button className="button-pink" disabled={isEditDisabled}>Edit Invoice</button>
                </Link>
              )}

              <button className="button-brown" onClick={handleGenerate}>
                Generate to PDF
              </button>

              {(invoiceData.trackingStatus === "Issued" || invoiceData.trackingStatus === "Pending") && (
                <button className="button-green" onClick={openModal} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Notify Client"}
                </button>
              )}
            </div>
          </div>

          <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <thead>
                {/* Row headers */}
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.listInvoiceItem.map((itemInvoice, j) => (
                  <tr key={j}>
                    <td>{itemInvoice.item}</td>
                    <td>{itemInvoice.quantity}</td>
                    <td>{formatRupiah(itemInvoice.rate)}</td>
                    <td>{formatRupiah(itemInvoice.totalAmountItem)}</td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td colSpan={3}>Total</td>
                  <td>{formatRupiah(invoiceData.totalAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* Payment Proof Section */}
      <div className={`detail-sponsor bg-white p-6 rounded-lg shadow-md mb-4 ${paymentImageUrl ? "with-image" : ""}`}>
        <h1 className="text-2xl font-semibold mb-4 text-center">Payment Proof</h1>

        <div className="flex items-center mb-4">
          <input type="file" accept="image/*" onChange={(e) => setPaymentImage(e.target.files[0])} />
          <button className="button-green ml-2" onClick={openUploadModal} disabled={!paymentImage}>
            Submit Payment Proof
          </button>
        </div>
        {paymentImageUrl && (
          <div className="w-full flex justify-center items-center">
            <img
              src={paymentImageUrl}
              alt="Payment proof"
              className="w-full rounded-lg shadow-md"
              style={{ width: "200px", height: "auto" }} // Atur lebar gambar di sini, tinggi disesuaikan secara otomatis
            />
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <button className="button-green" onClick={handleValidateButton}>
            Validate
          </button>
          <button className="button-red" onClick={handleDeclineButton}>
            Decline
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
        <p className="text-center text-gray-700">Are you sure you want to notify the client?</p>
        <br></br>
        <div>
          <button className="button-red text-center" onClick={closeModal}>
            Cancel
          </button>
          <button className="button-green text-center" onClick={handleNotify}>
            Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={isUploadModalOpen} onRequestClose={closeUploadModal} id="modal-confirmation">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
        <p className="text-center text-gray-700">Are you sure you want to upload this payment proof?</p>
        <br></br>
        <div>
          <button className="button-red text-center" onClick={closeUploadModal}>
            Cancel
          </button>
          <button
            className="button-green text-center"
            onClick={() => {
              uploadPaymentProof(idInvoice, paymentImage);
              closeUploadModal();
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={isValidateModalOpen} onRequestClose={closeValidateModal} id="modal-confirmation">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
        <p className="text-center text-gray-700">Are you sure you want to validate this payment proof?</p>
        <br></br>
        <div>
          <button className="button-red text-center" onClick={closeValidateModal}>
            Cancel
          </button>
          <button className="button-green text-center" onClick={confirmValidate}>
            Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={isDeclineModalOpen} onRequestClose={closeDeclineModal} id="modal-confirmation">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
        <p className="text-center text-gray-700">Are you sure you want to decline this payment proof?</p>
        <br></br>
        <div>
          <button className="button-red text-center" onClick={closeDeclineModal}>
            Cancel
          </button>
          <button className="button-green text-center" onClick={confirmDecline}>
            Confirm
          </button>
        </div>
      </Modal>

      <br></br>
    </div>
  );
};

export default InvoiceDetail;
