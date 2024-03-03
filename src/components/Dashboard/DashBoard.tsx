import React, { useState } from 'react';
import './Dashboard.css';
import User from "../../Models/User";
import listOfUsers from "../../data/users";
import { useEffect } from 'react';
import UsersDataGrid from "./UsersDataGrid";
import NavBar from "../NavBar/NavBar";
const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>(listOfUsers); // You can replace this with actual data
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filterUsers = (users: User[], searchTerm: string) => {
        return users.filter(user => user.name.startsWith(searchTerm) || user.email.startsWith(searchTerm));
    };

    useEffect(() => {
        setUsers(filterUsers(listOfUsers, searchTerm));
    }, [searchTerm]);
    return (
        <div className={'dashboard'} >
            <NavBar />
            <input
                style={{width: '100%', padding: '10px', margin: '10px 0'}}
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <UsersDataGrid listOfUsers={users}/>
        </div>
    );


};
export default Dashboard;
