import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import './Home.css';
import {useNavigate} from "react-router-dom";
import Note from "../../Models/Note";

const Home: React.FC = () => {
    const navigate = useNavigate();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    }
    useEffect(() => {
        // generate dummy notes
        const notes: Note[] = [];
        for (let i = 0; i < 10; i++) {
            notes.push({id:i,subject: `Subject ${i}`, body: `Body ${i}`,date_time: new Date().toString(), id_user: 1});
        }
        setNotes(notes);
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
                <form className="note-form" onSubmit={handleSubmit}>
                    <label>
                        Subject:
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                    </label>
                    <label>
                        Body:
                        <textarea style={{resize:'none'}} rows={10} value={body} onChange={e => setBody(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div className="notes-container">
                    {
                        notes.map((note, index) => {
                            return (
                                <div className="note-component" key={note.id}>
                                    <h4>{note.subject}</h4>
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