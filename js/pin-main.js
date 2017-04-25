'use strict';

(function () {
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 200;
  var MAX_Y = 700;

  var pinMain = window.showCard.pinMap.querySelector('.pin__main');
  var address = window.bookingForm.noticeForm.querySelector('#address');

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

      if (pinMain.offsetTop + pinMain.offsetHeight <= MIN_Y) {
        pinMain.style.top = MIN_Y + 1 - pinMain.offsetHeight + 'px';
      } else if (pinMain.offsetTop + pinMain.offsetHeight <= MAX_Y) {
        pinMain.style.top = pinMain.offsetTop + shift.y + 'px';
      } else {
        pinMain.style.top = MAX_Y - pinMain.offsetHeight + 'px';
      }

      if (pinMain.offsetLeft + pinMain.offsetWidth / 2 <= MIN_X) {
        pinMain.style.left = 1 - pinMain.offsetWidth / 2 + 'px';
      } else if (pinMain.offsetLeft + pinMain.offsetWidth / 2 <= MAX_X) {
        pinMain.style.left = pinMain.offsetLeft + shift.x + 'px';
      } else {
        pinMain.style.left = MAX_X - 1 - pinMain.offsetWidth / 2 + 'px';
      }

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

  window.common.hideElement(window.popup.dialog);
})();
