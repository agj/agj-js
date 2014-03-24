
define(function (require) {
	'use strict';

	var agj = require('./core');
	var toArray = agj.toArray;
	var Dictionary = require('./datastructures/dictionary');
	var Class = require('./classes/class-super');

	var trace = agj.trace;
	var to = agj.to;

	var moduleCache = new Dictionary();

	function extend(obj) { throw new Error("No modules registered. Use extend.register(module) and use the returned extend function."); }
	extend.register = register;

	function register(module) {
		var scope = new Scope();
		scope.addModule(module);

		function extend(obj, ignoreIfCantExtend) {
			var mod = scope.getMatchingModule(obj);
			if (!mod) {
				if (ignoreIfCantExtend !== true) throw new TypeError("Passed object is not compatible with any registered modules.");
				return obj;
			}
			var result = Object.create(mod.proto);
			result.value = obj;
			return result;
		}
		extend.register = function reg(m) {
			if (m.register) return m.register(scope);
			if (m instanceof Scope) scope.incorporate(m);
			else scope.addModule(module);
			return extend;
		};
		scope.extend = extend;
		return extend;
	}


	var Scope = Class.extend({
		init: function Scope() {
			this.modules = [];
		},
		addModule: function (module) {
			this.modules.push(this.processModule(module));
		},
		incorporate: function (scope) {
			this.modules = this.modules.concat(scope.modules);
		},
		getMatchingModule: function (obj) {
			return this.modules.filter( function (mod) { return mod.approve(obj); })[0];
		},
		processModule: function (module) {
			var result = moduleCache.get(module);
			if (result) return result;

			result = { approve: module.approve };
			var p = Object.getPrototypeOf(module.proto);
			var proto = Object.create(p);
			Object.keys(module.proto).forEach( function (name) {
				proto[name] = this.processMethod(module.proto[name]);
			}.bind(this));
			proto.toString = function () {
				return p.toString.apply(this.value, toArray(arguments));
			};
			proto.valueOf = function () {
				return p.valueOf.apply(this.value, toArray(arguments));
			};
			result.proto = proto;

			moduleCache.set(module, result);
			return result;
		},
		processMethod: function (fn) {
			var scope = this;
			return function () {
				return scope.extend(fn.apply(this.value, toArray(arguments)), true);
			};
		}
	});

	// function proxify(obj) {
	// 	if (!Proxy) return obj;
	// 	return new Proxy(obj, {
	// 		get: function (target, prop, receiver) {
	// 			return prop in target ? target[prop] : target.value[prop];
	// 		},
	// 		set: function (target, prop, value) {
	// 			target.value[prop] = value;
	// 		}
	// 	});
	// }

	return extend;

});
