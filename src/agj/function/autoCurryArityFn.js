
define( function (require) {
	'use strict';

	var overload = require('./overload');

	function isFn(obj) {
		return typeof obj === 'function';
	}
	function isNumber(obj) {
		return typeof obj === 'number';
	}

	function autoCurryArityFn(target) {
		return overload(
			[[isFn], function (fn) {
				return target(fn.length, fn);
			}],
			[[isNumber, isFn, overload.REST], target],
			[[isFn, isNumber, overload.REST], function (fn, arity) {
				return target(arity, fn);
			}],
			[[isNumber], function (arity) {
				return function (fn) {
					return target(arity, fn);
				};
			}],
			target
		);

		// return function autoCurriedArityFn(arity, fn) {
		// 	if (typeof arity === 'function') {
		// 		fn = arity;
		// 		return target(fn.length, fn);
		// 	} else if (fn) {
		// 		return target(arity, fn);
		// 	}
		// 	return function (fn) { return target(arity, fn); };
		// };
	}

	return autoCurryArityFn;

});
