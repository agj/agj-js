
define(function (require) {
	'use strict';

	var agj = require('./core');
	var toArray = agj.toArray;
	var to = agj.to;

	var modules = [];

	function take(value) {
		var mods = modules.filter(to.call('approve', [value])).map(to.prop('does'));
		var r = function () {
			return value;
		};
		mods.forEach( function (mod) {
			for (var prop in mod) {
				r[prop] = mod[prop];
			}
		} );
		r.value = value;
		return r;
	}

	function register(mod) {
		var does = {};
		for (var prop in mod.does) {
			does[prop] = fluentify(mod.does[prop]);
		}
		var fluentifiedMod = {
			approve: mod.approve,
			does: does
		};
		modules.push(fluentifiedMod);
	}

	function fluentify(fn) {
		return function fluentified() {
			return take(fn.apply( null, [this.value].concat(toArray(arguments)) ));
		};
	}

	take.register = register;

	return take;

});
