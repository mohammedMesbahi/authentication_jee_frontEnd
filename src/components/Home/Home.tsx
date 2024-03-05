import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import './Home.css';
import {useNavigate} from "react-router-dom";
import Note from "../../Models/Note";
import axios from 'axios';
import proxy from '../../configs/config';
import User from "../../Models/User";
const Home: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
   
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            navigate('/login?success=You have been logged out');
        } catch (error: any) {
            console.error(error);
        }
    }

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('success') || ''
    );
    const [errorMessage, setErrorMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('error') || ''
    );
  
  
  
    
    
    const handleSubmit = async (e: React.FormEvent) => {            
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                proxy.newNote,
                {
                    id:null,
                    subject: subject,
                    body: body,
                    date_time: null,
                    id_user: user.id},
                {headers: {'Content-Type': 'application/json'}}
            );
            setSuccessMessage(response.data);
        } catch (error: any) {
            setErrorMessage(error.response.data);
        } finally {
            setIsSubmitting(false);
            getNotes();
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
                    data:note,
                    headers: {'Content-Type': 'application/json'}
                }
            );
            setSuccessMessage(response.data);
        } catch (error: any) {
            setErrorMessage(error.response.data);
        } finally {
            getNotes();
        }
    }


    const getNotes=()=>{
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${proxy.allNotes}/${user.id}`);
                setNotes(response.data)
                
            } catch (error) {
                console.error('Error fetching notes:', error);
                setErrorMessage('Error fetching notes');
            } finally {
                setIsSubmitting(false);
            }
        };
    
        fetchNotes();
    }
    useEffect(() => {
        getNotes();

    },[])
    return (
        <div className="home-container">
            <NavBar />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                marginTop: '20px',
            }}
            >
                <form className="note-form" >
                    <label>
                        Subject:
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                    </label>
                    <label>
                        Body:
                        <textarea style={{resize:'none'}} rows={10} value={body} onChange={e => setBody(e.target.value)} />
                    </label>
                    <input type="submit" value={isSubmitting ? 'Saving...' : 'Submit'} className="submit-btn"
                           disabled={isSubmitting}
                           onClick={handleSubmit}/>
                </form>
                <div className="notes-container">
                    {
                        notes.map((note, index) => {
                            return (
                                <div className="note-component" id={`note-${note.id}`} key={note.id} data-note={JSON.stringify(note)}>
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
        </div>
    );
}
export default Home;