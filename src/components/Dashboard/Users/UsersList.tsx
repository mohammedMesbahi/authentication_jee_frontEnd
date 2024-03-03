import React from 'react';

import './UsersList.css';
import User from '../../../Models/User';
import UserComponent from "./User/UserComponent";

interface UsersProps {
    users: User[];
}

const UsersList: React.FC<UsersProps> = ({users}) => {

    return (
        <div className={'usersListContainer'} >
            {users.map((user,index) => {
                return (
                    <UserComponent user={user} key={index}/>
                );
            })}
        </div>
    );
};
export default UsersList;