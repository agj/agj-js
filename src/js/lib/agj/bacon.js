
define(function(require) {
	'use strict';

	var $ = require('jquery');
	var Bacon = require('Bacon');
	var agj = require('./core');
	var is = agj.is;
	var to = agj.to;
	var trace = agj.trace;
	var events = require('./utils/event-constants');


	var module = agj.defineModules({}, {
		keyIsPressed: function (key) {
			return Bacon.fromEventTarget($(window), events.key.down).map('.which').filter(is.equal(key)).map(to.value(true))
				.merge(Bacon.fromEventTarget($(window), events.key.up).map('.which').filter(is.equal(key)).map(to.value(false)))
				.toProperty(false);
		}
	});

	return module;

});
