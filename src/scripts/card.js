const cardTemplate = document.querySelector("#card-template").content;
const noop = function () {};

function createCard(
  element,
  delCallback = noop,
  likeCallback = noop,
  clickCallback = noop
) {
  if (!cardTemplate) {
    return;
  }
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");  
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardLikeCounter.textContent = element.likes.length;
  cardLikeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", clickCallback);
  cardDeleteButton.addEventListener("click", function () {
    delCallback(cardElement);
  });

  return cardElement;
}

function deleteCardHandler(cardElement) {
  cardElement.remove();
  cardElement === null;
}

function likeCardHandler(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCardHandler, likeCardHandler };
