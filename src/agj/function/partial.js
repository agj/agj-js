
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	function partial(fn, args) {
		return function () {
			return fn.apply(this, args.concat(toArray(arguments)));
		};
	}

	return partial;

});
