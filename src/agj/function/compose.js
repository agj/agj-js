
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	function compose() {
		var fns = toArray(arguments);
		return function () {
			return fns.reduceRight(process, fns.pop().apply(this, arguments));
		};
	}

	function process(r, fn) {
		return fn(r);
	}

	return compose;

});
