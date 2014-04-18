
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	function sequence() {
		var fns = toArray(arguments);
		return function () {
			return fns.reduce(process, fns.shift().apply(this, arguments));
		};
	}

	function process(r, fn) {
		return fn(r);
	}

	return sequence;

});
