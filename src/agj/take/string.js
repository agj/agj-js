
define( function (require) {
	'use strict';

	var isString = require('../is').string;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');

	var string = require('../string');

	register({
		approve: isString,
		does: merge(string, nativeGrabber.fromPrototype(String.prototype))
	});

});
