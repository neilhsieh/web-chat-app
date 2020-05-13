import './newUserModal.scss';

import React, { useState, FormEvent } from 'react';
import { Modal } from '../../Component/Modal/Modal';
import { ToggleModalProp, User } from '../../lib/types';
import { api } from '../../lib/API';

interface AddUserProp {
  toggle: ToggleModalProp;
  // createNewConvo: (convo: Conversation) => void;
}

export const NewUserModal: React.FC<AddUserProp> = ({
  toggle,
}) => {

  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [addUser, updateAddUser] = useState<User[]>([]);
  // const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  const searchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchUser = await api.searchUser(e.target.value);
    setSearchedUsers(searchUser);
  };

  const submit = () => {
    // const 
  };

  const updateUsers = (u: User, e: FormEvent) => {
    e.preventDefault();
    updateAddUser([...addUser, u]);

  };

  return <Modal
    title="Add new users:"
    toggle={toggle}
    className="new-user-modal">
    <div className="button-group">
      <form action="" onSubmit={submit}>
        <input type="text" name="user search" id="" onChange={searchUser} />
        <ul>{searchedUsers.map(u =>
          <li><a onClick={e => { updateUsers(u, e); }}> {u.firstName} + </a></li>
        )}</ul>
        <div className="button-group">
          <button className="submit" type="submit">Add User</button>
          <button className="close-modal" onClick={e => {
            e.preventDefault();
            toggle?.toggleOpened;
          }}>Cancel</button>
        </div>
      </form>
    </div>
  </Modal>
};
