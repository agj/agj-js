
define(function (require) {
	'use strict';

	var defineModule = require('./define-module');

	function defineModules(obj, objectProperties) {
		for (var prop in objectProperties) {
			if (!objectProperties.hasOwnProperty(prop))
				continue;
			defineModule(obj, prop, objectProperties[prop]);
		}
		return obj;
	}

	return defineModules;

});
