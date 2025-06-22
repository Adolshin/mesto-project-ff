import "../pages/index.css";
import { createCard, deleteCardHandler, likeCardHandler } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import { getUser, getCards, patchUser, postCard } from "./api.js";

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

function clickCardHandler(evt) {
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

  function openEditFormHandler() {
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;
    clearValidation(editForm, validationConfig);
    openModal(editModal);
  }

  function submitEditFormHandler(evt) {
    evt.preventDefault();
    saveUser(editName, editAbout);
    closeModal(editModal);
  }

  editButton.addEventListener("click", openEditFormHandler);
  editForm.addEventListener("submit", submitEditFormHandler);
}

function handleAddModal() {
  const addButton = document.querySelector(".profile__add-button");
  const addModal = document.querySelector(".popup_type_new-card");
  const addForm = addModal.querySelector(".popup__form");
  const addName = addForm.querySelector(".popup__input_type_card-name");
  const addLink = addForm.querySelector(".popup__input_type_url");

  function openAddFormHandler() {
    addForm.reset();
    clearValidation(addForm, validationConfig);
    openModal(addModal);
  }

  function submitAddFormHandler(evt) {
    evt.preventDefault();
    const card = {};
    card.name = addName.value;
    card.link = addLink.value;
    saveCard(card);
    closeModal(addModal);
  }

  addButton.addEventListener("click", openAddFormHandler);
  addForm.addEventListener("submit", submitAddFormHandler);
}

enableValidation(validationConfig);
handleEditModal();
handleAddModal();

function renderUser(user) {
  userName.textContent = user.name;
  userAbout.textContent = user.about;
  userAvatar.style = `background-image: url(${user.avatar})`;
}

let userId = null;

Promise.all([getUser(), getCards()]).then(([user, cards]) => {
  userId = user._id;
  console.log(user);
  console.log(cards);
  renderUser(user);
  cards.forEach(function (card) {
    cardContainer.append(
      createCard(
        card,
        userId,
        deleteCardHandler,
        likeCardHandler,
        clickCardHandler
      )
    );
  });
});

function saveUser(name, about) {
  patchUser(name, about).then((user) => {
    console.log(user);
    renderUser(user);
  });
}

function saveCard(card) {
  postCard(card).then((card) => {
    console.log(userId);
    cardContainer.prepend(
      createCard(
        card,
        userId,
        deleteCardHandler,
        likeCardHandler,
        clickCardHandler
      )
    );
  });
}




