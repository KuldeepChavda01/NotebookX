import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [note, setNote] = useState({
    success: false,
    notes: [],
  });

  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    setNote({
      success: json.success,
      notes: json.notes,
    });
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    setNote((prevNote) => ({
      success: json.success,
      notes: [...prevNote.notes, json.note],
    }));
  };

  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/note/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNotes = JSON.parse(JSON.stringify(note.notes));

    for (let i = 0; i <= newNotes.length; i++) {
      const element = newNotes[i];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }

    setNote({ success: true, notes: newNotes });
  };

  const deleteNote = async (id) => {
    await fetch(`${host}/api/note/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const newNote = note.notes.filter((note) => {
      return note._id !== id;
    });

    setNote({ success: true, notes: newNote });
  };

  return (
    <NoteContext.Provider
      value={{ note, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
