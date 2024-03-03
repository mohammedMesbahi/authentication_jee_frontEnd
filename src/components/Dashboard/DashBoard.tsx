import React, { useState } from 'react';
import './Dashboard.css';
import User from "../../Models/User";
import { useEffect } from 'react';
import UsersDataGrid from "./UsersDataGrid";
import NavBar from "../NavBar/NavBar";
const Dashboard: React.FC = () => {
    return (
        <div className={'dashboard'} >
            <NavBar />
            <UsersDataGrid />
        </div>
    );


};
export default Dashboard;
