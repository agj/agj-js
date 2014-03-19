
define( function (require) {
	'use strict';

	var isObjectLiteral = require('../is').objectLiteral;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');

	var object = require('../object');

	var natives = merge(
		nativeGrabber.fromPrototype(Object.prototype),
		nativeGrabber.fromGlobal(Object)
	);

	register({
		approve: isObjectLiteral,
		does: merge(object, natives)
	});

});
