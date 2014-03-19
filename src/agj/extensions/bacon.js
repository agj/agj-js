
define(function(require) {
	'use strict';

	var $ = require('jquery');
	var bacon = require('bacon');
	var agj = require('../core');
	var is = require('../is');
	var to = agj.to;
	var trace = agj.trace;
	var events = require('../utils/event-constants');

	var module = agj.defineModules({}, {
		keyIsPressed: function (key) {
			return bacon.fromEventTarget($(window), events.key.down).map('.which').filter(is.equal(key)).map(to.value(true))
				.merge(bacon.fromEventTarget($(window), events.key.up).map('.which').filter(is.equal(key)).map(to.value(false)))
				.toProperty(false);
		}
	});

	return module;

});
