import * as React from 'react';
import {DataGrid, GridColDef, GridEventListener, GridRowParams, GridValueGetterParams} from '@mui/x-data-grid';
import User from "../../Models/User";
import {Button} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 130},
    {field: 'email', headerName: 'Email', width: 130},
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


type UsersTableProps = {
    listOfUsers: User[];
}
export default function UsersDataGrid({listOfUsers}: UsersTableProps) {
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [message, setMessage] = React.useState<string>('');
    const handleRowClick = (params: GridRowParams) => {
        setSelectedUser(params.row as User);
        setMessage('You have selected ' + selectedUser?.name);
        setOpen(true);
    }
    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (<>
            <div style={{height: 400}}>
                <DataGrid
                    rows={listOfUsers}
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
                        disabled={selectedUser == null || selectedUser.verified}
                        color={'success'} style={{
                    margin: '10px'
                }}>verify</Button>
                <Button variant="outlined"
                        disabled={selectedUser == null || selectedUser.verified}

                        color="error">delete</Button>
            </center>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>

    );
}
