export interface Conversation {
  name: string;
  id: string;
}

export interface Params {
  conversationId: string;
}

export interface Message {
  content: string;
  userId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}