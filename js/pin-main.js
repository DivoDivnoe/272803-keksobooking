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

    var getMinCoord = function (minCoord, dimension) {
      return minCoord + 1 - dimension + 'px';
    };

    var getMaxCoord = function (maxCoord, dimension) {
      return maxCoord - 1 - dimension + 'px';
    };

    var mouseMoveHandler = function (moveEvt) {
      var cursorOffsetY = pinMain.offsetTop + pinMain.offsetHeight;
      var cursorOffsetX = pinMain.offsetLeft + pinMain.offsetWidth / 2;
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (cursorOffsetY <= MIN_Y) {
        pinMain.style.top = getMinCoord(MIN_Y, pinMain.offsetHeight);
      } else if (cursorOffsetY <= MAX_Y) {
        pinMain.style.top = pinMain.offsetTop + shift.y + 'px';
      } else {
        pinMain.style.top = getMaxCoord(MAX_Y, pinMain.offsetHeight);
      }

      if (cursorOffsetX <= MIN_X) {
        pinMain.style.left = getMinCoord(MIN_X, pinMain.offsetWidth / 2);
      } else if (cursorOffsetX <= MAX_X) {
        pinMain.style.left = pinMain.offsetLeft + shift.x + 'px';
      } else {
        pinMain.style.left = getMaxCoord(MAX_X, pinMain.offsetWidth / 2);
      }

      address.value = 'x: ' + cursorOffsetX.toFixed(0) + ', y: ' + cursorOffsetY.toFixed(0);
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
