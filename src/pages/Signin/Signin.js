import React, { useState } from "react";
import s from "./style.module.css";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/input/input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { AuthApi } from "api/auth-api";
import { setUser } from "store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "utils/sweet-alert";

function Signin() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log(password, email);
    try {
      const user = await AuthApi.signin(email, password);
      dispatch(setUser(user));
      await toast("success", "Auth Succeed");
      navigate("/");
    } catch (e) {
      console.log("Auth failed");
      toast("error", e.message);
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signin <br />
        to access your team notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} type={"email"} onTextChange={setEmail} />

        <Input
          placeholder={"Password"}
          type={"password"}
          onTextChange={setPassword}
        />

        <ButtonPrimary type={"submit"} className={s.button}>
          Sign In !
        </ButtonPrimary>
        <span>
          Don't have an account yet ? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}

export default Signin;
