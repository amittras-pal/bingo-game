import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./NumberTile.scss";

function NumberTile({ letter, value, isHeader, isSelected, onSelect }) {
  // const [isSelected, setIsSelected] = useState(typeof value === "string");
  return (
    <>
      {isHeader ? (
        <button
          className={`number-tile ${isHeader ? "header-tile" : ""}`}
          disabled
        >
          <span className="tile-value">{value}</span>
        </button>
      ) : (
        <button
          className={`number-tile ${
            isSelected ? "number-tile--selected" : "number-tile--unselected"
          } `}
          onClick={() => onSelect(letter, value)}
          disabled={isSelected}
        >
          <span className="tile-value">
            {typeof value === "string" ? (
              <FontAwesomeIcon icon={faStar} />
            ) : (
              value
            )}
          </span>
        </button>
      )}
    </>
  );
}

export default NumberTile;
