import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import {
  getUserApi,
  getCardsApi,
  patchUserApi,
  postCardApi,
  deleteCardApi,
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
    saveUser(editName, editAbout);
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
    const card = {};
    card.name = addName.value;
    card.link = addLink.value;
    saveCard(card);
    closeModal(addModal);
  }

  addButton.addEventListener("click", openAddForm);
  addForm.addEventListener("submit", submitAddForm);
}

enableValidation(validationConfig);
handleEditModal();
handleAddModal();

function renderUser(user) {
  userName.textContent = user.name;
  userAbout.textContent = user.about;
  userAvatar.style = `background-image: url(${user.avatar})`;
}

function renderCard(card, userId) {
  const newCard = createCard(
    card,
    userId,
    handleDeleteCard,
    likeCard,
    openImageModal
  );
  return newCard;
}

Promise.all([getUserApi(), getCardsApi()]).then(([user, cards]) => {
  userId = user._id;
  console.log(user);
  console.log(cards);
  renderUser(user);
  cards.forEach(function (card) {
    cardContainer.append(renderCard(card, userId));
  });
});

function saveUser(name, about) {
  patchUserApi(name, about).then((user) => {
    renderUser(user);
  });
}

function saveCard(card) {
  postCardApi(card).then((card) => {
    cardContainer.prepend(renderCard(card, userId));
  });
}

function handleDeleteCard(card, cardId) {
  deleteCardApi(cardId).then(() => {
    deleteCard(card);
  });
}

// const newCard = createCard(card, userId, handleDeleteCard, likeCard, openImageModal);
