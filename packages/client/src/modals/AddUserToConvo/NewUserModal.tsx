import './newUserModal.scss';


import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Modal } from '../../Component/Modal/Modal';
import { ToggleModalProp, User } from '../../lib/types';
import { api } from '../../lib/API';
import { useParams } from 'react-router';

interface AddUserProp {
  toggle: ToggleModalProp;
  // createNewConvo: (convo: Conversation) => void;
}

interface Params {
  conversationId: string;
}

export const NewUserModal: React.FC<AddUserProp> = ({
  toggle,
}) => {

  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [selectedUser, updateSelectedUser] = useState<User[]>([]);

  const usersList = useRef(null);
  const params = useParams<Params>();


  useEffect(() => {
    setSearchedUsers(searchWithoutSelected(searchedUsers));
  }, [selectedUser]);

  const searchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchUser = await api.searchUser(e.target.value);
    const sWS = searchWithoutSelected(searchUser);
    setSearchedUsers(sWS);
  };

  const searchWithoutSelected = (userList: User[]) => {
    const searchedWithoutSelected = userList.filter(user => {
      // Will return a boolean true if user is in selected user list
      const returnedBool = selectedUser.reduce((doesInclude, curUser) => {
        return doesInclude && curUser.id !== user.id;
      }, true);
      return returnedBool;
    });
    return searchedWithoutSelected;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = await api.addUserToConvo(params.conversationId, selectedUser[0].id);
    console.log(newUser);

  };

  const updateUsers = (u: User) => {
    updateSelectedUser([...selectedUser, u]);
  };

  const removeSelected = (u: User) => {
    const removeUserId = u.id;
    const newUsersList = [...selectedUser].filter(u => {
      return u.id !== removeUserId;
    });
    updateSelectedUser(newUsersList);
  };

  return <Modal
    title="Add new users:"
    toggle={toggle}
    className="new-user-modal">
    <div className="users-to-add">
      {selectedUser ? <ul>{selectedUser.map((u, key) =>
        <li key={key} onClick={() => { removeSelected(u); }}>
          {u.firstName} {u.lastName} <i className="fas fa-times"></i>
        </li>
      )}</ul> :
        null}
    </div>
    <form action="" onSubmit={submit}>
      <input type="text" placeholder="Search names:" name="user search" id="" onChange={searchUser} />
      <ul ref={usersList}>{searchedUsers.map((u, key) =>
        <li key={key} onClick={() => { updateUsers(u) }}>
          {u.firstName} {u.lastName} <i className="fas fa-plus"></i></li>
      )}</ul>
      <div className="button-group">
        <button className="submit" type="submit" >Add User</button>
        <button className="close-modal" type="button" onClick={
          toggle?.toggleOpened
        }>Cancel</button>
      </div>
    </form>
  </Modal >
};
