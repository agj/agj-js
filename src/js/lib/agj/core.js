
/**
 * Created by agj (www.agj.cl).
 */

define([], function () {
	"use strict";

	var undef;

	function defineModule(obj, stringName, value) {
		var i, len, module, setValue, canDefineProperties;
		var modules = stringName.split(".");

		if (!obj)
			throw new TypeError("Invalid object passed.");

		canDefineProperties = "defineProperty" in Object && "defineProperties" in Object;

		for (i = 0, len = modules.length; i < len; i++) {
			module = modules[i];
			if (!(module in obj)) {
				setValue = value !== undef && i === len - 1;
				if (canDefineProperties) {
					Object.defineProperty(obj, module, {
						writable: false, enumerable: true, configurable: false,
						value: (setValue) ? value : {}
					} );
				} else {
					obj[module] = (setValue) ? value : {};
				}
			}
			obj = obj[module];
		}

		return value !== undef ? value : obj;
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

		trace: function () {
			if (agj.loggingIsEnabled && console && console.log)
				console.log.apply(console, Array.prototype.slice.call(arguments));
		},
		warn: function () {
			if (agj.loggingIsEnabled && console) {
				if (console.warn)
					console.warn.apply(console, Array.prototype.slice.call(arguments));
				else if (console.log)
					console.log.apply(console, Array.prototype.slice.call(arguments));
			}
		},

		mixin: function (objectTarget, objectProperties) {
			var canDefineProperties = "defineProperty" in Object && "defineProperties" in Object;

			for (var prop in objectProperties) {
				if (!(prop in objectTarget) || objectTarget[prop] === undef) {
					if (canDefineProperties) {
						Object.defineProperty(objectTarget, prop, {
							writable: true, enumerable: false, configurable: true,
							value: objectProperties[prop]
						});
					} else {
						objectTarget[prop] = objectProperties[prop];
					}
				} else {
					var target = objectTarget.constructor ? objectTarget.constructor : objectTarget;
					target = target.name ? target.name : typeof target;
					agj.warn("agj: Could not mixin '" + prop + "' to '" + target + "' because it is already defined.");
				}
			}

			return objectTarget;
		},

		destroy: function (arrayOfDestroyables) {
			for (var i = 0, len = arrayOfDestroyables.length; i < len; i++) {
				var current = arrayOfDestroyables[i];
				if (!current)
					continue;
				if (is.array(current))
					agj.destroy(current);
				else if (current.destroy)
					current.destroy();
				else if (current.removeAll)
					current.removeAll();
			}
		}
	});

	agj.loggingIsEnabled = true;


	// UTIL

	var util = defineModules(defineModule(agj, "util"), {
		tossCoin: function (probability) { // Boolean
			if (isNaN(probability))
				probability = 0.5;
			return Math.random() < probability;
		},
		toArray: function (object) { // Array
			return Array.prototype.slice.call(object, 0);
		}
	});


	// FUNCTION
	
	function autoCurry(arity, fn) {
		if (!fn) {
			fn = arity;
			arity = fn.length;
		}
		if (arity > 0) {
			return function inner() {
				if (arguments.length >= arity) {
					return fn.apply(null, arguments);
				} else {
					var args = util.toArray(arguments);
					return autoCurry(arity - args.length, function () {
						return fn.apply(null, args.concat( util.toArray(arguments) ));
					} );
				}
			};
		} else {
			return fn;
		}
	}
	
	var fn = defineModules(defineModule(agj, "fn"), {
		autoCurry: autoCurry,
		pipe: function pipe(fn) {
			var prev = this;
			function r() {
				if (typeof prev === "function")
					return fn(prev.apply(null, arguments));
				else
					return fn.apply(null, arguments);
			}
			r.pipe = r.to = pipe;
			return r;
		},
		// compose: function (fa, fb) { return function (v) { return fa(fb(v)); }; },
		// sequence: function (fa, fb) { return function (v) { return fb(fa(v)); }; },
		maybe: autoCurry(function (predicate, elseValue, fn) {
			predicate = predicate || is.set;
			return function () {
				var r = fn.apply(null, arguments);
				return predicate(r) ? r : elseValue;
			};
		}),
		flip: function (arity, fn) {
			if (!fn) {
				fn = arity;
				arity = fn.length;
			}
			return function () {
				var args = new Array(Math.max(0, arity - arguments.length));
				args = args.concat(util.toArray(arguments).reverse());
				fn.apply(null, args);
			};
		},

		fixArity: function (arity, fn) {
			if (arity === 0) return function () { return fn(); };
			if (arity === 1) return function (a) { return fn(a); };
			if (arity === 2) return function (a, b) { return fn(a, b); };
			if (arity === 3) return function (a, b, c) { return fn(a, b, c); };
			if (arity === 4) return function (a, b, c, d) { return fn(a, b, c, d); };
			else return function () { return fn.apply(null, util.toArray(arguments).slice(0, arity)); };
		}
	});


	// IS

	var equal          = autoCurry(function (a, b) { return b === a; });
	var greater        = autoCurry(function (a, b) { return b >   a; });
	var greaterOrEqual = autoCurry(function (a, b) { return b >=  a; });
	var less           = autoCurry(function (a, b) { return b <   a; });
	var lessOrEqual    = autoCurry(function (a, b) { return b <=  a; });

	var is = defineModules(defineModule(agj, "is"), {
		set: function (object) {
			return object !== undef && object !== null && (typeof object !== "number" || !isNaN(object));
		},
		undefined: function (object) {
			return object === undef;
		},

		boolean: function (object) {
			return typeof object === "boolean";
		},
		number: function (object) {
			return typeof object === "number";
		},
		string: function (object) {
			return typeof object === "string";
		},
		array: function (object) {
			return typeof object === "array";
		},
		fn: function (object) {
			return typeof object === "function";
		},
		instanceOf: autoCurry(function (type, object) { return object instanceof type; }),

		equal: equal,
		greater: greater,
		greaterOrEqual: greaterOrEqual,
		less: less,
		lessOrEqual: lessOrEqual,
		eq: equal,
		gt: greater,
		gte: greaterOrEqual,
		lt: less,
		lte: lessOrEqual
	});


	// TO
	
	defineModules(defineModule(agj, "to", {
		id: function (v) { return v; },

		value: function (v) { return function () { return v; }; },
		prop: function (name) { return function (v) { return v[name]; }; },
		call: function (methodName, args) {
			args = args || [];
			return function (v) { return v[methodName].apply(null, args); };
		}
	}));


	// MATH
	
	defineModules(defineModule(agj, "math"), {
		TAU: Math.PI * 2,

		randomInt: function (numberMaxValue) { // Number
			return Math.floor(Math.random() * numberMaxValue);
		},

		cartesianToRadians: function (x, y) { // Number
			return Math.atan2(y, x);
		}
	});


	return agj;
});

