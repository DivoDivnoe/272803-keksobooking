'use strict';

window.synchronizeFields = function () {
  return function (field1, field2, values1, values2, func) {
    var value = values2[values1.indexOf(field1.value)];

    return func(field2, value);
  };
}();
