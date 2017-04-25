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

  var showAllPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var wrapper = document.createElement('div');
      wrapper.style.display = 'inline-block';
      wrapper.style.width = '50px';
      wrapper.style.height = '50px';
      wrapper.style.marginRight = (i === 3 ? '0' : '5px');

      var photo = document.createElement('img');
      photo.src = photos[i];
      photo.style.maxWidth = '100%';
      photo.style.maxHeight = '100%';
      photo.style.minWidth = '100%';
      photo.style.minHeight = '100%';
      wrapper.appendChild(photo);

      fragment.appendChild(wrapper);
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
      card.querySelector('.lodge__photos').appendChild(showAllPhotos(house.offer.photos));

      dialogPanel.parentElement.replaceChild(card, dialogPanel);
    },

    showAvatar: function (house) {
      dialog.querySelector('.dialog__title img').src = house.author.avatar;
    }
  };
}();
