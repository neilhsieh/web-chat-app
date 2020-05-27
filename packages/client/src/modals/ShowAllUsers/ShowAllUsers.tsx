import './showAllUsers.scss'

import React, { useEffect, useState } from 'react';
import { ToggleModalProp, Params, User } from '../../lib/types';
import { Modal } from '../../Component/Modal/Modal';
import { api } from '../../lib/API';

import { useParams } from 'react-router';

interface AddUserProp {
  toggle: ToggleModalProp;
}

export const ShowAllUsers: React.FC<AddUserProp> = ({ toggle }) => {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const params = useParams<Params>();

  useEffect(() => {
    if (toggle.opened) {
      getAllUsers();
    }
  }, [toggle.opened]);

  const getAllUsers = async () => {
    const convoUsers = await api.getUsersInConvo(params.conversationId);
    setAllUsers(convoUsers);
  };

  return <Modal
    title="Everyone in this convo:"
    toggle={toggle}
    className="show-all-user-convo-modal"
  >
    {allUsers && <ul className="convo-users-list">
      {allUsers.map((user, i) =>
        <li key={i}>{user.firstName} {user.lastName}</li>
      )}
    </ul>
    }
    <div className="button-group">
      <button className="close-modal" type="button" onClick={
        toggle?.toggleOpened
      }>Close</button>
    </div>
  </Modal>;
};
