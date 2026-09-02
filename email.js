/* Assembles the organizers' email at runtime so the plain address never
   appears in the HTML source (avoids scraping / GitHub email detection).
   The address is split here and only joined in the browser.

   Usage in HTML:
     <a href="#" data-email>…</a>              -> click assembles & opens mailto
     <span data-email-text></span>             -> filled with the address as text
   (an element can carry both, e.g. a link that also shows the address). */
(function () {
  var user = 'complenet27';
  var domain = 'biocomplexlab.org';
  var addr = user + String.fromCharCode(64) + domain;   // never contiguous in source

  // Fill any element that should display the address
  var texts = document.querySelectorAll('[data-email-text]');
  for (var i = 0; i < texts.length; i++) texts[i].textContent = addr;

  // Wire links to assemble the mailto only on click
  var links = document.querySelectorAll('a[data-email]');
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'mailto:' + addr;
    });
  }
})();
