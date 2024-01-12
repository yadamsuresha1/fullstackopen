import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });
    setNewNote("");
  };
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          value={newNote}
          onChange={handleChange}
          placeholder="write note content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
