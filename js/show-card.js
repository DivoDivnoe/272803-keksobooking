'use strict';

window.showCard = function () {
  var dialogClose = window.popup.dialog.querySelector('.dialog__close');

  return {
    pinMap: document.querySelector('.tokyo__pin-map'),

    createDocumentBlock: function (houses) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < houses.length; i++) {
        var card = document.createElement('div');

        card.className = 'pin';
        card.style = 'left: ' + (houses[i].location.x - card.style.width / 2) + 'px; top: ' + (houses[i].location.y - card.style.height) + 'px';
        card.tabIndex = '0';

        var avatar = document.createElement('img');

        avatar.src = houses[i].author.avatar;
        avatar.className = 'rounded';
        avatar.width = '40';
        avatar.height = '40';

        card.appendChild(avatar);
        fragment.appendChild(card);
      }
      return fragment;
    },

    popupHandler: function (houses) {
      var pinElements = [].filter.call(window.showCard.pinMap.querySelectorAll('.pin'), function (_, index) {
        return index > 0;
      });

      var closePopup = function (pin) {
        window.common.hideElement(window.popup.dialog);
        pin.classList.remove('pin--active');
      };

      var openPopup = function (pin, index) {
        window.popup.showAvatar(houses[index]);
        window.popup.renderCard(houses[index]);

        var activePinElement = window.showCard.pinMap.querySelector('.pin--active');

        if (activePinElement && activePinElement !== pin) {
          activePinElement.classList.remove('pin--active');
        }

        pin.classList.add('pin--active');
        window.common.showElement(window.popup.dialog);

        document.addEventListener('keydown', function (evt) {
          if (window.common.isEscapeKey(evt)) {
            closePopup(pin);
          }
        });

        dialogClose.addEventListener('click', function () {
          closePopup(pin);
        });

        dialogClose.addEventListener('keydown', function (evt) {
          if (window.common.isActivationKey(evt)) {
            closePopup(pin);
          }
        });
      };

      pinElements.forEach(function (pinElement, index) {
        pinElement.addEventListener('click', function () {
          window.currentHouse = new window.House(houses[index]);
          openPopup(pinElement, index);
        });
        pinElement.addEventListener('keydown', function (evt) {
          if (window.common.isActivationKey(evt)) {
            window.currentHouse = new window.House(houses[index]);
            openPopup(pinElement, index);
          }
        });
      });
    }
  };
}();
