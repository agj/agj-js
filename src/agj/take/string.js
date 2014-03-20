
define( function (require) {
	'use strict';

	var isString = require('../is').string;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');

	var string = require('../string');

	var extensions = {
		len: function (str) {
			return str.length;
		}
	};

	register({
		approve: isString,
		does: merge( merge(string, extensions), nativeGrabber.fromPrototype(String.prototype))
	});

});
