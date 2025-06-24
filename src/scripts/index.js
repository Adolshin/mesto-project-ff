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
// let likeObj = null;
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
  // userAvatar.style = `background-image: url(${userObj.avatar})`;
}

function renderAvatar(userObj) {
  userAvatar.style = `background-image: url(${userObj.avatar})`;
}

function saveUser(userObj) {
  patchUserApi(userObj).then((userObjUpd) => {
    renderUser(userObjUpd);
  });
}

function saveCard(cardObj) {
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
  });
}

function handleDeleteCard(element, cardId) {
  deleteCardApi(cardId).then(() => {
    deleteCard(element);
  });
}

function saveAvatar(user) {
  patchAvatarApi(user).then((userUpd) => {
    console.log(userUpd);
    renderAvatar(userUpd);
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
  const imageModal = document.querySelector(".popup_type_image");
  const imageModalPicture = imageModal.querySelector(".popup__image");
  const imageModalTitle = imageModal.querySelector(".popup__caption");
  imageModalPicture.src = evt.target.src;
  imageModalTitle.textContent = evt.target.alt;
  openModal(imageModal);
}

function handleEditModal() {
  const editButton = document.querySelector(".profile__edit-button");
  const editModal = document.querySelector(".popup_type_edit");
  const editForm = editModal.querySelector(".popup__form");
  const editName = editForm.querySelector(".popup__input_type_name");
  const editAbout = editForm.querySelector(".popup__input_type_description");

  function openEditForm() {
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;
    clearValidation(editForm, validationConfig);
    openModal(editModal);
  }

  function submitEditForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.name = editName.value;
    userObj.about = editAbout.value;
    saveUser(userObj);
    closeModal(editModal);
  }

  editButton.addEventListener("click", openEditForm);
  editForm.addEventListener("submit", submitEditForm);
}

function handleAddModal() {
  const addButton = document.querySelector(".profile__add-button");
  const addModal = document.querySelector(".popup_type_new-card");
  const addForm = addModal.querySelector(".popup__form");
  const addName = addForm.querySelector(".popup__input_type_card-name");
  const addLink = addForm.querySelector(".popup__input_type_url");

  function openAddForm() {
    addForm.reset();
    clearValidation(addForm, validationConfig);
    openModal(addModal);
  }

  function submitAddForm(evt) {
    evt.preventDefault();
    const cardObj = {};
    cardObj.name = addName.value;
    cardObj.link = addLink.value;
    saveCard(cardObj);
    closeModal(addModal);
  }

  addButton.addEventListener("click", openAddForm);
  addForm.addEventListener("submit", submitAddForm);
}

function handleAvatarModal() {
  const button = document.querySelector(".profile__image");
  const modal = document.querySelector(".popup_type_avatar");
  const form = modal.querySelector(".popup__form");
  const link = form.querySelector(".popup__input_type_url");

  function openForm() {
    form.reset();
    clearValidation(form, validationConfig);
    openModal(modal);
  }

  function submitForm(evt) {
    evt.preventDefault();
    const userObj = {};
    userObj.avatar = link.value;
    saveAvatar(userObj);
    closeModal(modal);
  }

  button.addEventListener("click", openForm);
  form.addEventListener("submit", submitForm);
}

enableValidation(validationConfig);
handleEditModal();
handleAddModal();
handleAvatarModal();
