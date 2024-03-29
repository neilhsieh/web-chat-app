import './addUser.scss';

import React, { useState } from 'react';
import { NewUserModal } from '../../modals/AddUserToConvo/NewUserModal';

export const AddUser = () => {

  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);


  const toggleOpened = () => {
    setUserModalOpen(!userModalOpen);
  };

  return <div className="add-user-convo">
    <button onClick={toggleOpened}>
      <i className="fas fa-user-plus"></i>
    </button>


    <NewUserModal toggle={{ opened: userModalOpen, toggleOpened }} />

  </div>
};
