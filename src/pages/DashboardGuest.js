import React from 'react';
import { NavbarGuest } from '../components/navbar/NavbarGuest';

const DashboardGuest = () => {
    return (
        <main>
            <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
            <NavbarGuest />
            <div className='my-5'>
                <h1>Hello, this is guest's dashboard</h1>
                <h2 className='reynaldo-serif-lean text-4xl'>This is Reynaldo serif lean</h2>
                <h2 className='reynaldo-serif-medium text-4xl'>This is Reynaldo serif medium</h2>
                <h2 className='reynaldo-italic-lean text-4xl'>This is Reynaldo italic lean</h2>
                <h2 className='reynaldo-italic-medium text-4xl'>This is Reynaldo italic medium</h2>
                <br></br>
                <p>Hello, this is guest's dashboard and a paragraph with lean montserrat</p>
                <p className='montserrat-med'>Hello, this is guest's dashboard and a paragraph with medium montserrat</p>
            </div>
        </main>
    )
}

export { DashboardGuest };