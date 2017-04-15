'use strict';

window.createCard = function () {
  var dialog = document.querySelector('.dialog');

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
  
  return {
    dialog: dialog,

    createTemplate: function (house) {
      var template = document.querySelector('#lodge-template');
      var dialogPanel = dialog.querySelector('.dialog__panel');
      var element = template.content.cloneNode(true);

      element.querySelector('.lodge__title').textContent = house.offer.title;
      element.querySelector('.lodge__price').textContent = house.offer.address;
      element.querySelector('.lodge__price').innerHTML = house.offer.price + '&#x20bd;/ночь';
      element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + house.offer.guests + ' гостей в ' + house.offer.rooms + ' комнатах';
      element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
      element.querySelector('.lodge__features').appendChild(showAllFeatures(house.offer.features));
      element.querySelector('.lodge__description').textContent = house.offer.description;

      dialogPanel.parentElement.replaceChild(element, dialogPanel);
    }
  };
}();
