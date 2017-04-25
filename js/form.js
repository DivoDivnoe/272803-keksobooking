'use strict';

window.bookingForm = (function () {
  var TIME_IN_ARRAY = ['12', '13', '14'];
  var TIME_OUT_ARRAY = ['12', '13', '14'];
  var HOUSE_TYPE_ARRAY = ['Квартира', 'Лачуга', 'Дворец'];
  var PRICE_PER_NIGHT_ARRAY = ['Квартира', 'Лачуга', 'Дворец'];
  var ROOMS_NUMBER_ARRAY = ['1 комната', '2 комнаты', '100 комнат'];
  var CAPACITY_ARRAY = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

  var noticeForm = document.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var previewWrappers = noticeForm.querySelectorAll('.form__photo');
  var fileChooser = noticeForm.querySelector('.upload input[type=file]');
  var photoItems;
  var draggedItem;

  var callback = function (previewContainers) {
    for (var i = 0; i < previewContainers.length; i++) {

      if (!previewContainers[i].firstElementChild) {
        var previewElement = document.createElement('img');

        previewElement.classList.add('house-photo');
        previewContainers[i].appendChild(previewElement);
        photoItems = noticeForm.querySelectorAll('.house-photo');

        makeDraggable(photoItems);

        break;
      }
    }
    return previewElement;
  };

  var makeDraggable = function (images) {
    images.forEach(function (image) {
      image.addEventListener('dragstart', function (evt) {
        if (evt.target.tagName.toLowerCase() === 'img') {
          draggedItem = evt.target;
          evt.dataTransfer.setData('text/plain', evt.target.alt);
        }
      });
    });
  };

  previewWrappers.forEach(function (container) {
    container.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });

    container.addEventListener('drop', function (evt) {
      if (!container.firstElementChild) {
        evt.target.appendChild(draggedItem);
      }
    });
  });

  window.imageLoader(previewWrappers, fileChooser, callback);

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValuesWithMin = function (element, value) {
    element.min = value;
    element.setAttribute('placeholder', value);
  };

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, HOUSE_TYPE_ARRAY, PRICE_PER_NIGHT_ARRAY, syncValuesWithMin);
  });

  timein.addEventListener('change', function () {
    window.synchronizeFields(timein, timeout, TIME_IN_ARRAY, TIME_OUT_ARRAY, syncValues);
  });

  rooms.addEventListener('change', function () {
    window.synchronizeFields(rooms, capacity, ROOMS_NUMBER_ARRAY, CAPACITY_ARRAY, syncValues);
  });

  noticeForm.addEventListener('invalid', function (evt) {
    var target = evt.target;

    target.style.border = '1px solid red';
    target.style.boxShadow = 'none';
  }, true);

  return {
    noticeForm: noticeForm
  };
})();
