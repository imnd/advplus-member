import { Modal } from "bootstrap";
import { isBrowser } from '@/utils/browser.util';

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal?.hide();
};
const showModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getOrCreateInstance(modalEl);
  myModal.show(modalEl);
};

const removeModalBackdrop = (): void => {
  if (!isBrowser()) {
    return;
  }
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

export { removeModalBackdrop, hideModal, showModal };
