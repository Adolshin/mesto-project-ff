import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCardHandler, likeCardHandler } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const cardContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const modalPicture = document.querySelector(".popup__image");

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item, deleteCardHandler, likeCardHandler, clickCardHandler));
});


editButton.addEventListener("click", function () {
  openModal(editModal);
});

addButton.addEventListener("click", function () {
  openModal(addModal);
});

function clickCardHandler (evt) {
  if (!modalPicture) {
    return
  }
  if (evt.target.classList.contains("card__image")) {
    modalPicture.src = evt.target.src;
    openModal(imageModal);
  }
};


