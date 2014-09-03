
define( function (require) {
	'use strict';

	var overload = require('../function/overload');
	var not = require('../function/not');
	var is = require('../is');
	var to = require('../to');

	function doHas(item, arr) {
		return arr.indexOf(item) !== -1;
	}

	var has = overload(
		[[not(is.equal(undefined)), is.set, overload.rest], doHas],
		[[not(is.equal(undefined))], function (item) {
			return function (arr) {
				return doHas(item, arr);
			};
		}]
	);

	return has;
	
});
