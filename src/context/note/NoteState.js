import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [note, setNote] = useState({ success: false, notes: [] });

  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNote(json);
  };

  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // UI Update logic
    const json = await response.json();
    setNote((prevNote) => ({
      success: json.success,
      notes: [...prevNote.notes, json.note],
    }));
  };

  const editNote = async (id, title, description, tag) => {
    // API Call
    await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // UI Update Logic
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
    // API Call
    await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    // UI Update logic
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
