'use strict';

(function () {
  var houses;
  var filtered;

  var filterHouses = function () {
    filtered = houses.slice();

    filterHouseType(window.currentFilter.houseType);
    filterHousePrice(window.currentFilter.housePrice);
    filterHouseRooms(window.currentFilter.houseRooms);
    filterHouseGuests(window.currentFilter.houseGuests);
    filterHouseFeatures(window.currentFilter.houseFeatures);
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
    for (var key in features) {
      if (features[key] === true) {
        filtered = filtered.filter(function (house) {
          return house.offer.features.indexOf(key) > -1;
        });
      }
    }
  };

  window.currentFilter.filterChangeHandler = function () {
    filterHouses();
    window.debounce(function () {
      window.renderPins(filtered);
    });
  };

  var successHandler = function (items) {
    houses = items;
    var housesCopy = houses.slice();
    filtered = [];

    for (var i = 0; i < 3; i++) {
      filtered.push(window.common.spliceRandomElement(housesCopy));
    }
    window.renderPins(filtered);
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
