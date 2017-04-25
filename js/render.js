'use strict';

window.popup = function () {
  var dialog = document.querySelector('.dialog');

  var showAllFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureImage = document.createElement('span');

      featureImage.className = 'feature__image';
      featureImage.classList.add('feature__image--' + features[i]);

      fragment.appendChild(featureImage);
    }

    return fragment;
  };

  return {
    dialog: dialog,

    renderCard: function (house) {
      var template = document.querySelector('#lodge-template');
      var dialogPanel = dialog.querySelector('.dialog__panel');
      var card = template.content.cloneNode(true);

      card.querySelector('.lodge__title').textContent = house.offer.title;
      card.querySelector('.lodge__price').textContent = house.offer.address;
      card.querySelector('.lodge__price').innerHTML = house.offer.price + '&#x20bd;/ночь';
      card.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + house.offer.guests + ' гостей в ' + house.offer.rooms + ' комнатах';
      card.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
      card.querySelector('.lodge__features').appendChild(showAllFeatures(house.offer.features));
      card.querySelector('.lodge__description').textContent = house.offer.description;

      dialogPanel.parentElement.replaceChild(card, dialogPanel);
    },

    showAvatar: function (house) {
      dialog.querySelector('.dialog__title img').src = house.author.avatar;
    }
  };
}();
