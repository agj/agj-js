
define( function (require) {
	'use strict';

	var isFunction = require('../is').fn;
	var register = require('../take').register;
	var nativeGrabber = require('../utils/native-grabber');
	var merge = require('../object/merge');
	var toArray = require('../utils/to-array');

	var fn = require('../function');

	var fixedFn = {
		autoCurry:  fn.promoteArg(1, fn.autoCurry),
		compose:    fn.compose,
		fixArity:   fn.promoteArg(1, fn.fixArity),
		flip:       fn.promoteArg(1, fn.flip),
		maybe:      fn.promoteArg(2, fn.maybe),
		pipe:       fn.pipe,
		promoteArg: fn.promoteArg(1, fn.fn.promoteArg),
		returnArg:  fn.promoteArg(1, fn.returnArg),
		returnThis: fn.returnThis,
		sequence:   fn.sequence,
		variadic:   fn.promoteArg(1, fn.variadic)
	};

	register({
		approve: isFunction,
		does: merge(fixedFn, nativeGrabber.fromPrototype(Function.prototype))
	});

});
