const cardTemplate = document.querySelector("#card-template").content;
const noop = function () {};

function createCard(cardObj, userId, delCallback = noop, likeCallback = noop, clickCallback = noop) {
  if (!cardTemplate) {
    return;
  }
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardObj.link;
  cardImage.alt = `Изображение места: ${cardObj.name}`;
  cardImage.dataTitle = cardObj.name;
  cardTitle.textContent = cardObj.name;

  renderLikesCounter(cardLikeCounter, cardObj.likes.length);

  if (userId != cardObj.owner._id) {
    cardDeleteButton.remove();
  }

  let likeStatus = cardObj.likes.some((like) => {
    return like._id === userId;
  });

  if (likeStatus) {
    likeCard(cardLikeButton);
  }

  cardImage.addEventListener("click", clickCallback);
  cardLikeButton.addEventListener("click", function () {
    likeStatus = cardLikeButton.classList.contains("card__like-button_is-active");
    likeCallback(cardLikeButton, cardLikeCounter, cardObj._id, likeStatus);
  });

  cardDeleteButton.addEventListener("click", function () {
    delCallback(cardElement, cardObj._id);
  });

  return cardElement;
}

function deleteCard(element) {
  element.remove();
}

function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

function renderLikesCounter(element, value) {
  element.textContent = value;
}

export { createCard, deleteCard, likeCard, renderLikesCounter };
