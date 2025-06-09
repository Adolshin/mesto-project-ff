const cardTemplate = document.querySelector("#card-template").content;

function createCard(element) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = element.description;
  cardTitle.textContent = element.name; 

  return cardElement;
}

function deleteCard(evt) {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.closest(".card").remove();
  }
}

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, likeCard, deleteCard };
