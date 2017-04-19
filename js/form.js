'use strict';

window.bookingForm = (function () {
  var noticeForm = document.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValuesWithMin = function (element, value) {
    element.min = value;
    element.setAttribute('placeholder', value);
  };

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, ['Квартира', 'Лачуга', 'Дворец'], [1000, 0, 10000], syncValuesWithMin);
  });

  timein.addEventListener('change', function () {
    window.synchronizeFields(timein, timeout, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });

  rooms.addEventListener('change', function () {
    window.synchronizeFields(rooms, capacity, ['1 комната', '2 комнаты', '100 комнат'], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], syncValues);
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
