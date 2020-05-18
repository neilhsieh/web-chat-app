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
  const selectedUsers = useRef(null);
  const params = useParams<Params>();


  useEffect(() => {
    setSearchedUsers(searchWithoutSelected(searchedUsers));
    if (selectedUser.length > 0) {
      adjustUserListHeight();
    }
  }, [selectedUser]);

  const searchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchUser = await api.searchUser(e.target.value);
    setSearchedUsers(searchWithoutSelected(searchUser));
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
    selectedUser.forEach(async user => {
      await api.addUserToConvo(params.conversationId, user.id);
    });
    toggle?.toggleOpened();
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

  const adjustUserListHeight = () => {
    const selectedUsersHeight = selectedUsers.current!.getBoundingClientRect().height;
    const userList = usersList.current;
    const userListHeight = userList!.getBoundingClientRect().height;
    const maxHeight = parseInt(getComputedStyle(userList).maxHeight.split('px')[0]);

    if (selectedUsersHeight + userListHeight > maxHeight) {
      const deltaHeight = selectedUsersHeight + userListHeight - maxHeight;
      userList!.style.height = `${userListHeight - deltaHeight}px`;
    }
  };

  return <Modal
    title="Add new users:"
    toggle={toggle}
    className="new-user-modal">
    <div ref={selectedUsers} className="users-to-add">
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
