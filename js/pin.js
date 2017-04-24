'use strict';

(function () {
  var houses;
  var filtered;
  var houseType = window.filters.houseType;
  var housePrice = window.filters.housePrice;
  var houseRooms = window.filters.houseRooms;
  var houseGuests = window.filters.houseGuests;
  var houseFeatures = window.filters.houseFeatures;

  var drawPins = function () {


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
      filtered = filtered.filter(function (house) {
        return house.offer.type === type;
      });
    }
  };

  var filterHousePrice = function (price) {
    switch (price) {
      case 'low':
        filtered = filtered.filter(function (house) {
          return house.offer.price < 10000;
        });
        break;
      case 'high':
        filtered = filtered.filter(function (house) {
          return house.offer.price > 50000;
        });
        break;
      case 'middle':
        filtered = filtered.filter(function (house) {
          return house.offer.price <= 50000 && house.offer.price >= 10000;
        });
    }
  };

  var filterHouseRooms = function (rooms) {
    if (window.common.isInteger(rooms)) {
      filtered = filtered.filter(function (house) {
        return house.offer.rooms === parseInt(rooms, 10);
      });
    }
  };

  var filterHouseGuests = function (guests) {
    if (window.common.isInteger(guests)) {
      filtered = filtered.filter(function (house) {
        return house.offer.guests === parseInt(guests, 10);
      });
    }
  };

  var filterHouseFeatures = function (features) {
    features.forEach(function (feature) {
      if (feature.checked) {
        filtered = filtered.filter(function (house) {
          return house.offer.features.indexOf(feature.value) > -1;
        });
      }
    });
  };

  window.filters.houseTypeChangeHandler = function (type) {
    houseType = type;
    filterHouses();
    window.debounce(drawPins);
  };

  window.filters.housePriceChangeHandler = function (price) {
    housePrice = price;
    filterHouses();
    window.debounce(drawPins);
  };

  window.filters.roomsNumberChangeHandler = function (rooms) {
    houseRooms = rooms;
    filterHouses();
    window.debounce(drawPins);
  };

  window.filters.guestsNumberChangeHandler = function (guests) {
    houseGuests = guests;
    filterHouses();
    window.debounce(drawPins);
  };

  window.filters.featureCheckHandler = function (features) {
    houseFeatures = features;
    filterHouses();
    window.debounce(drawPins);
  };

  var successHandler = function (items) {
    houses = items;
    var housesCopy = houses.slice();
    filtered = [];

    for (var i = 0; i < 3; i++) {
      filtered.push(window.common.spliceRandomElement(housesCopy));
    }
    drawPins();
  };

  var errorHandler = function (message) {
    var msgWrapper = document.createElement('div');

    msgWrapper.style = 'position: absolute; left: 0; right: 0;';
    msgWrapper.style = 'font-size: 30px; text-align: center; background-color: red';
    msgWrapper.textContent = message;

    document.body.insertAdjacentElement('afterbegin', msgWrapper);
  };

  window.loadData(successHandler, errorHandler);
})();
