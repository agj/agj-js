
define( function (require) {
	'use strict';

	function forEach(obj, fn, thisArg) {
		Object.keys(obj).forEach( function (key) {
			fn.call(thisArg, obj[key], key, obj);
		});
		return obj;
	}

	return forEach;
	
});
