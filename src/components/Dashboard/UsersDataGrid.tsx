import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import User from "../../Models/User";
import {Button} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import proxy from "../../configs/config";
import {useEffect, useState} from "react";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 170},
    {field: 'email', headerName: 'Email', width: 260},
    {
        field: 'verified',
        headerName: 'Verified',
        type: 'string',
        width: 90,
        valueFormatter: (params: any) => {
            return params.value === true ? 'Yes' : 'No';
        }
    },
];


export default function UsersDataGrid() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [message, setMessage] = React.useState<string>('');
    const [severity, setSeverity] = React.useState<"success" | "info" | "error">('success');
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filterUsers = (users: User[], searchTerm: string) => {
        return users.filter(user => {
            if (searchTerm &&  (user.name.startsWith(searchTerm) || user.email.startsWith(searchTerm))){
                return user;
            } else if (!searchTerm) {
                return user;
            }
        });
    };

    useEffect(() => {
        setUsers(filterUsers(users, searchTerm));
    }, [searchTerm]);

    React.useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(proxy.usersResource);
            setUsers(response.data);
        } catch (error: any) {
            setMessage(error.response.data);
            setSeverity('error');
            setOpen(true);
        }
    }
    const handleRowClick = (params: GridRowParams) => {
        setSelectedUser(params.row as User);
    }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const verifyUser = async () => {
        try {
            const response = await axios.put( proxy.verifyUser, {...selectedUser, verified: true});
            setMessage("User " + selectedUser?.name + " verified successfully");
            setSeverity('success');
            setOpen(true);
            setUsers(users.map(user => {
                if (user.id === selectedUser?.id) {
                    user.verified = true;
                }
                return user;
            }));
        } catch (error: any) {
            setMessage(error.response.data);
            setSeverity('error');
            setOpen(true);
        }
        finally {
            setSelectedUser(null);
        }
    }
    const deleteUser = async () => {
        try {
            const response = await axios.delete(proxy.deleteUser,
                {
                    data: selectedUser,
                    headers: {'Content-Type': 'application/json'}
                }
            );
            setMessage("User " + selectedUser?.name + " deleted successfully");
            setSeverity('success');
            setOpen(true);
            setUsers(users.filter(user => user.id !== selectedUser?.id));
        } catch (error: any) {
            setMessage("Error deleting user " + selectedUser?.name);
            setSeverity('error');
            setOpen(true);
        }
    }

    return (<>
            <input
                style={{width: '100%', padding: '10px', margin: '10px 0'}}
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{height: 400}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={handleRowClick}
                />
            </div>
            <center>
                <Button variant="contained"
                        onClick={verifyUser}
                        disabled={selectedUser == null || selectedUser.verified}
                        color={'success'} style={{
                    margin: '10px'
                }}>verify</Button>
                <Button variant="outlined"
                        onClick={deleteUser}
                        disabled={selectedUser == null }
                        color="error">delete</Button>
            </center>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>

    );
}
