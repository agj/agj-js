
define( function (require) {
	'use strict';

	var isArray = require('../is').array;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');

	var array = require('../array');

	register({
		approve: isArray,
		does: merge(array, nativeGrabber.fromPrototype(Array.prototype))
	});

});
