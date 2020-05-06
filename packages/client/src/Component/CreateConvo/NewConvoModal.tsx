import './newConvoModal.scss';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { api } from '../../lib/API';
import { Conversation, ToggleModalProp } from '../../lib/types';
import { Redirect } from 'react-router';
import { Conversations } from '../../containers/conversations.container';
import { Modal } from '../Modal/Modal';
// import { Conversation } from '../../lib/types';

// import { api } from '../../lib/API';
export interface ConvoProp {
  // toggle: {
  //   opened: boolean,
  //   openModal: () => void
  // };
  toggle: ToggleModalProp;
  // createNewConvo: (convo: Conversation) => void;
}


export const NewConvoModal: React.FC<ConvoProp> = ({
  toggle,
}) => {

  const [opened, updateOpened] = useState<boolean>(false);

  const [convo, updateConvo] = useState<Conversation>();
  const { conversations, createConversation } = Conversations.useContainer();

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // updateOpened(!opened);
    // classToggle();
  }, [toggle]);


  const clickEvent = (e: FormEvent) => {
    e.preventDefault();
    // updateOpened(!opened);
    // classToggle();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    // const newConvo = await api.createConvo(input.current?.value!);
    const newConvo = await createConversation(input.current?.value!);
    updateConvo(newConvo);
  };

  // if (convo) return <Redirect to={`/convo/${convo.id}`} />;

  return <Modal
    title="Start a new Convo!"
    toggle={toggle}
    // onClose={clickEvent}
    className="new-convo-modal"

  >

    {/* <div className="modal-page-container closed" onClick={clickEvent}>
      <h2>Start a new Convo!</h2>

      <form action="" onSubmit={submit}>

        <input
          name="name"
          type="text"
          placeholder="Name your convo..."
          ref={input}
        />
        <div className="button-group">
          <button className="submit" type="submit" >Start</button>
          <button className="close-modal" onClick={clickEvent}>Cancel</button>
        </div>
      </form>


    </div> */}
  </Modal>
};
