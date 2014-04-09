
define( function (require) {
	'use strict';

	var warn = require('./warn');

	function mixin(objectTarget, dontWarn, objectProperties) {
		if (!objectProperties) {
			objectProperties = dontWarn;
			dontWarn = false;
		}
		for (var prop in objectProperties) {
			if (!(prop in objectTarget) || objectTarget[prop] === undef) {
				Object.defineProperty(objectTarget, prop, {
					writable: true, enumerable: false, configurable: true,
					value: objectProperties[prop]
				});
			} else if (!dontWarn) {
				var target = objectTarget.constructor || objectTarget;
				target = target.name || typeof target;
				warn('Could not mixin ' + prop + ' to ' + target + ' because it is already defined.');
			}
		}

		return objectTarget;
	}

	return mixin;

});
