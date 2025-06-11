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
  const modalOpen = document.querySelector(".popup_is-opened");
  if (!modalOpen) {
    return;
  }
  const form = modalOpen.querySelector(".popup__form");
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(modalOpen);
    if (form) {
      form.reset();
    }
  }
}

function closeModalKeyHandler(evt) {
  const modalOpen = document.querySelector(".popup_is-opened");
  if (!modalOpen) {
    return;
  }
  const form = modalOpen.querySelector(".popup__form");
  if (evt.key === "Escape") {
    closeModal(modalOpen);
    if (form) {
      form.reset();
    }
  }
}

export { openModal, closeModal };
