import './newConvoModal.scss';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { api } from '../../lib/API';
import { Conversation, ToggleModalProp } from '../../lib/types';
import { Redirect } from 'react-router';
import { Conversations } from '../../containers/conversations.container';
import { Modal } from '../../Component/Modal/Modal';
import { useHistory } from "react-router-dom";

// import { Conversation } from '../../lib/types';

// import { api } from '../../lib/API';
interface AddConvoProp {
  toggle: ToggleModalProp;
  // createNewConvo: (convo: Conversation) => void;
}


export const NewConvoModal: React.FC<AddConvoProp> = ({
  toggle,
}) => {

  const [convo, updateConvo] = useState<Conversation>();
  const { conversations, createConversation } = Conversations.useContainer();

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
  }, [toggle]);

  const loadMe = async () => {
    await api.me();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const newConvo = await createConversation(input.current?.value!);
    updateConvo(newConvo);
    toggle?.toggleOpened();
    loadMe();
  };

  const redirectFunc = () => {
    const convoId = convo?.id;
    // Prevents multiple running of this function
    if (window.location.href.includes(`${convoId}`)) return;
    input!.current!.value = '';
    return <Redirect to={`/convo/${convoId}`} />;
  };

  return <>
    <Modal
      title="Start a new Convo!"
      toggle={toggle}
      className="new-convo-modal"
    >
      <form action="" onSubmit={submit}>
        <input
          name="name"
          type="text"
          placeholder="Name your convo..."
          ref={input}
        />
        <div className="button-group">
          <button className="submit" type="submit" >Start</button>
          <button className="close-modal" type="button" onClick={toggle?.toggleOpened}>Cancel</button>
        </div>
      </form>
    </Modal>
    {convo ? redirectFunc() : null}
  </>
};
