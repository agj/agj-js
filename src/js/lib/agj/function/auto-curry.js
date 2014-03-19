
define( function (require) {
	'use strict';

	var autoCurryArityFn = require('./auto-curry-arity-fn');
	var toArray = require('../utils/to-array');

	function autoCurryTo(arity, fn) {
		if (arity > 0) {
			return function autoCurried() {
				if (arguments.length >= arity) {
					return fn.apply(null, arguments);
				} else {
					var args = toArray(arguments);
					return autoCurryTo(arity - args.length, function autoCurriedRest() {
						return fn.apply(null, args.concat( toArray(arguments) ));
					} );
				}
			};
		} else {
			return fn;
		}
	}

	var autoCurry = autoCurryArityFn(autoCurryTo);

	return autoCurry;

});
