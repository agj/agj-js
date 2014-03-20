
requirejs.config({
	baseUrl: './spec/',
	paths: {
		'lib': '../lib',
		'agj': '../../src/agj',
		'rsvp': '../lib/rsvp'
	}
});

require(['rsvp'], function (rsvp) {
	'use strict';

	requireSequentially(
		'array',
		'take'

	).then(window.onload);


	/////
	
	function requireSequentially() {
		var seq = [].slice.call(arguments);
		return seq.reduce( function (promise, spec) {
			return promise.then( function () {
				return req([spec]);
			});
		}, rsvp.resolve());
	}
	
	function req(deps) {
		var deferred = rsvp.defer();
		require(deps, function () { deferred.resolve(true); });
		return deferred.promise;
	}

});

