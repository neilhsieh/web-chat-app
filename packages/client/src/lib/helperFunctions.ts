import { FormEvent } from 'react';

export const hideOnClickOutside = (element: HTMLElement | null, toggleFunc: () => void) => {
  const outsideClickListener = (event: FormEvent) => {
    if (element === event.target as Node) { // or use: event.target.closest(selector) === null

      toggleFunc();
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  };

  document.addEventListener('click', outsideClickListener);
};
