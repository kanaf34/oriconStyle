var loadJSONP = (function() {
	var unique = 0;
	return function(url, callback, context) {
		var name = "_jsonp_" + unique++;
		if (url.match(/\?/)) url += "&callback="+name;
    	else url += "?callback="+name;

		var script = document.createElement('script');
		script.type = 'application/javascript';
		script.src  = url;

		window[name] = function(data) {
			callback.call((context||window), data);
			document.getElementsByTagName('head')[0].removeChild(script);
			script = null;
			delete window[name];
		}

		document.getElementsByTagName('head')[0].appendChild(script);
	}
})();

var parsePageToJson = function(result) {
	var divRank = document.getElementById('rankList');

	var rankList = result.rankList;
	var ul = document.createElement('ul');
	for (var i=0; i<rankList.length; i++) {
		var li = document.createElement('li');
		li.innerText = (i+1) + ' / ' + rankList[i].title + ' / ' + rankList[i].singer + ' / ' + rankList[i].organization;
		ul.appendChild(li);
	}
	divRank.appendChild(ul);
}

var getToday = function() {
	var date = new Date(),
	    month = '' + (date.getMonth() + 1),
	    day   = '' + date.getDate(),
	    year  = date.getFullYear();

	month = (month.length < 2) ? '0' + month : month;
	day   = (day.length < 2) ? '0' + day : day;
	return [year, month, day].join('-');
}

var url = 'https://script.google.com/macros/s/AKfycbx_JQBUfwIjhR2lc_9xx3ByPsyXiZNA9RpIVdCcZ7xEGITEiIQj/exec';
url += '?action=singleDaily';
url += '&day=' + getToday();

loadJSONP(url, parsePageToJson, this);
