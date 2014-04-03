
/**
 * Created by agj (www.agj.cl).
 */

define(function (require) {
	'use strict';

	var isArray = require('./is/array');
	var toArray = require('./utils/to-array');

	var undef;

	function defineModule(target, stringName, value) {
		if (!target) throw new TypeError('Invalid object passed.');

		var modules = stringName.split('.');
		var len = modules.length;
		modules.forEach( function (modName, i) {
			if (!(modName in target)) {
				var curValue = (value !== undef && i === len - 1) ? value : {};
				Object.defineProperty(target, modName, {
					writable: false, enumerable: true, configurable: false,
					value: curValue
				});
			}
			target = target[modName];
		});

		return value || target;
	}

	function defineModules(obj, objectProperties) {
		for (var prop in objectProperties) {
			if (!objectProperties.hasOwnProperty(prop))
				continue;
			defineModule(obj, prop, objectProperties[prop]);
		}
		return obj;
	}


	// GENERAL

	var agj = defineModules({}, {
		defineModule: defineModule,
		defineModules: defineModules,

		undefined: undef,

		toArray: toArray,

		trace: function () {
			if (agj.loggingIsEnabled && console && console.log)
				console.log.apply(console, toArray(arguments));
		},
		warn: function () {
			if (agj.loggingIsEnabled && console) {
				if (console.warn)
					console.warn.apply(console, toArray(arguments));
				else if (console.log)
					console.log.apply(console, toArray(arguments));
			}
		},

		mixin: function (objectTarget, dontWarn, objectProperties) {
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
					agj.warn('agj: Could not mixin ' + prop + ' to ' + target + ' because it is already defined.');
				}
			}

			return objectTarget;
		},

		destroy: function (arrayOfDestroyables) {
			for (var i = 0, len = arrayOfDestroyables.length; i < len; i++) {
				var current = arrayOfDestroyables[i];
				if (!current)
					continue;
				if (isArray(current))
					agj.destroy(current);
				else if (current.destroy)
					current.destroy();
				else if (current.removeAll)
					current.removeAll();
			}
		}
	});

	agj.loggingIsEnabled = true;


	// TO
	
	defineModules(defineModule(agj, 'to', {
		id: function (v) { return v; },

		value: function (v) { return function () { return v; }; },
		prop: function (name) { return function (v) { return v[name]; }; },
		call: function (methodName, args) {
			args = args || [];
			return function (v) { return v[methodName].apply(v, args); };
		}
	}));


	return agj;

});
