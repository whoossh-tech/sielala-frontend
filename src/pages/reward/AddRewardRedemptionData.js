import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import AutoSuggest from 'react-autosuggest';
import {toast, Toaster} from 'react-hot-toast';
import '../../static/css/Button.css';
import '../../static/css/FormRewardInventory.css';
import '../../static/css/Modal.css';
import backgroundPhoto from '../../assets/bg-cover.png';
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { Wheel } from 'react-custom-roulette';

const AddRewardRedemptionData = () => {
    const { idEvent } = useParams();
    const url = 'https://sielala-backend-production.up.railway.app';
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    // data untuk dipost
    const [points, setPoints] = useState('');
    const [visitor, setVisitor] = useState('');
    const [reward, setReward] = useState('');
    const [redeemDate, setRedeemDate] = useState('');

    // data difetch
    const [listVisitor, setListVisitor] = useState([]); // untuk pilihan autosuggest visitor
    const [eventData, setEventData]  = useState(''); // untuk prefilled field event

    // confirmation message
    const [errors, setErrors] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    // autosuggest
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // roulette
    const [rouletteDataCat1, setRouletteDataCat1] = useState([]);
    const [rouletteDataCat2, setRouletteDataCat2] = useState([]);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [mustSpin, setMustSpin] = useState(false);
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [stringRewardPicked, setStringRewardPicked] = useState('');
    const [isCat1, setIsCat1] = useState(false);
    const [isCat2, setIsCat2] = useState(false);

    const currentDate = new Date();

    // date formatting
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // confirmation message
    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };
    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const openRewardModal = () => {
        setIsRewardModalOpen(true);
    };
    const closeRewardModal = () => {
        setIsRewardModalOpen(false);
    };

    // fetch data
    useEffect(() => {

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // setLoading(true);

        // fetch event data
        axios.get(`${url}/api/reward/${idEvent}`)
            .then(res => {
                setEventData(res.data.eventData)
            }).catch(err => 
                console.error('Error fetching event information:', err)
            )
        
        // fetch list visitor
        axios.get(`${url}/api/visitor/view-all/${idEvent}`)
            .then(res => {
                setListVisitor(res.data.data)
                // console.log(listVisitor)
            }).catch(err => 
                console.error('Error fetching visitors data:', err)
            )

        // fetch list reward cat 1
        axios.get(`${url}/api/reward/view-reward-category-1/${idEvent}`)
            .then(res => {
                const temp = res.data.data.map(reward => ({
                    option: `${reward.productName} ${reward.brandName}`,
                    idProduct: `${reward.idProduct}`
                }));
                console.log(res.data.data);
                setRouletteDataCat1(temp);
                // setListRewardCat1(res.data.data);
                console.log(res.data.data)
            }).catch(err => 
                console.error('Error fetching reward cat1 data:', err)
        )

        // fetch list reward cat 2
        axios.get(`${url}/api/reward/view-reward-category-2/${idEvent}`)
            .then(res => {
                const temp = res.data.data.map(reward => ({
                    option: `${reward.productName} ${reward.brandName}`,
                    idProduct: `${reward.idProduct}`
                }));
                console.log(res.data.data);
                setRouletteDataCat2(temp);
                // setListRewardCat2(res.data.data);
            }).catch(err => 
                console.error('Error fetching reward cat2 data:', err)
        )
    }, [idEvent]);

    const validateForm = () => {
        const newErrors = {};

        if (!visitor.trim()) {
            newErrors.visitor = 'Visitor ID cannot be empty';
        }

        if (!points.trim()) {
            newErrors.points = 'Points to Redeem cannot be empty';
        } else if (isNaN(points) || points <= 0) {
            newErrors.points = 'Points to Redeem must be a positive number';
        } else if (points < 500){
            newErrors.points = 'Insufficient points for reward redemption';
        }

        if (isCat1 && rouletteDataCat1.length == 0) {
            newErrors.roulette = 'Cannot redeem because there is no reward';
        }

        if (isCat2 && rouletteDataCat2.length == 0) {
            newErrors.roulette = 'Cannot redeem because there is no reward';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (validateForm()){
            openConfirmationModal();
        } else {
            console.log('Form validation failed');
        }
    };

    const confirmSubmit = async (e) => {
        closeConfirmationModal();

        // mulai spin
        setMustSpin(true);

        try {

            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const response = await axios.post(`${url}/api/reward/redeem-reward/${idEvent}`, {
                idProduct: reward,
                idVisitor: visitor,
                pointsRedeemed: parseInt(points),
                redeemDate
            });
            
            // Untuk pre-filled dropdown event
            localStorage.setItem('idSelectedEvent', idEvent);

            console.log('Reward redeemed successfully:', response.data);

            // await new Promise((resolve) => setTimeout(resolve, 500))
            // toast.success("Reward redeemed successfully");
            
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot redeem reward");
        }
    };

    const handleBack = () => {
        // Untuk pre-filled dropdown event
        localStorage.setItem('idSelectedEvent', idEvent);
        navigate(-1);
    }

    const handlePointsChange = (e) => {
        setPoints(e.target.value)
        setRedeemDate(formatDate(currentDate));

        if (e.target.value < 1500){
            setIsCat1(true);
            setIsCat2(false);

            if (rouletteDataCat1.length > 0){
                const newPrizeNumber = Math.floor(Math.random() * rouletteDataCat1.length);
                setPrizeNumber(newPrizeNumber);
                setReward(rouletteDataCat1[newPrizeNumber].idProduct);
                setStringRewardPicked(rouletteDataCat1[newPrizeNumber].option);
            }
        } else {
            setIsCat2(true);
            setIsCat1(false);
            
            if (rouletteDataCat2.length > 0){
                const newPrizeNumber = Math.floor(Math.random() * rouletteDataCat2.length);
                setPrizeNumber(newPrizeNumber);
                setReward(rouletteDataCat2[newPrizeNumber].idProduct);
                setStringRewardPicked(rouletteDataCat2[newPrizeNumber].option);
            }
        } 
    }

    const handleStopSpinning = () => {
        setMustSpin(false);
        openRewardModal();
    }

    const handleClaim = async () => {
        closeRewardModal();

        navigate('/reward-redemption-history');

        await new Promise((resolve) => setTimeout(resolve, 500))
        toast.success("Reward claimed");
    }
   
    // autosuggest
    function getSuggestions(value) { 
        return listVisitor.filter(visitor => 
            visitor.idVisitor.toLowerCase().includes(value.trim().toLowerCase()) ||
            visitor.name.toLowerCase().includes(value.trim().toLowerCase())
        );
    }
      
    function getSuggestionValue(suggestion) {
        return suggestion.idVisitor;
    }

    function renderSuggestion(suggestion) {
        return (
          <span>{suggestion.idVisitor} : {suggestion.name}</span>
        );
    }
    
    return (

        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            {( role === 'OPERATION' ) && (
                <NavbarOperation style={{ zIndex: 999 }} />
            )}

            {( role === 'ADMIN' ) && (
                <NavbarAdmin style={{ zIndex: 999 }} />
            )}

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Redeem Reward</h1>
                    <div>
                            <p className="subtitle">Add data to redeem reward.</p>
                    </div>
                </div>
            </div>

            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />
            
        <form
            className="flex flex-row items-center pt-8 pb-20 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
             onSubmit={(e) => onSubmit(e)}
        >

        <div className="flex flex-col space-y-4 pl-40">
        {points < 1500 ? (
            rouletteDataCat1.length === 0 ? (
                <p>No Reward Available</p>
                ) : (
                <div style={{ border: 'none', zIndex: '0' }}>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={rouletteDataCat1}
                    spinDuration={[0.4]}
                    textColors={['#ffffff']}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[9]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[1]}
                    textDistance={55}
                    fontSize={[15]}
                    backgroundColors={[
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f",
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f"
                    ]}
                    onStopSpinning={handleStopSpinning}
                />
                </div>
                )
            ) : (
            rouletteDataCat2.length === 0 ? (
                <p>No Reward Available</p>
                ) : (
                <div style={{ border: 'none', zIndex: '0' }}>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={rouletteDataCat2}
                    spinDuration={[0.4]}
                    textColors={['#ffffff']}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[9]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[1]}
                    textDistance={55}
                    fontSize={[15]}
                    backgroundColors={[
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f",
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f"
                    ]}
                    onStopSpinning={handleStopSpinning}
                />
                </div>
            ))}
            {errors.roulette && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.roulette}
                </span>
            )}
        </div>

        {/* <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Add New Reward</h1> */}
        <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

            {/* visitor */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="visitor">
                Visitor ID<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.visitor && "border-danger"}`}>
                <AutoSuggest 
                    id="visitor"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={({ value }) => {
                        // console.log(value);
                        // console.log(suggestions);
                        setValue(value);
                        setSuggestions(getSuggestions(value));}}
                    onSuggestionsClearRequested={() => setSuggestions([])}
                    onSuggestionSelected={(_, { suggestionValue }) => {
                        setVisitor(suggestionValue);
                        // console.log("Selected: " + visitor);
                    }
                    }
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        placeholder: "Insert Your Visitor ID",
                        value: value,
                        className: "px-4 py-3 w-full focus:outline-none text-left",
                        // onChange: {(e) => setValue(e.target.value)}
                        onChange: (_, { newValue }) => {
                            setValue(newValue);
                        }
                    }} 
                />
            </div>

            {errors.visitor && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.visitor}
                </span>
            )}
            </div>

            {/* points to redeem */}
            <div className="input-form flex flex-col space-y-1">
                <label className="input-label font-reynaldo text-left" htmlFor="points">
                    Points to Redeem<span className="text-danger">*</span>
                </label>

                <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.points && "border-danger"}`}>
                    <input
                    id="points"
                    type="number"
                    className="px-4 py-3 w-full focus:outline-none"
                    placeholder="Insert Points"
                    value={points}
                    // onChange={(e) => setPoints(e.target.value)} 
                    onChange={handlePointsChange} 
                    />
                </div>

                {errors.points && (
                    <span className="mt-0.5 text-danger text-xs">
                    {errors.points}
                    </span>
                )}
            </div>

            {/* event */}
            <div className="input-form flex flex-col">
            <label className="input-label font-reynaldo text-left" htmlFor="event">
                Event
            </label>

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
                <input
                    id="event"
                    className="px-4 py-3 w-full focus:outline-none bg-gray-100"
                    value={eventData.eventName}
                    readOnly
                />
            </div>
            </div>

            <br></br>
            <div>
                <button className="button-green" onClick={handleBack}>Cancel</button>
                <button className="button-pink" type="submit">Redeem</button>
            </div>
        </div>

        
        <Modal
            isOpen={isConfirmationModalOpen}
            onRequestClose={closeConfirmationModal}
            id="modal-confirmation"
        >
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                <p className="text-center text-gray-700">Are you sure you want to add reward?</p>
                <br></br>
                <div>
                    <button className="button-red text-center" onClick={closeConfirmationModal}>Cancel</button>
                    <button className="button-green text-center" onClick={confirmSubmit}>Confirm</button>
                </div>
        </Modal>

        <Modal
            isOpen={isRewardModalOpen}
            onRequestClose={closeRewardModal}
            id="modal-reward"
        >
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Congratulations! You got this reward:</h2>
                <h2 className="text-center text-gray-700">{stringRewardPicked}</h2>
                <br></br>
                <div>
                    <button className="button-green text-center" onClick={handleClaim}>Claim</button>
                </div>
        </Modal>

        <br></br>

        </form>
        </div>
    );
};
export default AddRewardRedemptionData;