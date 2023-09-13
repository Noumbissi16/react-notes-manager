import { NoteAPI } from "api/note-api";
import NoteForm from "components/NoteForm/NoteForm";
import { withAuthRequired } from "hoc/withAuthRequired";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/notes-slice";

export function Note() {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.noteSlice.noteList.find((note) => note.id === noteId)
  );
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);

  const submit = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  };
  const navigate = useNavigate();
  async function deleteNote_() {
    if (window.confirm("Delete note ? ")) {
      NoteAPI.deletById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }

  return (
    <div>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit note" : note.title}
          note={note}
          onClickDelete={deleteNote_}
          onClickEdit={() => {
            setIsEditable(!isEditable);
          }}
          onSubmit={isEditable && submit}
        />
      )}
    </div>
  );
}

export const ProtectedNote = withAuthRequired(Note);
