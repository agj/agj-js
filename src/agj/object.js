
define( function (require) {
	'use strict';

	return {
		every:           require('./object/every'),
		filter:          require('./object/filter'),
		forEach:         require('./object/for-each'),
		getKeyFromValue: require('./object/get-key-from-value'),
		isEmpty:         require('./object/is-empty'),
		map:             require('./object/map'),
		merge:           require('./object/merge'),
		mergeInto:       require('./object/merge-into'),
		size:            require('./object/size'),
		some:            require('./object/some'),
		values:          require('./object/values'),
	};

});
