import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import './Home.css';
import Note from "../../Models/Note";
import axios from 'axios';
import proxy from '../../configs/config';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {GridRowParams} from "@mui/x-data-grid";
import User from "../../Models/User";

const Home: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('success') || ''
    );
    const [message, setMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('error') || ''
    );
    const [severity, setSeverity] = React.useState<"success" | "info" | "error">('success');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorMessage(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                proxy.newNote,
                {
                    id: null,
                    subject: subject,
                    body: body,
                    date_time: null,
                    id_user: user.id
                },
                {headers: {'Content-Type': 'application/json'}}
            );
            setSuccessMessage("Note saved successfully");
        } catch (error: any) {
            setMessage(error.response.data);
        } finally {
            setIsSubmitting(false);
            await fetchNotes();
        }
    }


    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentNote = document.getElementById("note-" + e.currentTarget.id);
        if (!currentNote) {
            console.error("Note element not found");
            return;
        }
        const noteData = currentNote.getAttribute("data-note");


        // Parse the noteData string to convert it back to an object
        const note = JSON.parse(noteData || "{}");
        try {
            const response = await axios.delete(
                proxy.deleteNote,
                {
                    data: note,
                    headers: {'Content-Type': 'application/json'}
                }
            );
            setMessage("Note deleted successfully");
            setSeverity('info');
            setOpenErrorMessage(true);

        } catch (error: any) {
            setMessage("Error deleting note");
            setSeverity('error');
            setOpenErrorMessage(true);

        } finally {
            await fetchNotes();
        }
    }



        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${proxy.allNotes}/${user.id}`);
                setNotes(response.data)
                
            } catch (error) {
                console.error('Error fetching notes:', error);
                setMessage('Error fetching notes');
            }
        };

    useEffect(() => {
        fetchNotes();
    }, [])
    return (
        <div className="home-container">
            <NavBar/>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                marginTop: '20px',
            }}
            >
                <form className="note-form">
                    <label>
                        Subject:
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)}/>
                    </label>
                    <label>
                        Body:
                        <textarea style={{resize: 'none'}} rows={10} value={body}
                                  onChange={e => setBody(e.target.value)}/>
                    </label>
                    <input type="submit" value={isSubmitting ? 'Saving...' : 'Submit'} className="submit-btn"
                           disabled={isSubmitting}
                           onClick={handleSubmit}/>
                </form>
                <div className="notes-container">
                    {
                        notes.map((note, index) => {
                            return (
                                <div className="note-component" id={`note-${note.id}`} key={note.id}
                                     data-note={JSON.stringify(note)}>
                                    <div className="note-header">
                                        <h4>{note.subject} </h4>
                                        <a className="delete-btn" onClick={handleDelete} id={String(note.id)}>delete</a>
                                    </div>
                                    <p>{note.body}</p>
                                    <p>{note.date_time}</p>

                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Snackbar open={openErrorMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
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
        </div>
    );
}
export default Home;