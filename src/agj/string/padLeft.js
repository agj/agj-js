
define( function (require) {
	'use strict';

	var isString = require('../is').string;

	function padLeft(str, length, char) {
		if (!isString(char) || char.length !== 1) char = ' ';
		return new Array(Math.max(0, length - str.length + 1)).join(char) + str;
	}

	return padLeft;

});
