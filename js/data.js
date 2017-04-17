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

  var spliceRandomElement = function (el) {
    return el.splice(Math.floor(Math.random() * el.length), 1)[0];
  };

  var generateNumber = function (first, last) {
    return Math.round(Math.random() * (last - first) + first);
  };

  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateRandomLengthArray = function (arr) {
    arr = arr.slice();

    var res = [];
    var length = Math.floor(Math.random() * arr.length);

    for (var i = 0; i <= length; i++) {
      res.push(spliceRandomElement(arr));
    }
    return res;
  };

  var generateArray = function (avatars, titles, types, checks, features, quantity) {
    var res = [];
    avatars = avatars.slice();
    titles = titles.slice();

    for (var i = 0; i < quantity; i++) {
      var title = spliceRandomElement(titles);
      var avatar = spliceRandomElement(avatars);
      var object = {};

      object.author = {
        'avatar': 'img/avatars/user0' + avatar + '.png'
      };
      object.location = {
        'x': generateNumber(300, 900),
        'y': generateNumber(100, 500)
      };
      object.offer = {
        'title': title,
        'address': object.location.x + ', ' + object.location.y,
        'price': generateNumber(1000, 1000000),
        'type': getRandomValue(types),
        'rooms': generateNumber(1, 5),
        'guests': generateNumber(1, 10),
        'checkin': getRandomValue(checks),
        'checkout': getRandomValue(checks),
        'features': generateRandomLengthArray(features),
        'description': '',
        'photos': []
      };
      res.push(object);
    }
    return res;
  };
  return {
    houses: generateArray(AVATARS, TITLES, TYPES, CHECKS, FEATURES, 8)
  };
}();
