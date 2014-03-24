
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var constructProto = require('./utils/utils').constructProto;

	var proto = constructProto(
		String.prototype,
		null,
		require('../string'),
		{
			len: function () {
				return this.length;
			}
		}
	);

	return extend.register({
		approve: is.string,
		proto: proto
	});
	
});
