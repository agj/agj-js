
define( function (require) {
	'use strict';

	var isFn = require('../is').fn;

	var module = function () {};

	// This method of creating classes is a modification of John Resig's: http://ejohn.org/blog/simple-javascript-inheritance/
	// My changes make the _super() method appropriately go up the inheritance chain, and allow for easy statics declaration.
	var classInitializing = false;
	var classUsesSuperTest = /xyz/.test(function(){'xyz';}) ? /\b_super\b/ : null;

	module.extend = function (properties) {
		classInitializing = true;
		var prototype = new this();
		classInitializing = false;

		var _super = this.prototype;

		for (var name in properties) {
			if (name === 'statics') continue;
			if (isFn(properties[name]) && (!classUsesSuperTest || classUsesSuperTest.test(properties[name]))) {
				prototype[name] = superify(properties[name]);
			} else {
				prototype[name] = properties[name];
			}
		}

		function superify(fn) {
			return function () {
				var originalSuper = this._super;
				this._super = superFn;
				var result = fn.apply(this, arguments);
				this._super = originalSuper;
				return result;
			};
		}
		function superFn(name) {
			var scope = this;
			return function () {
				_super[name].apply(scope, arguments);
			};
		}

		function Class() {
			// All construction is actually done in the init method
			if (this instanceof Class) {
				if (!classInitializing && this.init)
					this.init.apply(this, arguments);
			} else {
				// Not instantiating.
				if (arguments.length === 1 && arguments[0] instanceof Class)
					return arguments[0];
				throw new Error("Invalid type casting.");
			}
		}

		if (properties.statics) {
			for (name in properties.statics) {
				if (properties.statics.hasOwnProperty(name))
					Class[name] = properties.statics[name];
			}
		}

		properties = null;

		Class.prototype = prototype;
		Class.prototype.constructor = Class;

		Class.extend = module.extend;
		return Class;
	};

	return module;

});
