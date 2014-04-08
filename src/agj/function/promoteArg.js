/**
 * Decorates a function so that it has the argument at argIndex put in front, so:
 *
 * promoteArg(2, function (arg0, arg1, arg2) { });
 *
 * returns the equivalent to:
 *
 * function (arg2, arg0, arg1) { }
 */
define( function (require) {
	'use strict';

	var toArray = require('../utils/to-array');

	function promoteArg(argIndex, fn) {
		return function argPromoted() {
			var args = toArray(arguments, 1);
			var promotedArg = arguments[0];
			if (args.length < argIndex + 1) args.length = argIndex + 1;
			args.splice(argIndex, 0, promotedArg);
			return fn.apply(this, args);
		};
	}

	return promoteArg;

});
