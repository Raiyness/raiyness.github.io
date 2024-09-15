document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var pseudocodeElements = document.querySelectorAll(".ps-root");

    var totalTextRemoved = 0;

    pseudocodeElements.forEach(function (element, index) {
      var lines = element.querySelectorAll(".ps-line");

      var textRemovedInElement = 0;

      lines.forEach(function (line, lineIndex) {
        var lastChild = line.lastElementChild;
        if (lastChild && lastChild.textContent.trim() === "TEXT") {
          lastChild.remove();
          textRemovedInElement++;
          totalTextRemoved++;
        } else if (line.childNodes.length > 0) {
          var lastTextNode = line.childNodes[line.childNodes.length - 1];
          if (
            lastTextNode.nodeType === Node.TEXT_NODE &&
            lastTextNode.textContent.trim() === "TEXT"
          ) {
            lastTextNode.remove();
            textRemovedInElement++;
            totalTextRemoved++;
          }
        }
      });
    });
  }, 1000);
});
