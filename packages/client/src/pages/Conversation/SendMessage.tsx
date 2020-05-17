import React, { FormEvent, useRef } from 'react';
import { api } from '../../lib/API';
import { Message } from '../../lib/types';
import { Messages } from '../../containers/messages.container';

export interface SendMessageProps {
  conversationId: string;
  // onNewMessage: (message: Message) => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  conversationId,
  // onNewMessage
}) => {
  const { messages, createMessage } = Messages.useContainer();

  const input = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(conversationId, input.current?.value!);

    // const message = await api.createMessage(conversationId, input.current?.value!);
    // onNewMessage(message);
    createMessage(conversationId, input.current?.value!);
    input.current!.value = '';
  };

  return <form onSubmit={submit}>
    <input type="text" ref={input} placeholder="C'mon, say something..." />
    <button className="submit" type="submit">Send</button>
  </form>
};
