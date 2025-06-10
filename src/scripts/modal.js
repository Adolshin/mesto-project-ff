const modals = document.querySelectorAll(".popup");

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
  if(!modals) {
    return
  }
  modals.forEach(function (item) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {      
      closeModal(item);
    }
  });
}

function closeModalKeyHandler(evt) {
  if(!modals) {
    return
  }
  if (evt.key === "Escape") {
    modals.forEach(function (item) {
      closeModal(item);
    });
  }
}

export { openModal, closeModal };
