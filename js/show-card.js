'use strict';

window.showCard = function () {
  var avatarImage = window.createCard.dialog.querySelector('.dialog__title img');
  var dialogClose = window.createCard.dialog.querySelector('.dialog__close');

  var closePopup = function (el) {
    window.showCard.hideElement(window.createCard.dialog);
    el.classList.remove('pin--active');
  };
  
  return {
    showElement: function (el) {
      el.style.display = 'block';
    },

    hideElement: function (el) {
      el.style.display = 'none';
    },

    isEscapeKey: function (evt) {
      return evt.keyCode === 27;
    },

    isActivationKey: function (evt) {
      return evt.keyCode === 13;
    },

    openPopup: function (el, index) {
      avatarImage.src = window.createData.houses[index].author.avatar;
      window.createCard.createTemplate(window.createData.houses[index]);

      var activePinElement = window.createPins.pinMap.querySelector('.pin--active');

      if (activePinElement && activePinElement !== el) {
        activePinElement.classList.remove('pin--active');
      }

      el.classList.add('pin--active');
      window.showCard.showElement(window.createCard.dialog);

      document.addEventListener('keydown', function (evt) {
        if (window.showCard.isEscapeKey(evt)) {
          closePopup(el);
        }
      });

      dialogClose.addEventListener('click', function () {
        closePopup(el);
      });

      dialogClose.addEventListener('keydown', function (evt) {
        if (window.showCard.isActivationKey(evt)) {
          closePopup(el);
        }
      });
    }
  }
}();
