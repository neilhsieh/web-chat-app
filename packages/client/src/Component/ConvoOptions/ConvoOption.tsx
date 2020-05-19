import './convoOptions.scss'

import React, { useState, FormEvent, useRef, useEffect } from 'react';

export const ConvoOptions = () => {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const dropdown = useRef(null);

  useEffect(() => {
    openTransition();
  }, [dropDownOpen]);

  const openTransition = () => {
    const dropdownContainer = dropdown!.current;

    if (dropDownOpen) {
      dropdownContainer!.style.display = 'flex';
      setTimeout(() => {
        dropdownContainer!.classList.add('opened');
      }, 50);
    } else {
      dropdownContainer!.style.opacity = '0';
      setTimeout(() => {
        dropdownContainer!.classList.remove('opened');
        dropdownContainer!.style.display = 'none';
        dropdownContainer!.style.removeProperty('opacity');
      }, 300);
    }
  };

  const showDropdown = (e: FormEvent) => {
    e.preventDefault();
    setDropDownOpen(!dropDownOpen);
  };

  return <div className="convo-opt">
    <button className="convo-opt-btn" onClick={showDropdown}>
      <i className="fas fa-ellipsis-h"></i>
    </button>
    <div ref={dropdown} className={`convo-opt-dropdown`}>
      <ul>
        <li>
          <a>Show All Users</a>
        </li>
        <li>
          <a>Delete Convo</a>
        </li>
      </ul>
    </div>

  </div >;
};
