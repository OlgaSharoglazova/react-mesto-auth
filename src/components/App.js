import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setselectedCard] = React.useState(null);
  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    getInfoUser();
    getCards();
  }, []);

  function getInfoUser() {
    api
      .getProfile()
      .then((dataUser) => {
        setСurrentUser(dataUser);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function getCards() {
    api
      .getInitialCards(cards)
      .then((cards) => {
        setCards(
          cards.map((card) => ({
            card: card,
            cardId: card._id,
          }))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        getCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        getCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((newData) => {
        setСurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardClick(selectedCard) {
    setselectedCard(selectedCard);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        getCards(newCards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(dataUser) {
    api
      .editProfile(dataUser)
      .then((newData) => {
        setСurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setselectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          title={"Вы уверены?"}
          name={"confirm"}
          buttonTitle={"Да"}
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
