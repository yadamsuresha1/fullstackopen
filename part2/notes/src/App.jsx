import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "../src/services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    noteService.getAll().then((notes) => {
      console.log(notes);
      setNotes(notes);
    });
  }, []);
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((createdNotes) => {
      setNotes(notes.concat(createdNotes));
      setNewNote("");
    });
  };
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const toggleImportanceOf = (id) => {
    //need to update this infomration into the server
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };
    noteService
      .update(id, changedNote)
      .then((updatedNotes) =>
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNotes)))
      )
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};
export default App;
