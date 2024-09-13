document.addEventListener('DOMContentLoaded', function() {
  var elements = document.querySelectorAll('.pseudocode');
  elements.forEach(function(element) {
      try {
          pseudocode.renderElement(element, {
              lineNumber: true,
              lineNumberPunc: ':',
              noEnd: false
          });
      } catch (error) {
          console.error('Error rendering pseudocode:', error);
          element.textContent = 'Error rendering pseudocode: ' + error.message;
      }
  });
});