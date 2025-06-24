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

  renderLikesCounter(cardLikeCounter, element.likes.length);


  if (userId != element.owner._id) {
    cardDeleteButton.remove();
  }

  element.likes.forEach((item) => {
    if (item._id == userId) {
      likeCard(cardLikeButton);
    }
  });

  cardImage.addEventListener("click", clickCallback);
  cardLikeButton.addEventListener("click", function () {
    // console.log(element._id);
    // console.log(element.name);
    const likeStatus = cardLikeButton.classList.contains(
      "card__like-button_is-active"
    );
    // let likeStatus = null;
    // element.likes.forEach((item) => {
    //   if (item._id == userId) {
    //     console.log(item._id);
    //     likeStatus = true;
    //   }
    // });

    console.log(likeStatus);
    likeCallback(cardLikeButton, cardLikeCounter, element._id, likeStatus);
    
  });
  cardDeleteButton.addEventListener("click", function () {
    console.log(element._id);
    delCallback(cardElement, element._id);
  });

  return cardElement;
}

function deleteCard(element) {
  element.remove();
  element = null;
}

function likeCard( element ) { 
  element.classList.toggle("card__like-button_is-active");
  
//   const newElement = document.createElement('div');
//   newElement.textContent = element.likes.length;
//   likeElement.after(newElement);

// element.before(newElement);
//   // counterElement.textContent = element.likes.length;
//   console.log(element)
}

function renderLikesCounter(element, value) {
  element.textContent = value;
}

function renderButtonStatus(element) {}

export { createCard, deleteCard, likeCard,  renderLikesCounter};
