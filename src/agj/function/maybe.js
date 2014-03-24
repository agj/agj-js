
define( function (require) {
	'use strict';

	var autoCurry = require('./auto-curry');

	var maybe = autoCurry( function (predicate, elseValue, fn) {
		predicate = predicate || is.set;
		return function maybed() {
			var r = fn.apply(this, arguments);
			return predicate(r) ? r : elseValue;
		};
	});

	return maybe;

});
