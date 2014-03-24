
define( function (require) {
	'use strict';

	var isFunction = require('../is').fn;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');
	var toArray = require('../utils/to-array');

	var fn = require('../function');

	function promoteArg(argIndex, fn) {
		return function () {
			var args = toArray(arguments, 1);
			var promotedArg = arguments[0];
			args.splice(argIndex, 0, promotedArg);
			return fn.apply(this, args);
		};
	}

	var fixedFn = {
		autoCurry: promoteArg(1, fn.autoCurry),
		compose: fn.compose,
		fixArity: promoteArg(1, fn.fixArity),
		flip: promoteArg(1, fn.flip),
		maybe: promoteArg(2, fn.maybe),
		pipe: fn.pipe,
		returnArg: promoteArg(1, fn.returnArg),
		returnThis: fn.returnThis,
		sequence: fn.sequence,
		variadic: promoteArg(1, fn.variadic)
	};

	register({
		approve: isFunction,
		does: merge(fixedFn, nativeGrabber.fromPrototype(Function.prototype))
	});

});
