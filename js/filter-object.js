'use strict';

(function () {
  var Filter = function (data) {
    this.houseType = data.houseType;
    this.housePrice = data.housePrice;
    this.houseRooms = data.houseRooms;
    this.houseGuests = data.houseGuests;
    this.houseFeatures = data.houseFeatures;
  };

  Filter.prototype = {
    houseTypeChange: function (type) {
      var newType = type;
      this.houseType = newType;
      this.filterChangeHandler(this);

      return newType;
    },
    housePriceChange: function (price) {
      var newPrice = price;
      this.housePrice = newPrice;
      this.filterChangeHandler(this);

      return newPrice;
    },
    houseRoomsNumberChange: function (rooms) {
      var newRooms = rooms;
      this.houseRooms = newRooms;
      this.filterChangeHandler(this);

      return newRooms;
    },
    houseGuestsNumberChange: function (guests) {
      var newGuests = guests;
      this.houseGuests = newGuests;
      this.filterChangeHandler(this);

      return newGuests;
    },
    houseFeaturesChange: function (feature, checkedOrNot) {
      this.houseFeatures[feature] = checkedOrNot;
      this.filterChangeHandler(this);

      return this.houseFeatures;
    },

    filterChangeHandler: function (filter) {
      return filter;
    }
  };

  window.Filter = Filter;
})();
