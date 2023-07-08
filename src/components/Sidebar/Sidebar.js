import React from "react";
import closeIcon from "../../images/close.svg";
import "./Sidebar.css";

const Sidebar = ({ open, categories = [], onSelect, onClose }) => {
  return (
    <div className={`sidebar-container ${open && "sidebar-container_opened"}`}>
      <div className={`sidebar ${open && "sidebar_opened"}`}>
        <div className="sidebar__header">
          <p className="sidebar__title">Categories</p>
          <img
            src={closeIcon}
            alt="close icon"
            onClick={onClose}
            className="sidebar__icon"
          />
        </div>
        <ul className="sidebar__list">
          {categories.map((category, index) => (
            <li
              key={`category-${index}`}
              className="sidebar__item"
              onClick={() => onSelect(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
