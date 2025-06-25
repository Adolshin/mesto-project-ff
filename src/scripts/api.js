const config = {
  baseUrl: "https://nomoreparties.co./v1/wff-cohort-41",
  headers: {
    authorization: "515ed3f0-64e3-49c6-80e8-8e6a14a63a3c",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };


function getUserApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData);
}

function getCardsApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData)
}

function patchUserApi(user) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then(getResponseData)
}

function patchAvatarApi(user) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: user.avatar,
    }),
  }).then(getResponseData)
}

function postCardApi(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(getResponseData)
}

function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

function putLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData)
}

function deleteLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

export { getUserApi, getCardsApi, patchUserApi, postCardApi, deleteCardApi, putLikeApi, deleteLikeApi, patchAvatarApi };
