import "../pages/index.css";
import { createCard, deleteCard, likeCard, renderLikesCounter } from "./card.js";
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
let deletedCardId;
let deletedCard;

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
const modalDelete = document.querySelector(".popup_type_delete");

function handleImageModal(evt) {
  const modal = document.querySelector(".popup_type_image");
  const modalImage = modal.querySelector(".popup__image");
  const modalTitle = modal.querySelector(".popup__caption");
  modalImage.src = evt.target.src; 
  modalImage.alt = evt.target.alt; // Вашу рекомендацию я сделал в файле card.js, где формировались изначальные картинки, а сюда просто перенес alt оттуда
  modalTitle.textContent = evt.target.alt.replace("Изображение места: ",""); 
  openModal(modal);
}

function handleDeleteCard(element, cardId) {
  deletedCard = element;
  deletedCardId = cardId;
  openModal(modalDelete);
}

function handleDeleteModal() {
  const form = modalDelete.querySelector(".popup__form");
  const submitBtn = form.querySelector(".popup__button");

  function submitForm(evt, element, cardId) {
    evt.preventDefault();
    submitBtn.textContent = "Удаление...";
    deleteCardApi(cardId)
      .then(() => {
        deleteCard(element);
        closeModal(modalDelete);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitBtn.textContent = "Да";
      });
  }
  form.addEventListener("submit", function (evt) {
    submitForm(evt, deletedCard, deletedCardId);
  });
}

function renderUser(userObj) {
  userName.textContent = userObj.name;
  userAbout.textContent = userObj.about;
}

function saveUser(userObj, modal, button) {
  patchUserApi(userObj)
    .then((userObjRes) => {
      renderUser(userObjRes);
      closeModal(modal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function handleUserModal() {
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
    openModal(modal);
  }

  function submitEditForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.name = name.value;
    userObj.about = about.value;
    submitBtn.textContent = "Сохранение...";
    saveUser(userObj, modal, submitBtn);
  }

  openBtn.addEventListener("click", openEditForm);
  form.addEventListener("submit", submitEditForm);
}

function renderAvatar(userObj) {
  userAvatar.style = `background-image: url(${userObj.avatar})`;
}

function saveAvatar(userObj, modal, button) {
  patchAvatarApi(userObj)
    .then((userObjRes) => {
      renderAvatar(userObjRes);
      closeModal(modal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function handleAvatarModal() {
  const openBtn = document.querySelector(".profile__image");
  const modal = document.querySelector(".popup_type_avatar");
  const form = modal.querySelector(".popup__form");
  const url = form.querySelector(".popup__input_type_url");
  const submitBtn = form.querySelector(".popup__button");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.avatar = url.value;
    submitBtn.textContent = "Сохранение...";
    saveAvatar(userObj, modal, submitBtn);
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function saveCard(cardObj, modal, button) {
  postCardApi(cardObj)
    .then((cardObjRes) => {
      cardContainer.prepend(createCard(cardObjRes, userId, handleDeleteCard, handlelikeCard, handleImageModal));
      closeModal(modal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function handleCardModal() {
  const openBtn = document.querySelector(".profile__add-button");
  const modal = document.querySelector(".popup_type_new-card");
  const form = modal.querySelector(".popup__form");
  const name = form.querySelector(".popup__input_type_card-name");
  const url = form.querySelector(".popup__input_type_url");
  const submitBtn = form.querySelector(".popup__button");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const cardObj = {};
    cardObj.name = name.value;
    cardObj.link = url.value;
    submitBtn.textContent = "Сохранение...";
    saveCard(cardObj, modal, submitBtn);
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function handlelikeCard(likeElement, couterElement, cardId, status) {
  if (!status) {
    putLikeApi(cardId)
      .then((cardObjRes) => {
        likeCard(likeElement);
        renderLikesCounter(couterElement, cardObjRes.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikeApi(cardId)
      .then((cardObjRes) => {
        likeCard(likeElement);
        renderLikesCounter(couterElement, cardObjRes.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

Promise.all([getUserApi(), getCardsApi()])
  .then(([userObjRes, cardsObjRes]) => {
    userId = userObjRes._id;
    renderUser(userObjRes);
    renderAvatar(userObjRes);
    cardsObjRes.forEach(function (cardObjRes) {
      cardContainer.append(createCard(cardObjRes, userId, handleDeleteCard, handlelikeCard, handleImageModal));
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
handleUserModal();
handleCardModal();
handleAvatarModal();
handleDeleteModal();
