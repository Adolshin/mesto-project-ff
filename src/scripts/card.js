const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, userId, callbacksConfig) {
  const { imageCallback, likeCallback, delCallback } = callbacksConfig;

  if (!cardTemplate) {
    return;
  }
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места: ${cardData.name}`;
  cardImage.dataTitle = cardData.name;
  cardTitle.textContent = cardData.name;

  renderLikesCounter(cardLikeCounter, cardData.likes.length);

  if (userId != cardData.owner._id) {
    deleteElement(cardDeleteButton);
  }

  let likeStatus = cardData.likes.some((like) => {
    return like._id === userId;
  });

  if (likeStatus) {
    likeCard(cardLikeButton);
  }

  cardImage.addEventListener("click", imageCallback);
  cardLikeButton.addEventListener("click", function () {
    likeStatus = cardLikeButton.classList.contains("card__like-button_is-active");
    likeCallback(cardLikeButton, cardLikeCounter, cardData._id, likeStatus); 
  });

  cardDeleteButton.addEventListener("click", function () {
    delCallback(cardElement, cardData._id);
  });

  return cardElement;
}

function deleteElement(element) {
  element.remove();
  element = null;
}

function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

function renderLikesCounter(element, value) {
  element.textContent = value;
}

export { createCard, deleteElement, likeCard, renderLikesCounter };
