
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var constructProto = require('./utils/utils').constructProto;
	var fn = require('../function');

	var fixedFn = {
		autoCurry:  fn.promoteArg(1, fn.autoCurry),
		compose:    fn.compose,
		fixArity:   fn.promoteArg(1, fn.fixArity),
		flip:       fn.promoteArg(1, fn.flip),
		maybe:      fn.promoteArg(1, fn.maybe),
		pipe:       fn.pipe,
		promoteArg: fn.promoteArg(1, fn.promoteArg),
		returnArg:  fn.promoteArg(1, fn.returnArg),
		returnThis: fn.returnThis,
		sequence:   fn.sequence,
		variadic:   fn.promoteArg(1, fn.variadic)
	};

	var proto = constructProto(
		Function.prototype,
		null,
		fixedFn,
		{
			len: function () {
				return this.length;
			}
		}
	);

	return extend.register({
		approve: is.fn,
		proto: proto
	});
	
});
