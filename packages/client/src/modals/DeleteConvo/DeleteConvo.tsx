import './deleteConvo.scss';

import React, { useState, FormEvent, useEffect } from 'react';
import { Modal } from '../../Component/Modal/Modal';
import { ToggleModalProp, Params } from '../../lib/types';
import { useParams, Redirect } from 'react-router';
import { api } from '../../lib/API';

interface AddUserProp {
  toggle: ToggleModalProp;
  // createNewConvo: (convo: Conversation) => void;
}

export const DeleteConvo: React.FC<AddUserProp> = ({
  toggle,
}) => {

  const params = useParams<Params>();
  const [deleted, setDeleted] = useState<boolean>(false);

  const deleteConvo = async (e: FormEvent) => {
    e.preventDefault();
    await api.deleteConvo(params.conversationId);
    setDeleted(true);
  };

  const redirectFunc = () => {
    if (window.location.href.includes(`${params}`)) return;
    return <Redirect to="/" />;
  };

  return <>
    <Modal
      title="Are you sure you want to delete this conversation?"
      toggle={toggle}
      className="delete-convo-modal"
    >
      <form onSubmit={deleteConvo}>
        {/* <h2>/h2> */}
        <div className="button-group">
          <button className="delete" type="submit" >Delete Convo</button>
          <button className="close-modal" type="button" onClick={
            toggle?.toggleOpened
          }>Cancel</button>
        </div>
      </form>
    </Modal>
    {deleted ? redirectFunc() : null}
  </>
};
