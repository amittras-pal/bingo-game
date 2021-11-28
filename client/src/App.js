import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import AppRouter from "./components/router/Router";
import { toastDuration } from "./constants/constants";

function App() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={toastDuration}
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
