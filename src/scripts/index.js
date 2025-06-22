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
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

function clickCardHandler(evt) {
  const imageModal = document.querySelector(".popup_type_image");
  const imageModalPicture = imageModal.querySelector(".popup__image");
  const imageModalText = imageModal.querySelector(".popup__caption");
  const cardTitle = evt.target.alt;
  imageModalPicture.src = evt.target.src;
  imageModalText.textContent = cardTitle;
  openModal(imageModal);
}



function handleEditModal(evt) {
  const editButton = document.querySelector(".profile__edit-button");
  const editModal = document.querySelector(".popup_type_edit");
  const editForm = editModal.querySelector(".popup__form");
  const editName = editForm.querySelector(".popup__input_type_name");
  const editDesc = editForm.querySelector(".popup__input_type_description");

  function submitEditFormHandler(evt) {
    evt.preventDefault(evt);
    profileTitle.textContent = editName.value;
    profileDesc.textContent = editDesc.value;
    saveUserData();
    closeModal(editModal);
  }

  function openEditFormHandler(evt) {
    editName.value = profileTitle.textContent;
    editDesc.value = profileDesc.textContent;
    clearValidation(editForm, validationConfig);
    openModal(editModal);
  }

  editButton.addEventListener("click", openEditFormHandler);
  editForm.addEventListener("submit", submitEditFormHandler);
}

function handleAddModal() {
  const addButton = document.querySelector(".profile__add-button");
  const addModal = document.querySelector(".popup_type_new-card");
  const addForm = addModal.querySelector(".popup__form");
  const addName = addForm.querySelector(".popup__input_type_card-name");
  const addUrl = addForm.querySelector(".popup__input_type_url");

  function openAddFormHandler() {
    addForm.reset();
    clearValidation(addForm, validationConfig);
    openModal(addModal);
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

  addButton.addEventListener("click", openAddFormHandler);
  addForm.addEventListener("submit", submitAddFormHandler);
}

// initialCards.forEach(function (item) {
//   cardContainer.append(
//     createCard(item, deleteCardHandler, likeCardHandler, clickCardHandler)
//   );
// });

enableValidation(validationConfig);
handleEditModal();
handleAddModal();

function getUser() {
  return fetch("https://nomoreparties.co./v1/wff-cohort-41/users/me", {
    method: "GET",
    headers: {
      authorization: "515ed3f0-64e3-49c6-80e8-8e6a14a63a3c",
    },
  }).then((res) => res.json());
}

function getCards() {
  return fetch("https://nomoreparties.co./v1/wff-cohort-41/cards", {
    method: "GET",
    headers: {
      authorization: "515ed3f0-64e3-49c6-80e8-8e6a14a63a3c",
    },
  }).then((res) => res.json());
}

function renderUser() {
  getUser().then((user) => {
    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
    profileImage.style = `background-image: url(${user.avatar})`;
  });
}

function renderCards() {
  getCards().then((cards) => {
    cards.forEach(function (card) {
      cardContainer.append(
        createCard(card, deleteCardHandler, likeCardHandler, clickCardHandler)
      );
    });
  });
}

let userId = null;

Promise.all([getUser(), getCards()]).then(([userData, cards]) => {
  userId = userData._id;
  console.log(userData);
  console.log(cards);
  renderUser();
  renderCards();
});

function addUserToDOM (name, desc) {
  profileTitle.textContent = name;
  profileDesc.textContent = desc
}


function saveUserData() {
  fetch("https://nomoreparties.co./v1/wff-cohort-41/users/me", {
    method: "PATCH",
    headers: {
      authorization: "515ed3f0-64e3-49c6-80e8-8e6a14a63a3c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileDesc.textContent,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

function saveCard(card) {
  fetch("https://nomoreparties.co./v1/wff-cohort-41/cards", {
    method: "POST",

    body: JSON.stringify({
      title: newPost.title,
      body: newPost.body,
    }),
    // и заголовки
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((post) => {
      addPostToDOM(
        document.querySelector(".container"),
        createPostMarkup(post)
      );
    });
}
