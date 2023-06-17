import React, { useState } from "react";
import arrow from "../../images/filterIcon.svg";
import "./Dropdown.css";

const Dropdown = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  const handleClick = (item) => {
    selectItem(item);
    onSelect(item);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__header">
        <span className="dropdown__title">
          {selectedItem ? selectedItem : title}
        </span>

        <img
          src={arrow}
          alt="arrow icon"
          className={`${isOpen ? "dropdown__icon_opened" : "dropdown__icon"}`}
          onClick={handleOpen}
        />
      </div>
      {isOpen && (
        <ul className="dropdown__list">
          {items.map((item, index) => (
            <li key={index} className="dropdown__list-item">
              <button
                onClick={() => handleClick(item)}
                className="dropdown__option"
              >
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
