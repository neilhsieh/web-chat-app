import './createConvo.scss';

import React, { useState, useEffect } from 'react';

import { NewConvoModal } from './NewConvoModal';


export const CreateConversation = () => {

  // const [convos, updateConvos] = useState<Conversation[]>([]);
  const [opened, updateOpened] = useState<Boolean>(false);

  const openModal = () => {
    updateOpened(!opened);
    // <NewConvoModal toggle={opened} />;
  }

  return <>
    <button className="create-convo-button" onClick={openModal}>
      <i className="fas fa-plus"></i>
      Convo
    </button>
    <NewConvoModal toggle={opened} />
  </>
}