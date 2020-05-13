import './newConvoModal.scss';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { api } from '../../lib/API';
import { Conversation, ToggleModalProp } from '../../lib/types';
import { Redirect } from 'react-router';
import { Conversations } from '../../containers/conversations.container';
import { Modal } from '../../Component/Modal/Modal';
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

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const newConvo = await createConversation(input.current?.value!);
    updateConvo(newConvo);
  };

  if (convo) return <Redirect to={`/convo/${convo.id}`} />;

  return <Modal
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
        <button className="close-modal" onClick={toggle?.toggleOpened}>Cancel</button>
      </div>
    </form>
  </Modal>
};
