'use strict';

window.imageLoader = function () {
  var FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
  var preview;

  return function (previewElement, fileChooser, func) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_EXTENSIONS.some(function (ext) {
        return fileName.endsWith(ext);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview = func(previewElement);
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };
}();
