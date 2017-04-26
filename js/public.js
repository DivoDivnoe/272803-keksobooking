'use strict';

window.common = function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    isInteger: function (num) {
      return !isNaN(parseInt(num, 10));
    },

    spliceRandomElement: function (splicedArray) {
      return splicedArray.splice(Math.floor(Math.random() * splicedArray.length), 1)[0];
    },

    showElement: function (element) {
      element.style.display = 'block';
    },

    hideElement: function (element) {
      element.style.display = 'none';
    },

    isEscapeKey: function (evt) {
      return evt.keyCode === ESCAPE_KEY_CODE;
    },

    isActivationKey: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    }
  };
}();
