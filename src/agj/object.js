
define( function (require) {
	'use strict';

	return {
		every:           require('./object/every'),
		filter:          require('./object/filter'),
		forEach:         require('./object/forEach'),
		getKeyFromValue: require('./object/getKeyFromValue'),
		isEmpty:         require('./object/isEmpty'),
		map:             require('./object/map'),
		merge:           require('./object/merge'),
		mergeInto:       require('./object/mergeInto'),
		size:            require('./object/size'),
		some:            require('./object/some'),
		values:          require('./object/values'),
	};

});
