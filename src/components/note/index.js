import { useContext, useState, useRef, useEffect } from "react";
import { NotesContext } from "../../App";
function Note({ note }) {
    const { saveNote, deleteNote } = useContext(NotesContext);
    const [isEditMode, setIsEditMode] = useState(note.editmode);
    const [text, setText] = useState(note.text);
    const textareaRef = useRef(null);
    const handleSaveNote = () => {
        saveNote(note.id, text);
        setIsEditMode(false);
    }
    const getDateString = () => {
        const temp = new Date(note.timestamp).toDateString().split(" ");
        return `${temp[2]} ${temp[1]}  ${temp[3]}`
    }
    const adjustTextAreaHeight = () => {
        textareaRef.current.style.maxHeight = "1px";
        textareaRef.current.style.minHeight = "1px"
        textareaRef.current.style.height = "1px";
        textareaRef.current.minHeight = (Math.max(textareaRef.current.scrollHeight, 100)) + "px";
        textareaRef.current.style.height = null;
        textareaRef.current.style.maxHeight = null;
    }
    useEffect(() => {
        adjustTextAreaHeight();
    }, [text]);
    useEffect(() => {
        window.addEventListener("resize", adjustTextAreaHeight);
        return () => {
            window.removeEventListener("resize", adjustTextAreaHeight);
        }
    }, []);
    return (
        <div className="note" style={{
            background: note.theme,
        }}>
            <textarea ref={textareaRef} readOnly={!isEditMode} onChange={(e) => setText(e.target.value)}>{text}</textarea>
            <div className="footer">
                <p className="date">
                    {getDateString(note.timestamp)}
                </p>
                {!isEditMode && (
                    <button onClick={(e) => setIsEditMode(true)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                )}
                {isEditMode && (
                    <button onClick={handleSaveNote}>
                        <i className="fa fa-save"></i>
                    </button>
                )}
                <button onClick={(e) => deleteNote(note.id)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>

        </div>
    )


}
export default Note;