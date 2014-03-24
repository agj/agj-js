
define( function (require) {
	'use strict';

	var is = require('../is');
	var isArray = is.array;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');
	var returnArg = require('../function/return-arg');

	var array = require('../array');

	var fixableMethods = ['pop', 'push', 'reverse', 'shift', 'splice', 'unshift'];

	var natives = nativeGrabber.fromPrototype(Array.prototype);

	fixableMethods.forEach( function (key) {
		if (key in natives) natives[key] = returnArg(natives[key]);
	});

	var extensions = {
		len: function (arr) {
			return arr.length;
		},
		get: function (arr, index) {
			return arr[index];
		},
		set: function (arr, index, value) {
			arr[index] = value;
			return arr;
		}
	};

	register({
		approve: isArray,
		does: merge( merge(array, extensions), natives )
	});

});
