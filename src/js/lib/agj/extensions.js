/**
 * Warning! This code modifies the prototypes of certain global objects.
 * Some are just polyfills, others are extensions.
 */

define(["../agj"], function (AGJ) {
	"use strict";

	var module = {};

	// OBJECT

	defineModules(defineModule(module, "object"), {
		getKeyFromValue: function (obj, value) { // String
			for (var key in obj) {
				if (!obj.hasOwnProperty(key))
					continue;
				if (obj[key] === value) {
					return key;
				}
			}
			return null;
		},

		isEmpty: function (obj) { // Boolean
			for (var key in obj) {
				if (!obj.hasOwnProperty(key))
					continue;
				return false;
			}
			return true;
		}
	});

	AGJ.mixin(Object, {
		keys: function (obj) { // Array
			var result = [];
			for (var key in obj) {
				if (!obj.hasOwnProperty(key))
					continue;
				result.push(key);
			}
			return result;
		}
	});


	// FUNCTION

	AGJ.mixin(Function.prototype, {
		bind: function (scope) { // Function
			if (!is.fn(this))
				throw new TypeError("What is trying to be bound is not callable.");
			var fn = this;
			var args = Array.prototype.slice.call(arguments, 1);
			return function () {
				var joinedArgs = args.concat(Array.prototype.slice.call(arguments));
				fn.apply(scope, joinedArgs);
			};
		}
	});


	// MATH

	defineModules(defineModule(module, "math"), {
		curve: function (numberValue, numberGentleness, numberPeak, numberValueSubtract) { // Number
			if (numberValueSubtract)
				numberValue = Math.max(numberValue - numberValueSubtract, 0);
			if (numberGentleness < 1)
				numberGentleness = 1;
			return numberPeak / ((numberValue / numberGentleness) + 1);
		}
	});


	// ARRAY.SORT

	defineModule(module, "array.sort.descending", function (a, b) {
		return b - a;
	});


	// DATE

	AGJ.mixin(Date, {
		now: function () {
			return +(new Date());
		}
	});


	return module;

});

