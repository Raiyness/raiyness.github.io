document.addEventListener('DOMContentLoaded', function() {
    var elements = document.getElementsByClassName('pseudocode');
    for (var i = 0; i < elements.length; i++) {
      pseudocode.renderElement(elements[i]);
    }
  });