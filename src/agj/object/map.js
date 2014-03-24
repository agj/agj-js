
define( function (require) {
	'use strict';

	function map(obj, fn, thisArg) {
		var r = {};
		Object.keys(obj).forEach( function (key) {
			r[key] = fn.call(thisArg, obj[key], key, obj);
		});
		return r;
	}

	return map;
	
});
