import "../pages/index.css";
import { createCard, deleteElement, likeCard, renderLikesCounter } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import {
  getUserFetch,
  getCardsFetch,
  patchUserFetch,
  postCardFetch,
  deleteCardFetch,
  putLikeFetch,
  deleteLikeFetch,
  patchAvatarFetch,
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

const callbackConfig = {
  delCallback: handleDeleteCard,
  likeCallback: handlelikeCard,
  imageCallback: handleImageModal,
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
  modalImage.alt = evt.target.alt;
  modalTitle.textContent = evt.target.alt.replace("Изображение места: ", "");
  openModal(modal);
}

function renderUser(userData) {
  userName.textContent = userData.name;
  userAbout.textContent = userData.about;
}

function renderAvatar(userData) {
  userAvatar.style = `background-image: url(${userData.avatar})`;
}

function renderButton(form, text) {
  const submitBtn = form.querySelector(".popup__button");
  submitBtn.textContent = text;
}

function handleDeleteCard(cardElement, cardId) {
  deletedCard = cardElement;
  deletedCardId = cardId;
  openModal(modalDelete);
}

function handleDeleteModal() {
  const form = modalDelete.querySelector(".popup__form");

  function submitForm(evt, cardElement, cardId) {
    evt.preventDefault();
    renderButton(form, "Удаление...");
    deleteCardFetch(cardId)
      .then(() => {
        deleteElement(cardElement);
        closeModal(modalDelete);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderButton(form, "Да");
      });
  }
  form.addEventListener("submit", function (evt) {
    submitForm(evt, deletedCard, deletedCardId);
  });
}

function handleUserModal() {
  const openBtn = document.querySelector(".profile__edit-button");
  const modal = document.querySelector(".popup_type_edit");
  const form = modal.querySelector(".popup__form");
  const name = form.querySelector(".popup__input_type_name");
  const about = form.querySelector(".popup__input_type_description");

  function openForm() {
    name.value = userName.textContent;
    about.value = userAbout.textContent;
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const userData = {};
    userData.name = name.value;
    userData.about = about.value;
    renderButton(form, "Сохранение...");
    patchUserFetch(userData)
      .then((userDataRes) => {
        renderUser(userDataRes);
        closeModal(modal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderButton(form, "Сохранить");
      });
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function handleAvatarModal() {
  const openBtn = document.querySelector(".profile__image");
  const modal = document.querySelector(".popup_type_avatar");
  const form = modal.querySelector(".popup__form");
  const url = form.querySelector(".popup__input_type_url");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const userData = {};
    userData.avatar = url.value;
    renderButton(form, "Сохранение...");
    patchAvatarFetch(userData)
      .then((userDataRes) => {
        renderAvatar(userDataRes);
        closeModal(modal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderButton(form, "Сохранить");
      });
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function handleCardModal() {
  const openBtn = document.querySelector(".profile__add-button");
  const modal = document.querySelector(".popup_type_new-card");
  const form = modal.querySelector(".popup__form");
  const name = form.querySelector(".popup__input_type_card-name");
  const url = form.querySelector(".popup__input_type_url");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const cardData = {};
    cardData.name = name.value;
    cardData.link = url.value;
    renderButton(form, "Сохранение...");
    postCardFetch(cardData)
      .then((cardDataRes) => {
        cardContainer.prepend(createCard(cardDataRes, userId, callbackConfig));
        closeModal(modal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderButton(form, "Сохранить");
      });
  }

  openBtn.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

function handlelikeCard(likeElement, counterElement, cardId, status) {
  if (!status) {
    putLikeFetch(cardId)
      .then((cardDataRes) => {
        likeCard(likeElement);
        renderLikesCounter(counterElement, cardDataRes.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikeFetch(cardId)
      .then((cardDataRes) => {
        likeCard(likeElement);
        renderLikesCounter(counterElement, cardDataRes.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

Promise.all([getUserFetch(), getCardsFetch()])
  .then(([userDataRes, cardsObjRes]) => {
    userId = userDataRes._id;
    renderUser(userDataRes);
    renderAvatar(userDataRes);
    cardsObjRes.forEach(function (cardDataRes) {
      cardContainer.append(createCard(cardDataRes, userId, callbackConfig));
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
