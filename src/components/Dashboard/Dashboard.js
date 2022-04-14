import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
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

    console.log(timeSlot[0]?.available);

    // console.log(moment(setMyEventDate.date));
    // console.log(myEventDate);
    return (
        <div className="row">
            <div className="col-2 right-nav">
                <img className="img-fluid mx-auto d-block mt-4" src={logo} alt="logo" />
                <ul className="side-menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Demo</a></li>
                    <li><a href="#">Demo</a></li>
                </ul>
            </div>
            <div className="col-10">
                <div className="head">

                </div>
                <div className="main-area">
                    <span className="fs-3"><AiOutlineArrowLeft /></span>
                    <h2 className="fw-bold mt-3">Book Demo Session Slot</h2>
                    <h3 className="fw-bold mt-5">Select Date</h3>
                    {
                        myEventDate.map(selectDate => <button key={selectDate.date} onClick={() => handleTimeSlot(selectDate.date)}>{moment.utc(selectDate.date).format("MMM DD ddd")}</button>)
                    }
                    <h3 className="fw-bold mt-5">Select Slote</h3>
                    {
                        timeSlot[0]?.available.map((t, index) => <button key={index}>{t.hour}:{t.min}-{t.hour + 1}:{t.min}</button>)
                    }
                    <button type="button" className="btn btn-success mt-5">Proceed to Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;