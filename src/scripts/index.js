import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCardHandler, likeCardHandler } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, hideInputError, toggleButtonState } from "./validate.js";

const cardContainer = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  cardContainer.append(
    createCard(item, deleteCardHandler, likeCardHandler, clickCardHandler)
  );
});

const imageModal = document.querySelector(".popup_type_image");
const imageModalPicture = imageModal.querySelector(".popup__image");
const imageModalText = imageModal.querySelector(".popup__caption");

function clickCardHandler(evt) {
  const cardTitle = evt.target.alt;
  imageModalPicture.src = evt.target.src;
  imageModalText.textContent = cardTitle;
  openModal(imageModal);
}

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");
const editForm = editModal.querySelector(".popup__form");
const editName = editForm.querySelector(".popup__input_type_name");
const editDescription = editForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", function () {
  const inputList = Array.from(editForm.querySelectorAll(".popup__input"));  
  inputList.forEach((input) => {
    hideInputError(editForm, input);
  });
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  openModal(editModal);
});

function submitEditFormHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closeModal(editModal);
}

editForm.addEventListener("submit", submitEditFormHandler);

const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
const addForm = addModal.querySelector(".popup__form");
const addName = addForm.querySelector(".popup__input_type_card-name");
const addUrl = addForm.querySelector(".popup__input_type_url");

addButton.addEventListener("click", function () { 
  const inputList = Array.from(addForm.querySelectorAll(".popup__input"));
  const submitButton = addForm.querySelector(".popup__button");
  addForm.reset();
  inputList.forEach((input) => {
    hideInputError(addForm, input);
    toggleButtonState(inputList, submitButton);
  });
  openModal(addModal);
});

function submitAddFormHandler(evt) {
  evt.preventDefault();
  const object = {};
  object.name = addName.value;
  object.link = addUrl.value;
  object.description = addName.value;
  cardContainer.prepend(
    createCard(object, deleteCardHandler, likeCardHandler, clickCardHandler)
  );
  closeModal(addModal);
}

addForm.addEventListener("submit", submitAddFormHandler);

enableValidation();
