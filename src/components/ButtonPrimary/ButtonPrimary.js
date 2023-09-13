import React from "react";
import s from "./style.module.css";

function ButtonPrimary({ className, children, onClick, isDisable, type }) {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      type={type}
      className={`btn btn-primary ${s.button} ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
