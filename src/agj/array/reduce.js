
define( function (require) {
	'use strict';

	var overload = require('../function/overload');
	var is = require('../is');
	var first = require('./first');
	var last = require('./last');
	var tail = last(-1);

	function doReduce(array, fn, initial) {
		if (initial === undefined) {
			initial = first(array);
			array = tail(array);
		}

		var result = initial;
		var i = -1;
		var len = array.length;
		while (++i < len) {
			result = fn(result, array[i]);
		}
		return result;
	}

	var reduce = overload(
		[[is.fn], function (fn) {
			return function (array, initial) {
				return doReduce(array, fn, initial);
			};
		}],
		[[is.set, is.fn, overload.REST], doReduce],
		[[is.fn, is.set, overload.REST], function (fn, array, initial) {
			return doReduce(array, fn, initial);
		}],
		[[is.set], function (array) {
			return function (fn, initial) {
				return doReduce(array, fn, initial);
			};
		}]
	);

	return reduce;
	
});
