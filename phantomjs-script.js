var event = {
	"startURL": "https://alpha.besport.com/",
	"topURL": "https://alpha.besport.com/",
	"selector": "button:not(.sign-up-button):not(.sign-in-button):not(.logout-btn):not(.report-btn):not(.ot-drp-menu-itm), a:not(.topbar-logo):not(.topbar-btn):not([rel=\"nofollow\"]), .ot-car-ribbon-list-item",
	"clickFrequency": "1000"
};

var arg = JSON.parse(require('system').args[1]);
event.startURL = arg.startURL || event.startURL;
event.topURL = arg.topURL || event.topURL;
event.selector = arg.selector || event.selector;
event.clickFrequency = arg.clickFrequency || event.clickFrequency;

console.log("running with parameters " + JSON.stringify(event));

var page = require('webpage').create();

function strStartsWith(str, prefix) {
	return str.indexOf(prefix) === 0;
}

page.settings.userAgent = 'Mozilla/5.0 (usersim) Gecko/20100101 Firefox/54.0';

page.open(event.startURL, function(status) {
	setInterval(function() {
		console.log("URL: " + page.url);
		if (!strStartsWith(page.url, event.topURL))
		{
			console.log ("strayed to another page. exiting...")
			phantom.exit();
		};
		// page.render('screenshot.png');
		page.evaluate(function (selector) {
			var clickables = document.querySelectorAll(selector);
			var random_index = [Math.floor(Math.random()*clickables.length)];
			var clickable = clickables[random_index];
			clickable.click();
		}, event.selector);
	}, event.clickFrequency);
});
