'use strict';

var preview = document.querySelector('.notice__preview img');
var fileChooser = document.querySelector('.notice__photo input[type=file]');
var callback = function (previewElement) {
  return previewElement;
};

window.imageLoader(preview, fileChooser, callback);
