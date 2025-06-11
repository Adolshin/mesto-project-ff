const cardTemplate = document.querySelector("#card-template").content;
const noop = function () {};

function createCard( element, delCallback = noop, likeCallback = noop, clickCallback = noop) {
  if (!cardTemplate) {
    return;
  }
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  cardLikeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", clickCallback);
  cardDeleteButton.addEventListener("click", function (evt) {
    delCallback(evt);
    cardLikeButton.removeEventListener("click", likeCallback);
    cardImage.removeEventListener("click", clickCallback);
    cardDeleteButton.removeEventListener("click", delCallback);    
  });

  return cardElement;
}

function deleteCardHandler(evt) {
  evt.target.closest(".card").remove();
}

function likeCardHandler(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCardHandler, likeCardHandler };
