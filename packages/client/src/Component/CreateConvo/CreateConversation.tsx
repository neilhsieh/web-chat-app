import './createConvo.scss';

import React, { useState, useEffect } from 'react';

import { NewConvoModal } from '../../modals/NewConvoModal/NewConvoModal';

export const CreateConversation = () => {

  // const [convos, updateConvos] = useState<Conversation[]>([]);
  const [opened, updateOpened] = useState<boolean>(false);

  useEffect(() => {
    // console.log('clicked', opened);
  }, [opened]);

  const toggleOpened = () => {
    updateOpened(!opened);
    // <NewConvoModal toggle={opened} />;
  };

  return <>
    <button className="create-convo-button" onClick={toggleOpened}>
      <i className="fas fa-plus"></i>
      Convo
    </button>
    <NewConvoModal toggle={{ opened, toggleOpened }} />
  </>;
};
