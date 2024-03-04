import React, { useState } from 'react';
import axios from 'axios';
import '../static/css/TenantRegistrationForm.css';
import '../static/css/Button.css';

const TenantRegistrationForm = () => {
    const[brandName, setBrandName] = useState('');
    const[brandEmail, setBrandEmail] = useState('');
    const[brandNumber, setBrandNumber] = useState('');
    const[brandInstagram, setBrandInstagram] = useState('');
    const[brandAddress, setBrandAddress] = useState('');
    const[picName, setPicName] = useState('');
    const[brandCategory, setBrandCategory] = useState('');
    const[brandDescription, setBrandDescription] = useState('');
    const[electricityAmount, setElectricityAmount] = useState('');
    const[brandPromo, setBrandPromo] = useState('');
    const[boothPreference, setBoothPreference] = useState('');
    const[errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!brandName.trim()) {
            newErrors.brand_name = 'Brand Name cannot be empty';
        }

        if (!brandEmail.trim()) {
            newErrors.brand_email = 'Brand Email cannot be empty';
        } else if (!/^\S+@\S+$/i.test(brandEmail)) {
            newErrors.brand_email = 'Email is not valid';
        }

        if (!brandNumber.trim()) {
            newErrors.brand_number = 'Brand Telephone Number cannot be empty';
        }

        if (!brandInstagram.trim()) {
            newErrors.brand_instagram = 'Brand Instagram cannot be empty';
        }

        if (!brandAddress.trim()) {
            newErrors.brand_address = 'Brand Address cannot be empty';
        }

        if (!picName.trim()) {
            newErrors.pic_name = 'Person in Charge Name cannot be empty';
        }

        if (!brandCategory.trim() || brandCategory === 'Choose category') {
            newErrors.brand_category = 'Brand Category cannot be empty';
        }

        if (!brandDescription.trim()) {
            newErrors.brand_description = 'Brand Description cannot be empty';
        }

        if (!electricityAmount.trim()) {
            newErrors.electricity_amount = 'Amount of Electricity Needed cannot be empty';
        } else if (isNaN(electricityAmount) || electricityAmount <= 0) {
            newErrors.electricity_amount = 'Electricity Amount must be a positive number';
        }

        if (!brandPromo.trim()) {
            newErrors.brand_promo = 'Brand Promo cannot be empty';
        }

        if (!boothPreference.trim() || boothPreference === 'Choose booth preference') {
            newErrors.booth_preference = 'Booth Preference cannot be empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted');

            try {
                const response = await axios.post('localhost:8000/api/tenant/register', {
                    picName,
                    address: brandAddress,
                    brandName,
                    brandEmail,
                    brandInstagram,
                    brandTelephone: brandNumber,
                    brandDescription,
                    electricityAmount: parseInt(electricityAmount),
                    brandPromo,
                    category: brandCategory,
                    boothPreference,
                })

                console.log('Tenant registered successfully:', response.data);
            } catch (error) {
                console.error('Error registering tenant:', error);
                setErrors('Error registering tenant.');
            }
            
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <form
            className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
             onSubmit={(e) => onSubmit(e)}
        >

        <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Tenant Registration</h1>
        <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

            {/* brand name */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_name">
                Brand Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_name && "border-danger"}`}>
                <input
                id="brand_name"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. Lala Market"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)} required
                />
            </div>

            {errors.brand_name && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_name}
                </span>
            )}
            </div>

            {/* brand email */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_email">
                Brand Email<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_email && "border-danger"}`}>
                <input
                id="brand_email"
                type="email"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="jane.doe@gmail.com"
                value={brandEmail}
                onChange={(e) => setBrandEmail(e.target.value)} required
                />
            </div>

            {errors.brand_email && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_email}
                </span>
            )}
            </div>

            {/* brand telephone number */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_number">
                Brand Telephone Number<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip flex items-stretch w-full border border-neutral-40 rounded-lg ${errors.brand_number && "border-danger"}`}>
                <div className="flex items-center justify-center px-3 bg-cyan-50">
                +62
                </div>
                <input
                id="brand_number"
                type="tel"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="812xxxx..."
                value={brandNumber}
                onChange={(e) => setBrandNumber(e.target.value)} required
                />
            </div>

            {errors.brand_number && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_number}
                </span>
            )}
            </div>

            {/* brand instagram */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_instagram">
                Brand Instagram<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_instagram && "border-danger"}`}>
                <input
                id="brand_instagram"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. @LalaMarketOfficial"
                value={brandInstagram}
                onChange={(e) => setBrandInstagram(e.target.value)} required
                />
            </div>

            {errors.brand_instagram && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_instagram}
                </span>
            )}
            </div>

            {/* brand address */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_address">
                Brand Address<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_address && "border-danger"}`}>
                <input
                id="brand_address"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. Margonda, Kukusan Depok"
                value={brandAddress}
                onChange={(e) => setBrandAddress(e.target.value)} required
                />
            </div>

            {errors.brand_address && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_address}
                </span>
            )}
            </div>

            {/* person in charge */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="pic_name">
                Person in Charge Name<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.pic_name && "border-danger"}`}>
                <input
                id="pic_name"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. Jane Doe"
                value={picName}
                onChange={(e) => setPicName(e.target.value)} required
                />
            </div>

            {errors.pic_name && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.pic_name}
                </span>
            )}
            </div>

            {/* brand category */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_category">
                Brand Category<span className="text-danger">*</span>
            </label>

            <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_category && "border-danger"}`}>
                <select
                id="brand_category"
                className="appearance-none px-4 py-3 w-full focus:outline-none"
                placeholder="Choose category"
                value={brandCategory}
                onChange={(e) => setBrandCategory(e.target.value)} required
                >
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

            {errors.brand_category && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_category}
                </span>
            )}
            </div>

            {/* brand description */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_description">
                Brand Description<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_description && "border-danger"}`}>
                <input
                id="brand_description"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. Our brand is about..."
                value={brandDescription}
                onChange={(e) => setBrandDescription(e.target.value)} required
                />
            </div>

            {errors.brand_description && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_description}
                </span>
            )}
            </div>

            {/* electricity amount */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="electricity_amount">
                Amount of Electricity Needed<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.electricity_amount && "border-danger"}`}>
                <input
                id="electricity_amount"
                type="number"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="20"
                value={electricityAmount}
                onChange={(e) => setElectricityAmount(e.target.value)} required
                />
            </div>

            {errors.electricity_amount && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.electricity_amount}
                </span>
            )}
            </div>

            {/* brand promo */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="brand_promo">
                Brand Promo<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.brand_promo && "border-danger"}`}>
                <input
                id="brand_promo"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. Offering a Buy 1 Get 1 for every 50k minimum purchase..."
                value={brandPromo}
                onChange={(e) => setBrandPromo(e.target.value)} required
                />
            </div>

            {errors.brand_promo && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.brand_promo}
                </span>
            )}
            </div>

            {/* booth preference */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="booth_preference">
                Booth Preference<span className="text-danger">*</span>
            </label>

            <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.booth_preference && "border-danger"}`}>
                <select
                id="booth_preference"
                className="appearance-none px-4 py-3 w-full focus:outline-none"
                placeholder="Choose booth preference"
                value={boothPreference}
                onChange={(e) => setBoothPreference(e.target.value)} required
                >
                <option>Choose booth preference</option>
                <option value="Big">Big Size</option>
                <option value="Medium">Medium Size</option>
                <option value="Small">Small Size</option>
                </select>
            </div>

            {errors.booth_preference && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.booth_preference}
                </span>
            )}
            </div>
        </div>

        <br></br>

        <button
            className="button-pink"
            type="submit"
            // disabled={isRegisterLoading}
        >
            Apply for Tenant
        </button>

        <br></br>

        </form>
    );
};

// RegisterForm.displayName = "RegisterForm";
export { TenantRegistrationForm };
