import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  HashRouter,
  Route,
} from "react-router-dom";
import BookForm from "./components/BookForm/BookForm";
import Main from "./components/Main";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/BookForm" element={<BookForm />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
