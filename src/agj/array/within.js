
define( function (require) {
	'use strict';

	var overload = require('../function/overload');
	var not = require('../function/not');
	var is = require('../is');
	var to = require('../to');

	function doWithin(arr, item) {
		return arr.indexOf(item) !== -1;
	}

	var within = overload(
		[[is.set, not(is.equal(undefined)), overload.rest], doWithin],
		[[is.set], function (arr) {
			return function (item) {
				return doWithin(arr, item);
			};
		}]
	);

	return within;
	
});
