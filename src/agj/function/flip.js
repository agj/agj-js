
define( function (require) {
	'use strict';

	var toArray = require('../core').toArray;
	var autoCurryArityFn = require('./auto-curry-arity-fn');

	var flip = autoCurryArityFn(function flip(arity, fn) {
		return function flipped() {
			var args = toArray(arguments, 0, arity);
			args.reverse();
			args = ( new Array(Math.max(0, arity - arguments.length)) ).concat(args);
			return fn.apply(this, args);
		};
	});

	return flip;

});
