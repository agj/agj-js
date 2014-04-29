
define( function () {
	'use strict';

	function autoCurryArityFn(target) {
		return function autoCurriedArityFn(arity, fn) {
			if (typeof arity === 'function') {
				fn = arity;
				return target(fn.length, fn);
			} else if (fn) {
				return target(arity, fn);
			}
			return function (fn) { return target(arity, fn); };
		};
	}

	return autoCurryArityFn;

});
