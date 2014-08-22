
define( function (require) {
	'use strict';

	var overload = require('../function/overload');
	var is = require('../is');

	function doToBase(num, base, pad) {
		var result = num.toString(base);
		if (!isNaN(pad)) {
			while (result.length < pad) {
				result = '0' + result;
			}
		}
		return result;
	}

	var toBase = overload(
		[[is.number], function (base) {
			return function (num, pad) {
				return doToBase(num, base, pad);
			};
		}],
		doToBase
	);

	return toBase;

});