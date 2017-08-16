var url = 'https://alpha.besport.com';
var page = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (usersim) Gecko/20100101 Firefox/54.0';

page.open(url, function(status) {
	setInterval(function() {
		console.log("URL: " + page.url);
		// page.render('screenshot.png');
    page.evaluate(function () {
      var selector ='button:not(.sign-up-button):not(.sign-in-button):not(.logout-btn):not(.report-btn):not(.ot-drp-menu-itm), a:not(.topbar-logo):not(.topbar-btn), .ot-car-ribbon-list-item';
      var clickables = document.querySelectorAll(selector);
      var random_index = [Math.floor(Math.random()*clickables.length)];
      var clickable = clickables[random_index];
      clickable.click();
    });
	}, 1000);
});
