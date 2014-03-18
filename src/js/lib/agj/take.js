

define(function () {
	'use strict';

	var agj = require('agj/core');
	var toArray = agj.util.toArray;

	var trace = agj.trace;
	var to = agj.to;

	var modules = [];

	function fluentify(fn) {
		return function fluentified() {
			return take(fn.apply( null, [this.value].concat(toArray(arguments)) ));
		};
	}

	function take(value) {
		var mods = modules.filter(to.call('applies', [value])).map(to.prop('does'));
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

	var module = {
		take: take,
		register: function (mod) {
			var does = {};
			for (var prop in mod.does) {
				does[prop] = fluentify(mod.does[prop]);
			}
			var fluentifiedMod = {
				applies: mod.applies,
				does: does
			};
			modules.push(fluentifiedMod);
		}
	};

	return module;

});
