
define( function (require) {
	'use strict';

	function filter(obj, fn, thisArg) {
		var r = {};
		Object.keys(obj).forEach( function (key) {
			if (fn.call(thisArg, obj[key], key, obj)) r[key] = obj[key];
		});
		return r;
	}

	return filter;
	
});
