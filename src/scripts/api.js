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


function getUserFetch() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData);
}

function getCardsFetch() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData)
}

function patchUserFetch(user) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then(getResponseData)
}

function patchAvatarFetch(user) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: user.avatar,
    }),
  }).then(getResponseData)
}

function postCardFetch(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(getResponseData)
}

function deleteCardFetch(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

function putLikeFetch(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData)
}

function deleteLikeFetch(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

export { getUserFetch, getCardsFetch, patchUserFetch, postCardFetch, deleteCardFetch, putLikeFetch, deleteLikeFetch, patchAvatarFetch };
