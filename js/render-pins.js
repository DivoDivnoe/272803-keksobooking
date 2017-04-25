'use strict';

window.renderPins = function () {
  return function (houses) {
    while (!window.showCard.pinMap.lastElementChild.classList.contains('pin__main')) {
      window.showCard.pinMap.removeChild(window.showCard.pinMap.lastElementChild);
    }
    window.showCard.pinMap.appendChild(window.showCard.createDocumentBlock(houses));
    window.showCard.popupHandler(houses);
  };
}();
