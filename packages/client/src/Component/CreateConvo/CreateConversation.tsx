import './createConvo.scss';

import React, { useState, useEffect } from 'react';

import { NewConvoModal } from './NewConvoModal';
import { Modal } from '../Modal/Modal';

export const CreateConversation = () => {

  // const [convos, updateConvos] = useState<Conversation[]>([]);
  const [opened, updateOpened] = useState<boolean>(false);

  const openModal = () => {
    updateOpened(!opened);
    // <NewConvoModal toggle={opened} />;
  };

  return <>
    <button className="create-convo-button" onClick={openModal}>
      <i className="fas fa-plus"></i>
      Convo
    </button>
    <Modal >
      <NewConvoModal toggle={opened} />
    </Modal>
  </>
}

