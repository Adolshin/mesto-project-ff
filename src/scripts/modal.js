function openModal(element) {
  return function () {
    element.classList.add("popup_is-opened");
  };
}

function closeModal(element) {
  // const elCloseBtn = element.querySelector(".popup__close");
  return function (evt) {
    console.log(evt.target);
    element.classList.remove("popup_is-opened");
  };
}

export { openModal, closeModal };
