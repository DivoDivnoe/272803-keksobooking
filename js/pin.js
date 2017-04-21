'use strict';

window.createPins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var createDocumentBlock = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var div = document.createElement('div');

      div.className = 'pin';
      div.style = 'left: ' + (arr[i].location.x - div.style.width / 2) + 'px; top: ' + (arr[i].location.y - div.style.height) + 'px';
      div.tabIndex = '0';

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

  var successHandler = function (houses) {
    pinMap.appendChild(createDocumentBlock(houses));
  };

  var errorHandler = function (message) {
    var div = document.createElement('div');

    div.style = 'position: absolute; left: 0; right: 0;';
    div.style = 'font-size: 30px; text-align: center; background-color: red';
    div.textContent = message;

    document.body.insertAdjacentElement('afterbegin', div);
  };

  window.loadData(successHandler, errorHandler);

  return {
    pinMap: pinMap
  };
}();
