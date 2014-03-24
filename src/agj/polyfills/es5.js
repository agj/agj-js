/**
 * DEPRECATED. There are good libraries for this stuff.
 */

define( function (require) {
	'use strict';

	var agj = require('./core');
	var is = agj.is;
	var mixin = agj.mixin;

	mixin(Object, true, {
		keys: function (obj) {
			var result = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) result.push(key);
			}
			return result;
		},
		getPrototypeOf: function (obj) {
			return obj['__proto__'];
		}
	});

	mixin(Function.prototype, true, {
		bind: function (scope) {
			if (!is.fn(this))
				throw new TypeError('What is trying to be bound is not callable.');
			var fn = this;
			var args = Array.prototype.slice.call(arguments, 1);
			return function () {
				var joinedArgs = args.concat(toArray(arguments));
				fn.apply(scope, joinedArgs);
			};
		}
	});

	mixin(Array.prototype, true, {
		forEach: function (fun) {
			if (!this || !is.fn(fun)) throw new TypeError();
			var len = this.length >>> 0;
			var thisArg = arguments.length >= 2 ? arguments[1] : undef;
			for (var i = 0; i < len; i++) {
				if (i in this) fun.call(thisArg, this[i], i, this);
			}
		}
	});

	mixin(Date, true, {
		now: function () {
			return +(new Date());
		}
	});

});
