var cheerio = require('cheerio')
  , request = require('request');

console.log('1');

request(
	'http://www.oricon.co.jp/rank/js/d/2016-02-26/'
	, function(error, response, body) {
		console.log('2');
		if (!error && response.statusCode == 200) {
			console.log(body);
		}
	}
)