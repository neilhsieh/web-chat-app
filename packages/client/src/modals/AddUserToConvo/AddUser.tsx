import './addUser.scss';

import React, { useState } from 'react';
import { Modal } from '../../Component/Modal/Modal';

export const AddUser = () => {

  const [userModalOpen, setUserModalOpen] = useState<boolean>();
  const newUserClick = (e) => {
    e.preventDefault();

  }
  return <div className="add-user-convo">
    <button onClick={newUserClick}>
      + AddUser
    </button>
    <Modal
      title="Add new users:"
      className="new-user-modal">
      <div className="modal-popup">

        Add New User
      </div>

    </Modal>
  </div>
};
