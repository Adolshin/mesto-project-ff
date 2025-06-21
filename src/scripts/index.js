import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCardHandler, likeCardHandler } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardContainer = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");
const editForm = editModal.querySelector(".popup__form");
const editName = editForm.querySelector(".popup__input_type_name");
const editDesc = editForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
const addForm = addModal.querySelector(".popup__form");
const addName = addForm.querySelector(".popup__input_type_card-name");
const addUrl = addForm.querySelector(".popup__input_type_url");

function clickCardHandler(evt) {
  const imageModal = document.querySelector(".popup_type_image");
  const imageModalPicture = imageModal.querySelector(".popup__image");
  const imageModalText = imageModal.querySelector(".popup__caption");
  const cardTitle = evt.target.alt;
  imageModalPicture.src = evt.target.src;
  imageModalText.textContent = cardTitle;
  openModal(imageModal);
}

function submitEditFormHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileDesc.textContent = editDesc.value;
  closeModal(editModal);
}

function submitAddFormHandler(evt) {
  evt.preventDefault();
  const object = {};
  object.name = addName.value;
  object.link = addUrl.value;
  cardContainer.prepend(
    createCard(object, deleteCardHandler, likeCardHandler, clickCardHandler)
  );
  closeModal(addModal);
}

enableValidation(validationConfig);

initialCards.forEach(function (item) {
  cardContainer.append(
    createCard(item, deleteCardHandler, likeCardHandler, clickCardHandler)
  );
});

editButton.addEventListener("click", function () {
  editName.value = profileTitle.textContent;
  editDesc.value = profileDesc.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editModal);
});

addButton.addEventListener("click", function () {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(addModal);
});

editForm.addEventListener("submit", submitEditFormHandler);

addForm.addEventListener("submit", submitAddFormHandler);
