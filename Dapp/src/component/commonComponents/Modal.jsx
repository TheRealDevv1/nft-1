import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-main");
const Modal = ({ show, children, showModal }) => {
  const element = useRef(document.createElement("div"));

  useEffect(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.key == "Escape") {
        showModal(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    element.current.className = "modal";
    document.body.style.overflow = "hidden";
    modalRoot.appendChild(element.current);

    return () => {
      document.body.style.overflow = "scroll";
      modalRoot.removeChild(element.current);
    };
  }, [show]);

  return show ? createPortal(children, element.current) : null;
};

export default Modal;
