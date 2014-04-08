
define( function (require) {
	'use strict';

	var toBase = require('./toBase');

	function toHex(num, pad) {
		return toBase(num, 16, pad);
	}

	return toHex;

});
