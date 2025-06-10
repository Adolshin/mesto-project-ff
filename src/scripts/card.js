const cardTemplate = document.querySelector("#card-template").content;
const noop = function () {};

function createCard(
  element,
  delCallback = noop,
  likeCallback = noop,
  clickCallback = noop
) {
  if (!cardTemplate) {
    return
  }
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = element.description;
  cardTitle.textContent = element.name;

  function cardHandlers(evt) {
    likeCallback(evt);
    clickCallback(evt);
    delCallback(evt, cardHandlers);
  }

  cardElement.addEventListener("click", cardHandlers);

  return cardElement;
}

const deleteCardHandler = function (evt, callback) {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.closest(".card").remove();
    evt.target.closest(".card").removeEventListener("click", callback);
  }
};

const likeCardHandler = function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

export { createCard, deleteCardHandler, likeCardHandler };
