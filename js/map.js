'use strict';

(function () {
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

  window.common.hideElement(window.createCard.dialog);
})();
