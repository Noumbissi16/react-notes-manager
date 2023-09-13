import React from "react";
import s from "./style.module.css";
import { useDispatch } from "react-redux";
import TextCard from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteAPI } from "api/note-api";
import { deleteNote } from "store/notes/notes-slice";

function NoteList({ noteList }) {
  // const noteList = useSelector((store) => store.noteSlice.noteList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function deleteNote_(note) {
    if (window.confirm("Delete note ? ")) {
      NoteAPI.deletById(note.id);
      dispatch(deleteNote(note));
    }
  }
  return (
    <div className={`row justify-content-center`}>
      {noteList.map((note) => {
        return (
          <div key={note.id} className={s.card_container}>
            <TextCard
              title={note.title}
              content={note.content}
              subtitle={note.created_at}
              onClick={() => navigate("/note/" + note.id)}
              onClickTrash={() => deleteNote_(note)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;
