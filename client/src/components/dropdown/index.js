import React from "react";
import './index.css'

function splitAndAddComma(str) {
  return `${str.substring(0, 4)}-${str.substring(4)}`;
}

function Dropdown({ options, handleChange, value, comp}) {
  return (
    <select
      value={value}
      onChange={handleChange}
      className="custom-select"
    >
      {options.map((option) => (
        <option value={option}>{comp=="modal"?String(option):splitAndAddComma(String(option))}</option>
      ))}
    </select>
  );
}

export default Dropdown;
