
define(['rsvp', 'agj/utils/toArray'], function (rsvp, toArray) {
	'use strict';

	function requireSequentially() {
		return toArray(arguments).reduce( function (promise, spec) {
			return promise.then( function () {
				return promiseRequire([spec]);
			});
		}, rsvp.resolve());
	}

	function promiseRequire(deps) {
		var deferred = rsvp.defer();
		require(deps, function () { deferred.resolve(true); });
		return deferred.promise;
	}

	return {
		promiseRequire: promiseRequire,
		requireSequentially: requireSequentially
	};

});
