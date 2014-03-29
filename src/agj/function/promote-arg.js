
define( function (require) {
	'use strict';

	var toArray = require('../utils/to-array');

	function promoteArg(argIndex, fn) {
		return function argPromoted() {
			var args = toArray(arguments, 1);
			var promotedArg = arguments[0];
			args.splice(argIndex, 0, promotedArg);
			return fn.apply(this, args);
		};
	}

	return promoteArg;

});
