
define( function (require) {
	'use strict';

	var to = require('../to');
	var is = require('../is');
	var toArray = require('../utils/toArray');
	var sequence = require('../function/sequence');

	var get = to.prop;
	var call = to.call;

	function setElseDo(v, els, fn) {
		if (v) return fn(v);
		return els;
	}

	var splitAndTrim     = sequence(get(1), call('split', ['.']), call('map', [call('trim')]));
	var trim             = sequence(get(1), call('trim'));
	var trimAndLowerCase = sequence(trim, call('toLowerCase'));

	function anyEl(tag, attrs) {
		var classes = setElseDo(tag.match(/^[^\.]*\.(.+)$/),     [], splitAndTrim);
		var id      = setElseDo(tag.match(/#([^\.]+)(\.|$)/),    '', trim);
		tag         = setElseDo(tag.match(/^([^\.#]+)(\.|#|$)/), '', trimAndLowerCase);

		var contents = toArray(arguments, is.objectLiteral(attrs) ? 2 : 1);

		var element = document.createElement(tag);
		element.id = id;
		element.className = classes.join(' ');

		if (is.objectLiteral(attrs)) {
			Object.keys(attrs).forEach( function (name) {
				element.setAttribute(name, attrs[name]);
			});
		}

		contents.forEach( function (el) {
			if (is.string(el)) el = document.createTextNode(el);
			element.appendChild(el);
		});

		return element;
	}

	return anyEl;

});
