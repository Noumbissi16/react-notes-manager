import React from "react";
import s from "./style.module.css";

function FieldError({ msg }) {
  return <span className={`${s.container}`}>{msg}</span>;
}

export default FieldError;
