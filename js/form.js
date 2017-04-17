'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  timein.addEventListener('change', function () {
    timeout.value = timein.value.replace('after', 'before');
  });

  var setPrice = function (value) {
    price.min = value;
    price.setAttribute('placeholder', value);
  };

  type.addEventListener('change', function () {
    if (type.value === 'Квартира') {
      setPrice(1000);
    } else if (type.value === 'Лачуга') {
      setPrice(0);
    } else {
      setPrice(10000);
    }
  });

  rooms.addEventListener('change', function () {
    if (rooms.value === '1 комната') {
      capacity.value = 'не для гостей';
    } else {
      capacity.value = 'для 3 гостей';
    }
  });

  noticeForm.addEventListener('invalid', function (evt) {
    var target = evt.target;

    target.style.border = '1px solid red';
    target.style.boxShadow = 'none';
  }, true);
})();
