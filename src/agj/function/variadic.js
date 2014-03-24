
define( function (require) {
	'use strict';

	var autoCurryArityFn = require('./auto-curry-arity-fn');
	var toArray = require('../utils/to-array');

	var variadic = autoCurryArityFn( function (arity, fn) {
		return function variadicized() {
			var args = toArray(arguments, 0, arity - 1);
			args[arity - 1] = toArray(arguments, arity - 1);
			return fn.apply(this, args);
		};
	});

	return variadic;

});
