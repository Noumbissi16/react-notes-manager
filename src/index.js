import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import {  ProtectedApp } from "App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  ProtectedNoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import {  ProtectedNoteCreate } from "pages/NoteCreate/NoteCreate";
import {  ProtectedNote } from "pages/Note/Note";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Signin from "pages/Signin/Signin";
import Signup from "pages/Signup/Signup";
import { FirebaseApp } from "utils/firebase";
import { PersistGate } from "redux-persist/integration/react";

FirebaseApp.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedApp />}>
            <Route path="/" element={<ProtectedNoteBrowse />} />
            <Route path="/note/:noteId" element={<ProtectedNote />} />
            <Route path="/note/new" element={<ProtectedNoteCreate />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
