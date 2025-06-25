function openModal(modal) {
  if (!modal) {
    return;
  }
  modal.classList.add("popup_is-opened");
  document.addEventListener("click", closeModalClickHandler);
  document.addEventListener("keydown", closeModalKeyHandler);
}

function closeModal(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeModalClickHandler);
  document.removeEventListener("keydown", closeModalKeyHandler);
}

function closeModalClickHandler(evt) {
  if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")) {
    const modalOpen = document.querySelector(".popup_is-opened");
    if (!modalOpen) {
      return;
    }
    closeModal(modalOpen);
  }
}

function closeModalKeyHandler(evt) {
  if (evt.key === "Escape") {
    const modalOpen = document.querySelector(".popup_is-opened");
    if (!modalOpen) {
      return;
    }
    closeModal(modalOpen);
  }
}

export { openModal, closeModal };
