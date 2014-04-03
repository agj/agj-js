/**
 * Method for creating 'classes', based on John Resig's.
 * Expanded to support '_super' method calls that properly go up the inheritance chain, and statics.
 */
define( function (require) {
	'use strict';

	var is = require('../is');
	var to = require('../to');
	var not = require('../function/not');

	var module = function () {};

	var classInitializing = false;
	var classUsesSuperTest = /xyz/.test(function(){ 'xyz'; }) ? /\b_super\b/ : null;

	module.extend = function (properties) {
		classInitializing = true;
		var prototype = new this();
		classInitializing = false;

		var _super = this.prototype;

		properties.init = properties.init || function() {};
		properties.cast = properties.cast || function(v) {
			if (v instanceof Class) return v;
			throw new TypeError("Invalid type casting.");
		};

		Object.keys(properties).filter(not(is.eq('statics'))).forEach( function (name) {
			var method = properties[name];
			if (is.fn(method) && (!classUsesSuperTest || classUsesSuperTest.test(method))) {
				prototype[name] = superify(method, superFn);
			} else {
				prototype[name] = method;
			}
		});

		function superFn(name) {
			var scope = this;
			return function () {
				_super[name].apply(scope, arguments);
			};
		}

		function Class() {
			if (this instanceof Class) {
				// Instance construction.
				if (!classInitializing)
					this.init.apply(this, arguments);
			} else {
				// Type casting.
				if (arguments.length === 1)
					return this.cast(arguments[0]);
				throw new Error("Invalid type casting.");
			}
		}

		if (properties.statics) Object.keys(properties.statics).forEach( function (name) {
			Class[name] = properties.statics[name];
		});

		properties = null;

		Class.prototype = prototype;
		Class.prototype.constructor = Class;

		Class.extend = module.extend;
		return Class;
	};

	function superify(fn, superFn) {
		return function () {
			var originalSuper = this._super;
			this._super = superFn;
			var result = fn.apply(this, arguments);
			this._super = originalSuper;
			return result;
		};
	}

	return module;

});
