
const cardTemplate = document.querySelector("#card-template").content;
const noop = function () {};

function createCard(
  element,
  userId,
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
  if (userId != element.owner._id) {
    cardDeleteButton.remove();
  }
  const likeStatus = cardLikeButton.classList.contains('card__like-button_is-active');
   
  cardImage.addEventListener("click", clickCallback);
  cardLikeButton.addEventListener("click", function () {  
    // console.log(element._id); 
    // console.log(element.name); 
    // console.log(element.likes.length); 
    likeCallback(cardLikeButton, element._id, likeStatus);
    cardLikeCounter.textContent = element.likes.length;
  
  });
  cardDeleteButton.addEventListener("click", function () {   
    console.log(element._id);
    delCallback(cardElement, element._id);
  });

  return cardElement;
}

function deleteCard(cardElement) {  
    cardElement.remove();
    cardElement = null;
}

function likeCard(likeElement) {  
  likeElement.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
