
define( function (require) {
	'use strict';

	var agj = require('./core');
	var toArray = agj.toArray;

	var autoCurry = require('./function/auto-curry');
	var autoCurryArityFn = require('./function/auto-curry-arity-fn');
	var pipe = require('./function/pipe');
	var flip = require('./function/flip');
	var compose = require('./function/compose');
	var sequence = require('./function/sequence');


	var maybe = autoCurry( function (predicate, elseValue, fn) {
		predicate = predicate || is.set;
		return function maybed() {
			var r = fn.apply(this, arguments);
			return predicate(r) ? r : elseValue;
		};
	});

	var fixArity = autoCurry( function (arity, fn) {
		if (arity === 0) return function arity0() { return fn.call(this); };
		if (arity === 1) return function arity1(a) { return fn.call(this, a); };
		if (arity === 2) return function arity2(a, b) { return fn.call(this, a, b); };
		if (arity === 3) return function arity3(a, b, c) { return fn.call(this, a, b, c); };
		if (arity === 4) return function arity4(a, b, c, d) { return fn.call(this, a, b, c, d); };
		else return function arityX() { return fn.apply(this, toArray(arguments).slice(0, arity)); };
	});

	var variadic = autoCurryArityFn( function (arity, fn) {
		return function variadicized() {
			var args = toArray(arguments);
			var rest = args.slice(arity - 1) || [];
			args = args.slice(0, arity - 1);
			args[arity - 1] = rest;
			return fn.apply(this, args);
		};
	});

	return {
		autoCurry: autoCurry,
		// autoCurryArityFn: autoCurryArityFn,
		pipe: pipe,
		flip: flip,
		compose: compose,
		sequence: sequence,

		maybe: maybe,
		fixArity: fixArity,
		variadic: variadic
	};

});
