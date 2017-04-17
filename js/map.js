'use strict';

(function () {
  var dialogClose = window.createCard.dialog.querySelector('.dialog__close');
  var avatarImage = window.createCard.dialog.querySelector('.dialog__title img');
  var pinMain = window.createPins.pinMap.querySelector('.pin__main');
  var address = window.bookingForm.noticeForm.querySelector('#address');

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
    hideElement(window.createCard.dialog);
    el.classList.remove('pin--active');
  };

  var openPopup = function (el, index) {
    avatarImage.src = window.createData.houses[index].author.avatar;
    window.createCard.createTemplate(window.createData.houses[index]);

    var activePinElement = window.createPins.pinMap.querySelector('.pin--active');

    if (activePinElement && activePinElement !== el) {
      activePinElement.classList.remove('pin--active');
    }

    el.classList.add('pin--active');
    showElement(window.createCard.dialog);

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

  window.createPins.pinElements.forEach(function (el, index) {
    el.addEventListener('click', function () {
      openPopup(el, index);
    });
    el.addEventListener('keydown', function (evt) {
      if (isActivationKey(evt)) {
        openPopup(el, index);
      }
    });
  });

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = pinMain.offsetLeft + shift.x + 'px';
      pinMain.style.top = pinMain.offsetTop + shift.y + 'px';

      address.value = 'x: ' + (pinMain.offsetLeft + pinMain.offsetWidth / 2).toFixed(0) + ', y: ' + (pinMain.offsetTop + pinMain.offsetHeight).toFixed(0);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mousemove', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  address.value = address.value = 'x: ' + (pinMain.offsetLeft + pinMain.offsetWidth / 2).toFixed(0) + ', y: ' + (pinMain.offsetTop + pinMain.offsetHeight).toFixed(0);

  address.addEventListener('blur', function () {
    var arr = address.value.split(', ');

    pinMain.style.left = parseInt(arr[0].substr(3), 10) - pinMain.offsetWidth / 2 + 'px';
    pinMain.style.top = parseInt(arr[1].substr(3), 10) - pinMain.offsetHeight + 'px';
  });

  hideElement(window.createCard.dialog);
})();
