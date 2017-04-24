'use strict';

window.synchronizeFields = function () {
  return function (field1, field2, fieldValues1, fieldValues2, func) {
    var value = fieldValues2[fieldValues1.indexOf(field1.value)];

    return func(field2, value);
  };
}();
