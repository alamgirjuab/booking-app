import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiMenuAlt2 } from 'react-icons/hi';
import './Dashboard.css';
import logo from '../../img/logo.png';
import moment from 'moment';

const Dashboard = () => {
    const [myEventDate, setMyEventDate] = useState([]);
    const [myEventTime, setMyEventTime] = useState([]);

    useEffect(() => {
        fetch('https://mentorplus.s3.ap-south-1.amazonaws.com/config/availability.json')
            .then(res => res.json())
            .then(data => setMyEventDate(data));
    }, [])

    const handleTimeSlot = getTime => {
        return setMyEventTime(getTime);
    }

    const timeSlot = myEventDate.filter(availableSlot => availableSlot.date === myEventTime);

    return (
        /* Mobile View */
        <>
            <div className="mobile-view">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img className="img-fluid" src={logo} alt="logo" /></a>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <HiMenuAlt2 />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-area">
                            <h2 className="fw-bold mt-3">Book Demo Session Slot</h2>
                            <div className="my-border-bottom">
                                <div className="border-bottom-left"></div>
                                <div className="border-bottom-right"></div>
                            </div>
                            <h3 className="fw-bold mt-5">Select Date</h3>
                            {
                                myEventDate.map(selectDate => <button className='btn-date' key={selectDate.date} onClick={() => handleTimeSlot(selectDate.date)}>{moment.utc(selectDate.date).format("ddd DD MMM")}</button>)
                            }
                            <h3 className="fw-bold mt-5">Select Slote</h3>
                            {
                                timeSlot[0]?.available.map((t, index) => <button className="btn-time" key={index}>{t.hour}:{t.min} PM - {t.hour + 1}:{t.min} PM</button>)
                            } <br />
                            <button type="button" className="btn mt-3 pay-btn">Proceed to Pay</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop View */}

            <div className="row m-0 desktop-view">
                <div className="col-md-2 right-nav">
                    <img className="img-fluid mx-auto d-block mt-4" src={logo} alt="logo" />
                    <ul className="side-menu mt-5 p-0">
                        <li><a className="active" href="#">Home</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a className="transparent-color" href="#">Demo</a></li>
                        <li><a className="transparent-color" href="#">Demo</a></li>
                    </ul>
                </div>
                <div className="col-md-10">
                    <div className="head">
                    </div>
                    <div className="main-area">
                        <span className="fs-3"><AiOutlineArrowLeft /></span>
                        <h2 className="fw-bold mt-3">Book Demo Session Slot</h2>
                        <div className="my-border-bottom">
                            <div className="border-bottom-left"></div>
                            <div className="border-bottom-right"></div>
                        </div>
                        <h3 className="fw-bold mt-5">Select Date</h3>

                        {
                            myEventDate.map(selectDate => <button className='btn-date' key={selectDate.date} onClick={() => handleTimeSlot(selectDate.date)}>{moment.utc(selectDate.date).format("ddd DD MMM")}</button>)
                        }
                        <h3 className="fw-bold mt-5">Select Slote</h3>
                        {
                            timeSlot[0]?.available.map((t, index) => <button className="btn-time" key={index}>{t.hour}:{t.min} PM - {t.hour + 1}:{t.min} PM</button>)
                        } <br />
                        <button type="button" className="btn pay-btn mt-3">Proceed to Pay</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;