import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarGuest } from '../../components/navbar/NavbarGuest';
import { useParams } from 'react-router-dom';

import '../../static/css/Button.css';

const VisitorRegistrationSuccessPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventPass = urlParams.get('eventPass');

    return (
        <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            {/* <style>{reynaldoStyles}</style> */}
            <NavbarGuest />

            <div className="flex flex-col items-center my-13 mx-auto px-4" style={{ width: '500px' }}>
                <div className="relative flex flex-col items-center mt-44 pt-10 pb-6 px-4 w-full text-center bg-tertiary-30 rounded-lg shadow">
                    <div className="flex items-center space-x-2 text-tertiary-100">
                        <h1 className="font-reynaldo text-2xl"><b>Registration Successful!</b></h1>
                    </div>

                    <p className="mt-4 text-tertiary-90 text-lg">
                    Congratulations! You've successfully registered as a visitor for our event. Thank you for choosing to be part of the excitement!
                    </p> <br></br>

                    <div className="flex items-center space-x-2 text-tertiary-100">
                        <h1 className="font-reynaldo text-xl"><b>Your Event Pass</b></h1>
                    </div>
                    <div className="flex items-center space-x-2 text-tertiary-100">
                        <h1 className="font-reynaldo text-3xl"><b>{eventPass}</b></h1>
                    </div> <br></br>

                    <p className="text-tertiary-90 text-lg">
                    We've sent you an email containing all the details of your registration. Please check your inbox for further information.
                    </p> <br></br>

                    <Link to="/" className="button-green text-center">Back to Dashboard</Link>
                </div>
            </div>
            <br></br>
            <br></br>
        </main>
    )
}

export { VisitorRegistrationSuccessPage };