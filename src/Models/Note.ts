type Note ={
    id: number | null;
    subject: string;
    body: string;
    date_time: string | null;
    id_user?: number;
}
export default Note;