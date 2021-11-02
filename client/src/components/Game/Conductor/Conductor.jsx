import React, { useState } from "react";
import "./Conductor.scss";

function Conductor() {
  const [currentNumber, setCurrentNumber] = useState(null);
  return (
    <div className="conductor">
      <div className="conductor__generator">
        <div className="tile">
          <div className="current-number">
            <h2>{currentNumber ? currentNumber : "Call the first Number"}</h2>
          </div>
          <button className="next-number">Next Number</button>
        </div>
      </div>
      <div className="conductor__stats"></div>
    </div>
  );
}

export default Conductor;
