'use strict';

window.currentFilter = function () {
  var filters = document.querySelector('.tokyo__filters');
  var houseType = filters.querySelector('#housing_type');
  var housePrice = filters.querySelector('#housing_price');
  var houseRooms = filters.querySelector('#housing_room-number');
  var houseGuests = filters.querySelector('#housing_guests-number');
  var houseFeatures = filters.querySelectorAll('.feature input');

  var currentFilter = new window.Filter({
    houseType: houseType.value,
    housePrice: housePrice.value,
    houseRooms: houseRooms.value,
    houseGuests: houseGuests.value,
    houseFeatures: function () {
      var features = {};

      houseFeatures.forEach(function (feature) {
        features[feature.value] = feature.checked;
      });
      return features;
    }()
  });

  houseType.addEventListener('change', function () {
    currentFilter.houseTypeChange(houseType.value);
  });

  housePrice.addEventListener('change', function () {
    currentFilter.housePriceChange(housePrice.value);
  });
  houseRooms.addEventListener('change', function () {
    currentFilter.houseRoomsNumberChange(houseRooms.value);
  });
  houseGuests.addEventListener('change', function () {
    currentFilter.houseGuestsNumberChange(houseGuests.value);
  });
  houseFeatures.forEach(function (feature) {
    feature.addEventListener('click', function () {
      currentFilter.houseFeaturesChange(feature.value, feature.checked);
    });
  });

  return currentFilter;
}();
