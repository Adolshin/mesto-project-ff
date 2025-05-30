// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(evt) {
  evt.target.parentElement.remove();
  console.log(evt.target);
};

function addCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
 
  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  cardButton.addEventListener("click", deleteCard);

  cardContainer.append(cardElement);
}

initialCards.forEach(function (item) {
  addCard(item);
});
