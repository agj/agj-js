
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var extendUtils = require('./utils/utils');
	var fn = require('../function');

	var fixedFn = {
		autoCurry:  fn.promoteArg(1, fn.autoCurry),
		compose:    fn.compose,
		fixArity:   fn.promoteArg(1, fn.fixArity),
		flip:       fn.promoteArg(1, fn.flip),
		maybe:      fn.promoteArg(1, fn.maybe),
		memoize:    fn.memoize,
		not:        fn.not,
		pipe:       fn.pipe,
		promoteArg: fn.promoteArg(1, fn.promoteArg),
		returnArg:  fn.promoteArg(1, fn.returnArg),
		returnThis: fn.returnThis,
		sequence:   fn.sequence,
		variadic:   fn.promoteArg(1, fn.variadic)
	};

	var proto = extendUtils.constructProto(Function.prototype);

	extendUtils.addUtils(proto, fixedFn);

	extendUtils.addGetters(proto, ['length']);

	return extend.register({
		approve: is.fn,
		proto: proto
	});
	
});
