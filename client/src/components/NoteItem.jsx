import { useContext } from "react";

import ThemeContext from "../context/theme/themeContext";
import NoteContext from "../context/note/noteContext";

const NoteItem = (props) => {
  const { note, updateNote, showAlert } = props;

  const themeContext = useContext(ThemeContext);
  const noteContext = useContext(NoteContext);

  const { theme } = themeContext;
  const { deleteNote } = noteContext;

  return (
    <>
      <div className={`note-item bg-${theme === "light" ? "primary" : "grey"}`}>
        <h3
          className={`note-heading text-${
            theme === "light" ? "dark" : "light"
          } border-${theme === "light" ? "secondary" : "primary"}`}
        >
          Title:- {note.title}
        </h3>

        <i
          className={`fa-solid fa-file-pen note-icon text-${
            theme === "light" ? "dark" : "light"
          }`}
          onClick={() => {
            updateNote(note);
          }}
        ></i>

        <i
          onClick={() => {
            deleteNote(note._id);
            showAlert("Note Deleted Successfully", "Success");
          }}
          className={`fa-solid fa-trash note-icon text-${
            theme === "light" ? "dark" : "light"
          }`}
        ></i>

        <p className={`note-data text-${theme === "light" ? "dark" : "light"}`}>
          {note.description}
        </p>

        <h3 className={`note-tag text-${theme === "light" ? "dark" : "light"}`}>
          Tag:- {note.tag}
        </h3>
      </div>
    </>
  );
};

export default NoteItem;
