const modals = document.querySelectorAll(".popup");

function openModal(modal) {
  if(!modal) {
    return
  }
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  if(!modal) {
    return
  }
  modal.classList.remove("popup_is-opened");
}

document.addEventListener("click", function (evt) {
  modals.forEach(function (item) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closeModal(item);
    }
  });
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    modals.forEach(function (item) {
      closeModal(item);
    });
  }
});

export { openModal, closeModal };
