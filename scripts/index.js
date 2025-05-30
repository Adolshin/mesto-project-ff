// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

function createCard(element) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardTitle.textContent = element.name;

  cardButton.addEventListener("click", deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item));
});
