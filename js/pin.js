'use strict';

(function () {
  var houses;
  var filtered;
  var houseType = window.filters.houseType;
  var housePrice = window.filters.housePrice;
  var houseRooms = window.filters.houseRooms;
  var houseGuests = window.filters.houseGuests;
  var houseFeatures = window.filters.houseFeatures;

  var isInteger = function (num) {
    return !isNaN(parseInt(num, 10));
  };

  var drawPins = function () {
    filterHouses();

    while (!window.showCard.pinMap.lastElementChild.classList.contains('pin__main')) {
      window.showCard.pinMap.removeChild(window.showCard.pinMap.lastElementChild);
    }
    window.showCard.pinMap.appendChild(window.showCard.createDocumentBlock(filtered));
    window.showCard.popupHandler(filtered);
  };

  var filterHouses = function () {
    filtered = houses.slice();

    filterHouseType(houseType);
    filterHousePrice(housePrice);
    filterHouseRooms(houseRooms);
    filterHouseGuests(houseGuests);
    filterHouseFeatures(houseFeatures);
  };

  var filterHouseType = function (type) {
    if (type !== 'any') {
      filtered = filtered.filter(function (value) {
        return value.offer.type === type;
      });
    }
  };

  var filterHousePrice = function (price) {
    if (price === 'low') {
      filtered = filtered.filter(function (value) {
        return value.offer.price < 10000;
      });
    } else if (price === 'high') {
      filtered = filtered.filter(function (value) {
        return value.offer.price > 50000;
      });
    } else {
      filtered = filtered.filter(function (value) {
        return value.offer.price <= 50000 && value.offer.price >= 10000;
      });
    }
  };

  var filterHouseRooms = function (rooms) {
    if (isInteger(rooms)) {
      filtered = filtered.filter(function (value) {
        return value.offer.rooms === parseInt(rooms, 10);
      });
    }
  };

  var filterHouseGuests = function (guests) {
    if (isInteger(guests)) {
      filtered = filtered.filter(function (value) {
        return value.offer.rooms === parseInt(guests, 10);
      });
    }
  };

  var filterHouseFeatures = function (features) {
    features.forEach(function (feature) {
      if (feature.checked) {
        filtered = filtered.filter(function (value) {
          return value.offer.features.indexOf(feature.value) > -1;
        });
      }
    });
  };

  window.filters.houseTypeChangeHandler = function (type) {
    houseType = type;
    window.debounce(drawPins);
  };

  window.filters.housePriceChangeHandler = function (price) {
    housePrice = price;
    window.debounce(drawPins);
  };

  window.filters.roomsNumberChangeHandler = function (rooms) {
    houseRooms = rooms;
    window.debounce(drawPins);
  };

  window.filters.guestsNumberChangeHandler = function (guests) {
    houseGuests = guests;
    window.debounce(drawPins);
  };

  window.filters.featureCheckHandler = function (features) {
    houseFeatures = features;
    window.debounce(drawPins);
  };

  var successHandler = function (items) {
    houses = items;
    drawPins();
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
