'use strict';

window.createData = function () {
  var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLES = [
    'Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
  ];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var generateRandomLengthArray = function (arr) {
    arr = arr.slice();

    var res = [];
    var length = Math.floor(Math.random() * arr.length);

    for (var i = 0; i <= length; i++) {
      res.push(window.common.spliceRandomElement(arr));
    }
    return res;
  };

  var generateArray = function (avatars, titles, types, checks, features, quantity) {
    var houses = [];
    avatars = avatars.slice();
    titles = titles.slice();

    for (var i = 0; i < quantity; i++) {
      var title = window.common.spliceRandomElement(titles);
      var avatar = window.common.spliceRandomElement(avatars);
      var object = {};

      object.author = {
        'avatar': 'img/avatars/user0' + avatar + '.png'
      };
      object.location = {
        'x': window.common.generateNumber(300, 900),
        'y': window.common.generateNumber(100, 500)
      };
      object.offer = {
        'title': title,
        'address': object.location.x + ', ' + object.location.y,
        'price': window.common.generateNumber(1000, 1000000),
        'type': window.common.getRandomValue(types),
        'rooms': window.common.generateNumber(1, 5),
        'guests': window.common.generateNumber(1, 10),
        'checkin': window.common.getRandomValue(checks),
        'checkout': window.common.getRandomValue(checks),
        'features': generateRandomLengthArray(features),
        'description': '',
        'photos': []
      };
      houses.push(object);
    }
    return houses;
  };
  return {
    houses: generateArray(AVATARS, TITLES, TYPES, CHECKS, FEATURES, 8)
  };
}();
