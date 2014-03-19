
define( function (require) {
	'use strict';

	var isNumber = require('../is').number;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');

	var number = require('../number');

	register({
		approve: isNumber,
		does: merge(number, nativeGrabber.fromPrototype(Number.prototype))
	});

});
