
define( function (require) {
	'use strict';

	function every(obj, fn, thisArg) {
		for (var key in obj) {
			if (!fn.call(thisArg, obj[key], key, obj)) return false;
		}
		return true;
	}

	return every;
	
});
