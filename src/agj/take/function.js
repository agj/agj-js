
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
			var args = toArray(arguments);
			var fnArg = args.shift();
			args.splice(argIndex, 0, fnArg);
			fn.apply(null, args);
		};
	}

	var fixedFn = {
		autoCurry: promoteArg(1, fn.autoCurry),
		pipe: fn.pipe,
		flip: promoteArg(1, fn.flip),
		compose: fn.compose,
		sequence: fn.sequence,
		maybe: promoteArg(2, fn.maybe),
		fixArity: promoteArg(1, fn.fixArity),
		variadic: promoteArg(1, fn.variadic)
	};

	register({
		approve: isFunction,
		does: merge(fixedFn, nativeGrabber.fromPrototype(Function.prototype))
	});

});
