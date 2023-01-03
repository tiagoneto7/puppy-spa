import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
};

function Modal({ open, onClose, children }: ModalProps) {
  const modalBlurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //close modal on blur click
    const closeModalOnBlurClick = (e: MouseEvent) => {
      if (open && e.target === modalBlurRef.current) {
        onClose();
      }
    };
    //close modal on 'esc' press
    const closeModalOnEscPress = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("click", closeModalOnBlurClick);
    document.addEventListener("keydown", closeModalOnEscPress);

    return () => {
      document.removeEventListener("click", closeModalOnBlurClick);
      document.removeEventListener("keydown", closeModalOnEscPress);
    };
  });

  return (
    <div>
      {open && (
        <div data-testid="blur" className={styles.blur} ref={modalBlurRef}>
          <div className={styles.modalWrapper}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default Modal;
