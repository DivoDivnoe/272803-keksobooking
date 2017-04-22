'use strict';

window.filters = function () {
  var filters = document.querySelector('.tokyo__filters');
  var houseType = filters.querySelector('#housing_type');

  houseType.addEventListener('change', function () {
    window.filters.houseTypeChangeHandler(houseType.value);
  });

  filters.querySelector('#housing_price').addEventListener('change', function () {
    window.filters.housePriceChangeHandler();
  });
  filters.querySelector('#housing_room-number').addEventListener('change', function () {
    window.filters.roomsNumberChangeHandler();
  });
  filters.querySelector('#housing_guests-number').addEventListener('change', function () {
    window.filters.guestsNumberChangeHandler();
  });
  filters.querySelector('#housing_features').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('feature')) {
      window.filters.featureCheckHandler();
    }
  });

  return {
    houseTypeChangeHandler: function (type) {},
    housePriceChangeHandler: function () {},
    roomsNumberChangeHandler: function () {},
    guestsNumberChangeHandler: function () {},
    featureCheckHandler: function () {}
  };
}();
