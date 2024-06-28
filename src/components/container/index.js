import { useContext } from "react";
import { NotesContext } from "../../App"; // Correct import path
import Note from "../note/index";

function NotesContainer() {
  const { notes } = useContext(NotesContext); // Destructure `notes` from the context

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <div className="notes-list">
        {notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesContainer;
