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
  conversationId: string;

}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ToggleModalProp {
  /* Modal open state from class calling Modal */
  opened: boolean;
  /* Modal set state/useState from class calling Modal */
  toggleOpened: () => void;
}
