
define( function (require) {
	'use strict';

	return {
		autoCurry:   require('./function/auto-curry'),
		// autoCurryArityFn
		compose:     require('./function/compose'),
		fixArity:    require('./function/fix-arity'),
		flip:        require('./function/flip'),
		maybe:       require('./function/maybe'),
		pipe:        require('./function/pipe'),
		promoteArg:  require('./function/promote-arg'),
		returnArg:   require('./function/return-arg'),
		returnThis:  require('./function/return-this'),
		sequence:    require('./function/sequence'),
		variadic:    require('./function/variadic'),
	};

});
