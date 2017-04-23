'use strict';

window.filters = function () {
  var filters = document.querySelector('.tokyo__filters');
  var houseType = filters.querySelector('#housing_type');
  var housePrice = filters.querySelector('#housing_price');
  var houseRooms = filters.querySelector('#housing_room-number');
  var houseGuests = filters.querySelector('#housing_guests-number');
  var houseFeatures = filters.querySelectorAll('.feature input');

  houseType.addEventListener('change', function () {
    window.filters.houseTypeChangeHandler(houseType.value);
  });

  housePrice.addEventListener('change', function () {
    window.filters.housePriceChangeHandler(housePrice.value);
  });
  houseRooms.addEventListener('change', function () {
    window.filters.roomsNumberChangeHandler(houseRooms.value);
  });
  houseGuests.addEventListener('change', function () {
    window.filters.guestsNumberChangeHandler(houseGuests.value);
  });
  houseFeatures.forEach(function (feature) {
    feature.addEventListener('click', function () {
      window.filters.featureCheckHandler(houseFeatures);
    });
  });

  return {
    houseType: houseType.value,
    housePrice: housePrice.value,
    houseRooms: houseRooms.value,
    houseGuests: houseGuests.value,
    houseFeatures: houseFeatures,
    houseTypeChangeHandler: function () {},
    housePriceChangeHandler: function () {},
    roomsNumberChangeHandler: function () {},
    guestsNumberChangeHandler: function () {},
    featureCheckHandler: function () {}
  };
}();
