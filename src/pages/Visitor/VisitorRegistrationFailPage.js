import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarGuest } from '../../components/navbar/NavbarGuest';

import { reynaldoStyles } from "../../assets/fonts/fonts";
import '../../static/css/Button.css';

const VisitorRegistrationFailPage = () => {
    return (
        <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <style>{reynaldoStyles}</style>
            <NavbarGuest />

            <div className="flex flex-col items-center my-13 mx-auto px-4" style={{ width: '500px' }}>

                <div className="relative flex flex-col items-center mt-44 pt-10 pb-6 px-4 w-full text-center bg-secondary-20 rounded-lg shadow">
                    <div className="flex items-center space-x-2 text-secondary-100">
                        <h1 className="font-reynaldo text-2xl"><b>Registration Unsuccessful</b></h1>
                    </div>
                    <p className="mt-4 text-secondary-90 text-lg">
                    We're sorry, but it seems there was an issue with your visitor registration. To proceed, we kindly ask you to resubmit your registration form.
                    </p> 

                    <p className="mt-4 text-secondary-90 text-lg">
                    Please make sure that the email or telephone number you registered is valid and has not been used for this event yet.
                    </p> <br></br>

                    <p className="text-secondary-90 text-lg">
                    If you encounter any persistent issues or have questions, please don't hesitate to reach out to our support team at whoosshsielala@gmail.com
                    </p> <br></br>

                    <Link to="/" className="button-brown text-center">Back to Dashboard</Link>
                </div>
            </div>
        </main>
    )
}

export { VisitorRegistrationFailPage };