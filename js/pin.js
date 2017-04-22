'use strict';

(function () {
  var houses = [];
  var filtered;

  var updateTypeList = function (type) {
    if (type === 'any') {
      filtered = houses;
    } else {
      filtered = houses.filter(function (value) {
        return value === type;
      });
    }
  };

  var drawPins = function (items) {
    window.showCard.pinMap.appendChild(window.showCard.createDocumentBlock(items));
    window.showCard.popupHandler(items);
  };

  window.filters.houseTypeChangeHandler = function (type) {
    updateTypeList(type);
    drawPins(filtered);
  };

  var successHandler = function (items) {
    houses = items;
    drawPins(items);
  };

  var errorHandler = function (message) {
    var div = document.createElement('div');

    div.style = 'position: absolute; left: 0; right: 0;';
    div.style = 'font-size: 30px; text-align: center; background-color: red';
    div.textContent = message;

    document.body.insertAdjacentElement('afterbegin', div);
  };

  window.loadData(successHandler, errorHandler);

})();
