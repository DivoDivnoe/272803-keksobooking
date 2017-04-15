'use strict';

(function () {
  var dialogClose = createCard.dialog.querySelector('.dialog__close');
  var avatarImage = createCard.dialog.querySelector('.dialog__title img');

  var showElement = function (el) {
    el.style.display = 'block';
  };

  var hideElement = function (el) {
    el.style.display = 'none';
  };

  var isActivationKey = function (evt) {
    return evt.keyCode === 13;
  };

  var isEscapeKey = function (evt) {
    return evt.keyCode === 27;
  };

  var closePopup = function (el) {
    hideElement(createCard.dialog);
    el.classList.remove('pin--active');
  };

  var openPopup = function (el, index) {
    avatarImage.src = createData.houses[index].author.avatar;
    createCard.createTemplate(createData.houses[index]);

    var activePinElement = createPins.pinMap.querySelector('.pin--active');

    if (activePinElement && activePinElement !== el) {
      activePinElement.classList.remove('pin--active');
    }

    el.classList.add('pin--active');
    showElement(createCard.dialog);

    dialogClose.addEventListener('click', function () {
      closePopup(el);
    });

    dialogClose.addEventListener('keydown', function (evt) {
      if (isActivationKey(evt)) {
        closePopup(el);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (isEscapeKey(evt)) {
        closePopup(el);
      }
    });
  };

  createPins.pinElements.forEach(function (el, index) {
    el.addEventListener('click', function () {
      openPopup(el, index);
    });
    el.addEventListener('keydown', function (evt) {
      if (isActivationKey(evt)) {
        openPopup(el, index);
      }
    });
  });

  hideElement(createCard.dialog);
})();
