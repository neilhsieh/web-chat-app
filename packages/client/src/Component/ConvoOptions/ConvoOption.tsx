import './convoOption.scss'

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { DeleteConvo } from '../../modals/DeleteConvo/DeleteConvo';
import { hideOnClickOutside } from '../../lib/helperFunctions';

export const ConvoOptions = () => {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

  const dropdown = useRef(null);
  const backClickWrapper = useRef(null);


  useEffect(() => {
    openTransition();
  }, [dropDownOpen]);

  const toggleOpened = () => {
    setDeleteToggle(!deleteToggle);
  };

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

  const showDropdown = () => {
    // e.preventDefault();
    setDropDownOpen(!dropDownOpen);
  };

  const showAllUsers = () => {
    console.log('show all users');
    setDropDownOpen(!dropDownOpen);
  };

  const deleteConvo = () => {
    toggleOpened();
    setDropDownOpen(!dropDownOpen);
  };

  const closeOnClickOutside = () => {
    const backgroundElement = backClickWrapper.current;
    hideOnClickOutside(backgroundElement, showDropdown)
  };

  return <>
    {dropDownOpen && closeOnClickOutside()}
    <div className="convo-opt">
      <button className="convo-opt-btn" onClick={showDropdown}>
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <div ref={dropdown} className={`convo-opt-dropdown`}>
        <ul>
          <li>
            <a onClick={showAllUsers}>Show All Users</a>
          </li>
          <li>
            <a onClick={deleteConvo}>Delete Convo</a>
          </li>
        </ul>
      </div>
      <div ref={backClickWrapper} className="dropdown-outside-wrapper"></div>
      <>
        <DeleteConvo toggle={{ opened: deleteToggle, toggleOpened }} />
      </>
    </div >
  </>;
};
