
define( function (require) {
	'use strict';

	return {
		contains:   require('./string/contains'),
		endsWith:   require('./string/endsWith'),
		first:      require('./string/first'),
		last:       require('./string/last'),
		padLeft:    require('./string/padLeft'),
		padRight:   require('./string/padRight'),
		startsWith: require('./string/startsWith'),
	};

});
