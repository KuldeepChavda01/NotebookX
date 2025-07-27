import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/note/noteContext";
import ThemeContext from "../context/theme/themeContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const noteContext = useContext(NoteContext);
  const { note, getNotes, editNote } = noteContext;
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const allNotes = note.notes;
  const { showAlert, isLoggedIn } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const [modal, showModal] = useState(false);

  const [editNoteData, setEditNoteData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!editNoteData.etitle.trim()) {
      newErrors.titleError = "Title is required";
    } else if (editNoteData.etitle.length < 2) {
      newErrors.titleError = "Title must be atleast two character";
    }

    if (!editNoteData.edescription.trim()) {
      newErrors.descError = "Description is required";
    } else if (editNoteData.edescription.length < 5) {
      newErrors.descError = "Description must be atleast five character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }

    return Object.keys(newErrors).length === 0;
  };

  // Function to open modal
  const updateNote = (currentNote) => {
    showModal(true);
    setEditNoteData({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Input change handler
  const onEditFormChange = (e) => {
    setEditNoteData({ ...editNoteData, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const validationSuccess = validate();
    if (validationSuccess) {
      editNote(
        editNoteData.id,
        editNoteData.etitle,
        editNoteData.edescription,
        editNoteData.etag
      );
      showModal(false);
      showAlert("Note Updated Successfully", "Success");
    }
  };

  // Breakpoints for responsive columns for Masonry
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <div>
      <AddNote showAlert={showAlert} />

      <div className={`modal ${modal ? "show-modal" : ""}`}>
        <div
          className={`modal-content ${modal ? "show-content" : ""} bg-${
            theme === "light" ? "primary" : "secondary"
          } border-${theme === "light" ? "dark" : "primary"}`}
        >
          <h1
            className={`modal-heading text-${
              theme === "light" ? "dark" : "light"
            }`}
          >
            Edit Note
          </h1>
          <form className="modal-form" onSubmit={handleEditSubmit}>
            <label
              htmlFor="etitle"
              className={`text-${theme === "light" ? "dark" : "light"}`}
            >
              Title
            </label>
            {errors.titleError && (
              <small className="error-msg">{errors.titleError}</small>
            )}
            <input
              type="text"
              className={`bg-${theme === "light" ? "light" : "grey"} text-${
                theme === "light" ? "dark" : "light"
              } }`}
              name="etitle"
              id="etitle"
              onChange={onEditFormChange}
              value={editNoteData.etitle}
            />
            <label
              htmlFor="edescription"
              className={`text-${theme === "light" ? "dark" : "light"}`}
            >
              Description
            </label>
            {errors.descError && (
              <small className="error-msg">{errors.descError}</small>
            )}
            <textarea
              className={`bg-${theme === "light" ? "light" : "grey"} text-${
                theme === "light" ? "dark" : "light"
              } }`}
              rows="2"
              name="edescription"
              id="edescription"
              onChange={onEditFormChange}
              value={editNoteData.edescription}
            ></textarea>
            <label
              htmlFor="tag"
              className={`text-${theme === "light" ? "dark" : "light"}`}
            >
              Tag
            </label>
            <input
              type="text"
              className={`bg-${theme === "light" ? "light" : "grey"} text-${
                theme === "light" ? "dark" : "light"
              } }`}
              name="etag"
              id="etag"
              onChange={onEditFormChange}
              value={editNoteData.etag}
            />
            <button
              className={`btn btn-${theme === "light" ? "primary" : "dark"}`}
              type="submit"
            >
              Update Note
            </button>
          </form>
          {/* <div className="modal-footer"> */}
          <button
            className={`btn btn-${
              theme === "light" ? "primary" : "dark"
            } close-modal-btn`}
            onClick={() => {
              showModal(false);
            }}
          >
            &times;
          </button>
          {/* </div> */}
        </div>
      </div>

      <div
        className={`container notes ${
          theme === "light" ? "shadow-dark" : "bg-secondary"
        }`}
      >
        <h1 className={`heading text-${theme === "light" ? "dark" : "light"}`}>
          Your Notes
        </h1>
        {allNotes.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {allNotes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  note={note}
                  updateNote={updateNote}
                  showAlert={showAlert}
                />
              );
            })}
          </Masonry>
        )}
        <p
          className={`text-${theme === "light" ? "dark" : "light"}`}
          style={{ textAlign: "center" }}
        >
          {allNotes.length === 0 && "No notes to display"}
        </p>
      </div>
    </div>
  );
};

export default Notes;
