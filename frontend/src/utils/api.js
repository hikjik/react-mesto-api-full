const API_ROOT = process.env.REACT_APP_API_ROOT;

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._getHeaders(),
    }).then((resp) => this._checkResp(resp, "Ошибка при загрузке карточек"));
  }

  postCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((resp) => this._checkResp(resp, "Ошибка при добавлении новой карточки"));
  }

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((resp) => this._checkResp(resp, "Ошибка при удалении карточки"));
  }

  putLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then((resp) => this._checkResp(resp, "Ошибка при постановке лайка"));
  }

  deleteLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((resp) => this._checkResp(resp, "Ошибка при снятии лайка"));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.putLike({ cardId }) : this.deleteLike({ cardId });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._getHeaders(),
    }).then((resp) => this._checkResp(resp, "Ошибка при загрузке информации о пользователе"));
  }

  patchUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((resp) => this._checkResp(resp, "Ошибка при редактировании профиля"));
  }

  patchUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((resp) => this._checkResp(resp, "Ошибка при обновлении аватара пользователя"));
  }

  _checkResp(resp, errorMessage) {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`${errorMessage}: ${resp.status}`);
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  }
}

const api = new Api({
  baseUrl: API_ROOT,
});

export default api;
