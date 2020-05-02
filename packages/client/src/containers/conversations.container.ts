import { createContainer } from "unstated-next"
import { Conversation } from "../lib/types"
import { useEffect, useState } from "react"
import { api } from "../lib/API"

export const Conversations = createContainer(() => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    const convos = await api.getConversations();
    // if (!conversations) return;
    setConversations(convos);
  };

  const createConversation = async (name: string) => {
    const newConvo = await api.createConvo(name);
    setConversations(convos => [...convos, newConvo]);
    return newConvo;
  };

  // useEffect(() => { loadConversations() }, []);
  return {
    conversations,
    loadConversations,
    createConversation
  };
});
