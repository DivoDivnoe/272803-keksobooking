'use strict';

window.showCard = function () {
  var avatarImage = window.createCard.dialog.querySelector('.dialog__title img');
  var dialogClose = window.createCard.dialog.querySelector('.dialog__close');

  return {
    pinMap: document.querySelector('.tokyo__pin-map'),

    createDocumentBlock: function (arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        var div = document.createElement('div');

        div.className = 'pin';
        div.style = 'left: ' + (arr[i].location.x - div.style.width / 2) + 'px; top: ' + (arr[i].location.y - div.style.height) + 'px';
        div.tabIndex = '0';

        var img = document.createElement('img');

        img.src = arr[i].author.avatar;
        img.className = 'rounded';
        img.width = '40';
        img.height = '40';

        div.appendChild(img);
        fragment.appendChild(div);
      }
      return fragment;
    },

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

    popupHandler: function (houses) {
      var pinElements = [].filter.call(window.showCard.pinMap.querySelectorAll('.pin'), function (value, index) {
        return index > 0;
      });

      var closePopup = function (el) {
        window.showCard.hideElement(window.createCard.dialog);
        el.classList.remove('pin--active');
      };

      var openPopup = function (el, index) {
        avatarImage.src = houses[index].author.avatar;
        window.createCard.createTemplate(houses[index]);

        var activePinElement = window.showCard.pinMap.querySelector('.pin--active');

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
      };

      pinElements.forEach(function (el, index) {
        el.addEventListener('click', function () {
          openPopup(el, index);
        });
        el.addEventListener('keydown', function (evt) {
          if (window.showCard.isActivationKey(evt)) {
            openPopup(el, index);
          }
        });
      });
    }
  };
}();
