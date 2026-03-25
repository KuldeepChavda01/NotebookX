import { useContext, useState } from "react";

import ThemeContext from "../context/theme/themeContext";
import NoteContext from "../context/note/noteContext";

const AddNote = (props) => {
  const { showAlert } = props;

  const themeContext = useContext(ThemeContext);
  const noteContext = useContext(NoteContext);

  const { theme } = themeContext;
  const { addNote } = noteContext;

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!noteData.title.trim()) {
      newErrors.titleError = "Title is required";
    } else if (noteData.title.length < 2) {
      newErrors.titleError = "Title must be atleast two character";
    }

    if (!noteData.description.trim()) {
      newErrors.descError = "Description is required";
    } else if (noteData.description.length < 5) {
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

  const handleNoteData = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationSuccess = validate();

    if (validationSuccess) {
      const tag = noteData.tag.trim() === "" ? "General" : noteData.tag;

      addNote(noteData.title, noteData.description, tag);

      setNoteData({ title: "", description: "", tag: "" });

      showAlert("Note Added Successfully", "Success");
    }
  };

  return (
    <div className="container add-note-wrapper">
      <form
        className={`note-form-wrapper bg-${
          theme === "light" ? "primary" : "secondary"
        } `}
        onSubmit={handleSubmit}
      >
        <h1 className={`heading text-${theme === "light" ? "dark" : "light"}`}>
          Add a Note
        </h1>

        <label
          htmlFor="title"
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
          Title
        </label>
        {errors.titleError && (
          <small className="error-msg">{errors.titleError}</small>
        )}
        <input
          type="text"
          id="title"
          name="title"
          className={`bg-${theme === "light" ? "light" : "grey"} text-${
            theme === "light" ? "dark" : "light"
          } `}
          onChange={handleNoteData}
          value={noteData.title}
        />

        <label
          htmlFor="description"
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
          Description
        </label>
        {errors.descError && (
          <small className="error-msg">{errors.descError}</small>
        )}
        <textarea
          id="description"
          name="description"
          className={`bg-${theme === "light" ? "light" : "grey"} text-${
            theme === "light" ? "dark" : "light"
          } `}
          rows="5"
          onChange={handleNoteData}
          value={noteData.description}
        ></textarea>

        <label
          htmlFor="tag"
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
          Tag
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          className={`bg-${theme === "light" ? "light" : "grey"} text-${
            theme === "light" ? "dark" : "light"
          } `}
          onChange={handleNoteData}
          value={noteData.tag}
        />

        <button
          className={`btn btn-${theme === "light" ? "primary" : "dark"}`}
          type="submit"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
