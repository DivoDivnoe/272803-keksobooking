'use strict';

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

var generateArray = function (avatars, titles, types, checks, features, quantity) {
  var res = [];

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
  var res = [];
  var length = Math.floor(Math.random() * arr.length);

  for (var i = 0; i < length; i++) {
    res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
  return res;
};

var createDocumentBlock = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var div = document.createElement('div');

    div.className = 'pin';
    div.style = 'left: ' + (arr[i].location.x - div.style.width / 2) + 'px; top: ' + (arr[i].location.y - div.style.height) + 'px';

    var img = document.createElement('img');

    img.src = arr[i].author.avatar;
    img.className = 'rounded';
    img.width = '40';
    img.height = '40';

    div.appendChild(img);
    fragment.appendChild(div);
  }
  return fragment;
};

var houses = generateArray(AVATARS, TITLES, TYPES, CHECKS, FEATURES, 8);

document.querySelector('.tokyo__pin-map').appendChild(createDocumentBlock(houses));

var createTemplate = function (house) {
  var template = document.querySelector('#lodge-template');
  var dialogPanel = document.querySelector('.dialog__panel');
  var element = template.content.cloneNode(true);

  element.querySelector('.lodge__title').textContent = house.offer.title;
  element.querySelector('.lodge__price').textContent = house.offer.address;
  element.querySelector('.lodge__price').innerHTML = house.offer.price + '&#x20bd;/ночь';
  element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + house.offer.guests + ' гостей в ' + house.offer.rooms + ' комнатах';
  element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
  element.querySelector('.lodge__features').appendChild(showAllFeatures(house.offer.features));
  element.querySelector('.lodge__description').textContent = house.offer.description;

  dialogPanel.parentElement.replaceChild(element, dialogPanel);
};

var showAllFeatures = function (features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var span = document.createElement('span');

    span.className = 'feature__image';
    span.classList.add('feature__image--' + features[i]);

    fragment.appendChild(span);
  }

  return fragment;
};

createTemplate(houses[0]);
document.querySelector('.dialog__title img').src = houses[0].author.avatar;