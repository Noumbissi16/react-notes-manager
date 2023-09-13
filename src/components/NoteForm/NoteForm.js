import { PencilFill, TrashFill } from "react-bootstrap-icons";
import s from "./style.module.css";
import React, { useState } from "react";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import { ValidatorService } from "utils/validator";
import FieldError from "components/FieldError/FieldError";

const VALIDATOR = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

function NoteForm({
  title,
  onClickEdit,
  onSubmit,
  onClickDelete,
  isEditable = true,
  note,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });

  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });

  const upDateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  };

  const validate = (filedName, fieldValue) => {
    setFormErrors({
      ...formErrors,
      [filedName]: VALIDATOR[filedName](fieldValue),
    });
  };

  const hasError = () => {
    for (const filedName in formErrors) {
      if (formErrors[filedName]) {
        return true;
      }
    }
    return false;
  };
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickDelete && (
          <TrashFill onClick={onClickDelete} className={s.icon} />
        )}
      </div>
    </>
  );
  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        type="text"
        name="title"
        className="form-control"
        onChange={upDateFormValues}
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );
  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <textarea
        type="text"
        name="content"
        className="form-control"
        rows={5}
        onChange={upDateFormValues}
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );
  const submitBtn = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisable={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {" "}
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? contentInput : <pre>{note.content}</pre>}
      </div>
      {onSubmit && submitBtn}
    </div>
  );
}

export default NoteForm;
