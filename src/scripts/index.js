import "../pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  renderLikesCounter,
} from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import {
  getUserApi,
  getCardsApi,
  patchUserApi,
  postCardApi,
  deleteCardApi,
  putLikeApi,
  deleteLikeApi,
  patchAvatarApi,
} from "./api.js";

let userId = null;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardContainer = document.querySelector(".places__list");
const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");

function renderUser(userObj) {
  userName.textContent = userObj.name;
  userAbout.textContent = userObj.about;
  userAvatar.style = `background-image: url(${userObj.avatar})`;
}

function saveUser(userObj, modal) {
  patchUserApi(userObj).then((userObjUpd) => {
    renderUser(userObjUpd);
    closeModal(modal);
  });
}

function saveCard(cardObj, modal) {
  postCardApi(cardObj).then((cardObjUpd) => {
    cardContainer.prepend(
      createCard(
        cardObjUpd,
        userId,
        handleDeleteCard,
        handlelikeCard,
        openImageModal
      )
    );
    closeModal(modal);
  });
}

function saveAvatar(user, modal) {
  patchAvatarApi(user).then((userUpd) => {
    renderUser(userUpd);
    closeModal(modal);
  });
}

function handlelikeCard(likeElement, couterElement, cardId, status) {
  if (!status) {
    putLikeApi(cardId).then((cardObjUpd) => {
      console.log(cardObjUpd.likes.length);
      likeCard(likeElement);
      renderLikesCounter(couterElement, cardObjUpd.likes.length);
    });
  } else {
    deleteLikeApi(cardId).then((cardObjUpd) => {
      console.log(cardObjUpd.likes.length);
      likeCard(likeElement);
      renderLikesCounter(couterElement, cardObjUpd.likes.length);
    });
  }
}

// let cardIdDelete;
// let cardDelete;

function handleDeleteCard(element, cardId) {
  // cardIdDelete = cardId;
  // cardDelete = element;
  const modal = document.querySelector(".popup_type_confirm");
  const form = modal.querySelector(".popup__form");
  const submitBtn = form.querySelector(".popup__button");
  submitBtn.textContent = "Да";
  openModal(modal);  

  function submitForm(evt) {
    evt.preventDefault();
    submitBtn.textContent = "Удаление...";
    deleteCardApi(cardId).then(() => {
      deleteCard(element);
      closeModal(modal);
    });
    
  }
  form.addEventListener("submit", submitForm);
}

Promise.all([getUserApi(), getCardsApi()]).then(([userObjUpd, cardsObjUpd]) => {
  userId = userObjUpd._id;
  console.log(userObjUpd);
  console.log(cardsObjUpd);
  renderUser(userObjUpd);
  cardsObjUpd.forEach(function (cardObjUpd) {
    cardContainer.append(
      createCard(
        cardObjUpd,
        userId,
        handleDeleteCard,
        handlelikeCard,
        openImageModal
      )
    );
  });
});

function openImageModal(evt) {
  const modal = document.querySelector(".popup_type_image");
  const modalImage = modal.querySelector(".popup__image");
  const modalTitle = modal.querySelector(".popup__caption");
  modalImage.src = evt.target.src;
  modalTitle.textContent = evt.target.alt;
  openModal(modal);
}

function handleEditUser() {
  const openBtn = document.querySelector(".profile__edit-button");
  const modal = document.querySelector(".popup_type_edit");
  const form = modal.querySelector(".popup__form");
  const name = form.querySelector(".popup__input_type_name");
  const about = form.querySelector(".popup__input_type_description");
  const submitBtn = form.querySelector(".popup__button");

  function openEditForm() {
    name.value = userName.textContent;
    about.value = userAbout.textContent;
    clearValidation(form, validationConfig);
    submitBtn.textContent = "Сохранить";
    openModal(modal);
  }

  function submitEditForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.name = name.value;
    userObj.about = about.value;
    submitBtn.textContent = "Сохранение...";
    saveUser(userObj, modal);
  }

  openBtn.addEventListener("click", openEditForm);
  form.addEventListener("submit", submitEditForm);
}

function handleAddCard() {
  const openBtn = document.querySelector(".profile__add-button");
  const modal = document.querySelector(".popup_type_new-card");
  const form = modal.querySelector(".popup__form");
  const name = form.querySelector(".popup__input_type_card-name");
  const url = form.querySelector(".popup__input_type_url");
  const submitBtn = form.querySelector(".popup__button");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    submitBtn.textContent = "Сохранить";
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const cardObj = {};
    cardObj.name = name.value;
    cardObj.link = url.value;
    submitBtn.textContent = "Сохранение...";
    saveCard(cardObj, modal);
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function handleEditAvatar() {
  const openBtn = document.querySelector(".profile__image");
  const modal = document.querySelector(".popup_type_avatar");
  const form = modal.querySelector(".popup__form");
  const url = form.querySelector(".popup__input_type_url");
  const submitBtn = form.querySelector(".popup__button");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    submitBtn.textContent = "Сохранить";
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.avatar = url.value;
    submitBtn.textContent = "Сохранение...";
    saveAvatar(userObj, modal);
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

enableValidation(validationConfig);
handleEditUser();
handleAddCard();
handleEditAvatar();
