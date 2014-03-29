/**
 * Decorates a function so that it is called only if the first supplied parameter
 * satisfies the predicate.
 */
define( function (require) {
	'use strict';

	var autoCurry = require('./auto-curry');
	var isFn      = require('../is').fn;
	var toArray   = require('../utils/to-array');

	var maybe = autoCurry( function (predicate, fn) {
		if (!isFn(predicate)) throw new TypeError("predicate is not a function.");
		return function maybed(v) {
			if (predicate(v)) return fn.apply(this, toArray(arguments));
			return void 0;
		};
	});

	// var maybe = autoCurry( function (predicate, elseValue, fn) {
	// 	predicate = predicate || is.set;
	// 	return function maybed() {
	// 		var r = fn.apply(this, arguments);
	// 		return predicate(r) ? r : elseValue;
	// 	};
	// });

	return maybe;

});
