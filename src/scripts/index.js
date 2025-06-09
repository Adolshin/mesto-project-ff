import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    description: "Летнее высокогорье",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    description: "Зимняя река",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    description: "Городаская застройка",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    description: "Камчатская сопка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    description: "Железная дорога в лесу",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    description: "Зимнее побережие озера Байкал",
  },
];
const cardContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item));
});
const cardImage = document.querySelector(".card__image");
cardContainer.addEventListener("click", deleteCard);
cardContainer.addEventListener("click", likeCard);

editButton.addEventListener("click", openModal(editModal));
addButton.addEventListener("click", openModal(addModal));
cardImage.addEventListener("click", openModal(imageModal));

editModal.addEventListener("click", function (evt) { 
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")) {
     closeModal(editModal);
  }
});

addModal.addEventListener("click", function (evt) { 
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")) {
     closeModal(addModal);
  }
});
imageModal.addEventListener("click", function (evt) { 
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")) {
     closeModal(imageModal);
  }
});