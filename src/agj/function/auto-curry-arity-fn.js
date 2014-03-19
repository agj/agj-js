
define( function () {
	'use strict';

	function autoCurryArityFn(target) {
		return function (arity, fn) {
			if (typeof arity === 'function') {
				fn = arity;
				return target(fn.length, fn);
			} else if (!fn) {
				return function (fn) { return target(arity, fn); };
			}
			return target(arity, fn);
		};
	}

	return autoCurryArityFn;

});
