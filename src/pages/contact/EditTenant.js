import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarGuest } from "../../components/navbar/NavbarGuest";
import { toast, Toaster } from "react-hot-toast";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import "../../static/css/TenantRegistrationForm.css";
import "../../static/css/Button.css";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import Sidebar from '../dashboard/Sidebar';

const EditTenant = () => {
  // const { eventId } = useParams();
  const { idTenant } = useParams();
  const url = 'http://localhost:8080';
  const role = localStorage.getItem('role');

  const [picName, setPicName] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  // const [brandNumber, setBrandNumber] = useState("");

  const [brandInstagram, setBrandInstagram] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [electricityAmount, setElectricityAmount] = useState("");
  const [brandPromo, setBrandPromo] = useState("");
  const [category, setCategory] = useState("");
  const [boothPreference, setBoothPreference] = useState("");
  const [errors, setErrors] = useState({});
  const [activePage, setActivePage] = useState('contact');
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.brand_name = "Brand Name cannot be empty";
    }

    if (!email.trim()) {
      newErrors.brand_email = "Brand Email cannot be empty";
    } else if (!/^\S+@\S+$/i.test(email)) {
      newErrors.brand_email = "Email is not valid";
    }

    if (!telephone.trim()) {
      newErrors.brand_number = "Company Telephone Number cannot be empty";
    } else if (!/^\d+$/.test(telephone)) {
      newErrors.brand_number = 'Telephone Number must contain only numbers';
  } else if (telephone.charAt(0) === '0') {
      newErrors.brand_number = 'Telephone Number cannot start with 0';
  }

    if (!brandInstagram.trim()) {
      newErrors.brand_instagram = "Brand Instagram cannot be empty";
    }

    if (!address.trim()) {
      newErrors.brand_address = "Brand Address cannot be empty";
    }

    if (!picName.trim()) {
      newErrors.pic_name = "Person in Charge Name cannot be empty";
    }

    if (!category.trim() || category === "Choose category") {
      newErrors.brand_category = "Brand Category cannot be empty";
    }

    if (!brandDescription.trim()) {
      newErrors.brand_description = "Brand Description cannot be empty";
    }

    if (electricityAmount === 0 || electricityAmount === null || electricityAmount === undefined) {
      newErrors.electricity_amount = "Amount of Electricity Needed cannot be empty";
    } else if (isNaN(electricityAmount) || electricityAmount <= 0) {
      newErrors.electricity_amount = "Electricity Amount must be a positive number";
    }

    if (!brandPromo.trim()) {
      newErrors.brand_promo = "Brand Promo cannot be empty";
    }

    if (!boothPreference.trim() || boothPreference === "Choose booth preference") {
      newErrors.booth_preference = "Booth Preference cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`http://localhost:8080/api/contact/detail/tenant/${idTenant}`);
        const tenantData = response.data.data;

        setPicName(tenantData.picName);
        setName(tenantData.name);
        setAddress(tenantData.address);
        setEmail(tenantData.email);
        setTelephone(tenantData.telephone);

        setBrandInstagram(tenantData.brandInstagram);
        setBrandDescription(tenantData.brandDescription);
        setElectricityAmount(parseInt(tenantData.electricityAmount));
        console.log(tenantData.electricityAmount)
        setBrandPromo(tenantData.brandPromo);
        setCategory(tenantData.category);
        setBoothPreference(tenantData.boothPreference);

      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchTenantData();
  }, []);

  const onRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      openModal(); // Open the modal if the form is valid
    } else {
      console.log("Form validation failed");
    }
  };

  const confirmEditTenant = async (e) => {
    closeModal();

    try {
      const response = await axios.put(` http://localhost:8080/api/tenant/update/${idTenant}`, {
        // eventId,
        picName,
        address: address,
        name,
        email,
        brandInstagram,
        telephone,
        brandDescription,
        electricityAmount: parseInt(electricityAmount),
        brandPromo,
        category,
        boothPreference,
      });

      console.log("Tenant Edited successfully:", response.data);
      // Harusnya ke tenant list/ conatct list
      navigate(`/tenant/detail/${idTenant}`);

      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Tenant edited successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Cannot edit Tenant");
    }
  };

  return (
    <body>
      <Sidebar activePage={activePage}/>
      <main style={{marginLeft: " 60px"}}>
      <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      {/* Header Start */}
          <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
              <div className="mx-8">
                  <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                  Edit Tenant</h1>
              </div>
          </div>
          {/* Header Ends */}

      <Toaster position="top-center" reverseOrder={false} />

      <form className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full max-w-screen-2xl mx-auto text-neutral-100 rounded-2xl" onSubmit={(e) => onRegister(e)}>
        <div className="columns-2">
          <div className="first-column">
            {/* brand name */}
            <div className="input-form-tenant flex flex-col space-y-1 mt-2">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_name">
                Brand Name<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip border border-neutral-40 rounded-lg ${errors.brand_name && "border-danger"}`}>
                <input id="brand_name" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Lala Market" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              {errors.brand_name && <span className="mt-0.5 text-danger text-xs">{errors.brand_name}</span>}
            </div>

            {/* brand email */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_email">
                Brand Email<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_email && "border-danger"}`}>
                <input id="brand_email" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. jane.doe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              {errors.brand_email && <span className="mt-0.5 text-danger text-xs">{errors.brand_email}</span>}
            </div>

            {/* brand telephone number */}
            <div className="input-form-tenant flex flex-col">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_number">
                Brand Telephone Number<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip flex items-stretch w-full border border-neutral-40 rounded-lg ${errors.brand_number && "border-danger"}`}>
                <div className="flex items-center justify-center px-3 bg-cyan-50">+62</div>
                <input id="telephone" type="tel" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. 812xxxx..." value={telephone} onChange={(e) => setTelephone(e.target.value)} />
              </div>

              {errors.brand_number && <span className="mt-0.5 text-danger text-xs">{errors.brand_number}</span>}
            </div>

            {/* brand instagram */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_instagram">
                Brand Instagram<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_instagram && "border-danger"}`}>
                <input id="brand_instagram" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. LalaMarketOfficial" value={brandInstagram} onChange={(e) => setBrandInstagram(e.target.value)} />
              </div>

              {errors.brand_instagram && <span className="mt-0.5 text-danger text-xs">{errors.brand_instagram}</span>}
            </div>

            {/* brand address */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_address">
                Brand Address<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_address && "border-danger"}`}>
                <input id="brand_address" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Margonda, Kukusan Depok" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              {errors.brand_address && <span className="mt-0.5 text-danger text-xs">{errors.brand_address}</span>}
            </div>

            {/* person in charge */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="pic_name">
                Person in Charge Name<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.pic_name && "border-danger"}`}>
                <input id="pic_name" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Jane Doe" value={picName} onChange={(e) => setPicName(e.target.value)} />
              </div>

              {errors.pic_name && <span className="mt-0.5 text-danger text-xs">{errors.pic_name}</span>}
            </div>
          </div>

          <div className="second-column mx-10">
            {/* brand category */}
            <div className="input-form-tenant flex flex-col">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_category">
                Brand Category<span className="text-danger">*</span>
              </label>

              <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_category && "border-danger"}`}>
                <select id="brand_category" className="appearance-none px-4 py-3 w-full focus:outline-none" placeholder="Choose category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Choose category</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Bag">Bag</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Hijab">Hijab</option>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {errors.brand_category && <span className="mt-0.5 text-danger text-xs">{errors.brand_category}</span>}
            </div>

            {/* brand description */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_description">
                Brand Description<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_description && "border-danger"}`}>
                <textarea id="brand_description" className="px-4 py-3 w-full h-24 focus:outline-none" placeholder="ex. Our brand is about..." value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} />
              </div>

              {errors.brand_description && <span className="mt-0.5 text-danger text-xs">{errors.brand_description}</span>}
            </div>

            {/* electricity amount */}
            <div className="input-form-tenant flex flex-col">
              <label className="input-label font-reynaldo text-left" htmlFor="electricity_amount">
                Amount of Electricity Needed (in Watt)<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.electricity_amount && "border-danger"}`}>
                <input id="electricity_amount" type="number" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. 20" value={electricityAmount} onChange={(e) => setElectricityAmount(e.target.value)} />
              </div>

              {errors.electricity_amount && <span className="mt-0.5 text-danger text-xs">{errors.electricity_amount}</span>}
            </div>

            {/* brand promo */}
            <div className="input-form-tenant flex flex-col space-y-1">
              <label className="input-label font-reynaldo text-left" htmlFor="brand_promo">
                Brand Promo<span className="text-danger">*</span>
              </label>

              <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_promo && "border-danger"}`}>
                <textarea id="brand_promo" className="px-4 py-3 w-full focus:outline-none" placeholder="ex. Offering a Buy 1 Get 1 for every 50k minimum purchase..." value={brandPromo} onChange={(e) => setBrandPromo(e.target.value)} />
              </div>

              {errors.brand_promo && <span className="mt-0.5 text-danger text-xs">{errors.brand_promo}</span>}
            </div>

            {/* booth preference */}
            <div className="input-form-tenant flex flex-col">
              <label className="input-label font-reynaldo text-left" htmlFor="booth_preference">
                Booth Preference<span className="text-danger">*</span>
              </label>

              <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.booth_preference && "border-danger"}`}>
                <select id="booth_preference" className="appearance-none px-4 py-3 w-full focus:outline-none" placeholder="Choose booth preference" value={boothPreference} onChange={(e) => setBoothPreference(e.target.value)}>
                  <option>Choose booth preference</option>
                  <option value="Big">Big Size</option>
                  <option value="Medium">Medium Size</option>
                  <option value="Small">Small Size</option>
                </select>
              </div>

              {errors.booth_preference && <span className="mt-0.5 text-danger text-xs">{errors.booth_preference}</span>}
            </div>
          </div>
        </div>

        <br></br>

        <div>
            <button className="button-green" onClick={() => navigate(-1)}>Cancel</button>
            <button className="button-pink" type="submit">Save Tenant</button>
        </div>

        <Modal isOpen={isModalOpen} onRequestClose={closeModal} id="modal-confirmation">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Edit Tenant</h2>
          <p className="text-center text-gray-700">Are you sure you want to edit Tenant?</p>
          <br></br>
          <button className="button-red text-center" onClick={closeModal}>Cancel</button>
          <button className="button-green text-center" onClick={confirmEditTenant}>
            Confirm
          </button>
        </Modal>

        <br></br>
      </form>
    </div>


      </main>
    </body>
  );
};

export default EditTenant;
