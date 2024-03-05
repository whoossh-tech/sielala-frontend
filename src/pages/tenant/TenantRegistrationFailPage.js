import React from 'react';
import { Link } from 'react-router-dom';

import '../../static/css/Button.css';

const TenantRegistrationFailPage = () => {
    return (
        <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <div className="fixed bottom-0 left-1/2 max-md:w-[180vw] -translate-x-1/2 translate-y-1/4 md:translate-y-1/2">
            </div>

            <div className="flex flex-col items-center my-13 mx-auto px-4" style={{ width: '500px' }}>

                <div className="relative flex flex-col items-center mt-44 pt-10 pb-6 px-4 w-full text-center bg-secondary-20 rounded-lg shadow">

                <div className="flex items-center space-x-2 text-secondary-100">
                    <h1 className="font-reynaldo text-2xl"><b>Registration Unsuccessful</b></h1>
                </div>

                <p className="mt-4 text-secondary-90 text-lg">
                We're sorry, but it seems there was an issue with your tenant registration. To proceed, we kindly ask you to resubmit your registration form.
                </p>

                <br></br>

                <p className="text-secondary-90 text-lg">
                If you encounter any persistent issues or have questions, please don't hesitate to reach out to our support team at whoosshsielala@gmail.com
                </p>

                <br></br>

                <Link to="/" className="button-brown text-center">Back to Dashboard</Link>

                </div>
            </div>
        </main>
    )
}

export { TenantRegistrationFailPage };