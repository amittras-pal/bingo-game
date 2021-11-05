import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import AppRouter from "./components/router/Router";

function App() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
        rtl={false}
        theme="colored"
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App;
