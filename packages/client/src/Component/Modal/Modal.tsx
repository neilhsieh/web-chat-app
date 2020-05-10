import './modal.scss';

import React, { FormEvent, Component } from 'react';
import ReactDOM from 'react-dom';
import { ToggleModalProp } from '../../lib/types';

// These two containers are siblings in the DOM
const modalRoot = document.getElementById('modal')!;


interface Props {
  title: string;
  toggle: ToggleModalProp;
  className?: string;
}

interface State {
  modalOpened: boolean;
}

export class Modal extends Component<Props, State> {
  el: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.state = {
      modalOpened: false
    };

    this.el = document.createElement('div');
    this.el.classList.add('modal');
    if (this.props.className) this.el.classList.add(this.props.className);
  }


  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentDidUpdate() {
    // This ensures that set state only occurs when prop and state mismatches
    if (this.props.toggle?.opened !== this.state.modalOpened) {
      this.setState({ modalOpened: this.props.toggle?.opened });
    }
    // This ensures that the toggle is only called once state updated to match prop
    if (this.props.toggle?.opened === this.state.modalOpened) {
      this.modalTransition();
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }


  modalTransition = () => {
    const modalContainer = document.querySelector<HTMLElement>(`#modal .${this.props.className}`);
    if (this.state.modalOpened) {
      modalContainer!.classList.remove('closed');
      modalContainer!.style.display = 'flex';
      setTimeout(() => {
        modalContainer!.classList.add('opened');
      }, 50);
    } else {
      modalContainer!.style.opacity = '0';
      setTimeout(() => {
        modalContainer!.classList.remove('opened');
        modalContainer!.style.display = 'none';
        modalContainer!.style.removeProperty('opacity');
      }, 300);
    }
  }


  // closeModal = (e: FormEvent) => {
  //   e.preventDefault();
  //   this.props.toggle?.toggleOpened();
  // }

  render() {
    return ReactDOM.createPortal(
      // this.props.children,
      <>
        <div className="modal-popup">
          <h2>{this.props.title}</h2>
          <div className="modal-content">{this.props.children}</div>
          {/* <button className="close-modal" onClick={this.closeModal}
          >Cancel</button> */}

        </div>
      </>,
      this.el
    );
  }
}
