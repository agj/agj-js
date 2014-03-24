
define( function (require) {
	'use strict';
	
	var isFunction = require('../is').fn;

	function returnArg(argIndex, fn) {
		if (isFunction(argIndex)) {
			fn = argIndex;
			argIndex = 0;
		}
		return function () {
			fn.apply(this, arguments);
			return arguments[argIndex];
		};
	}

	return returnArg;

});
