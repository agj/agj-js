
define( function (require) {
	'use strict';

	function some(obj, fn, thisArg) {
		for (var key in obj) {
			if (fn.call(thisArg, obj[key], key, obj)) return true;
		}
		return false;
	}

	return some;
	
});
