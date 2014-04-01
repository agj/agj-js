
define( function (require) {
	'use strict';

	return {
		autoCurry:       require('./function/auto-curry'),
		// autoCurryArityFn
		compose:         require('./function/compose'),
		fixArity:        require('./function/fix-arity'),
		flip:            require('./function/flip'),
		loop:            require('./function/loop'),
		maybe:           require('./function/maybe'),
		memoize:         require('./function/memoize'),
		not:             require('./function/not'),
		pipe:            require('./function/pipe'),
		promoteArg:      require('./function/promote-arg'),
		promoteArgSolid: require('./function/promote-arg-solid'),
		returnArg:       require('./function/return-arg'),
		returnThis:      require('./function/return-this'),
		sequence:        require('./function/sequence'),
		variadic:        require('./function/variadic'),
	};

});
