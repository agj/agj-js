
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

	var processTag       = get(1);
	var processID        = get(1);
	var processClasses   = sequence(call('map', [call('substr', [1])] ));

	function anyEl(tag, attrs) {
		var id      = setElseDo(tag.match(/#([^\.\s]+)/),  '', processID);
		var classes = setElseDo(tag.match(/\.[^\.\s#]+/g), [], processClasses);
		tag         = setElseDo(tag.match(/^([^\.\s#]+)/), '', processTag);

		var contents = toArray(arguments, is.objectLiteral(attrs) ? 2 : 1);

		var element = document.createElement(tag);
		if (id) element.id = id;
		if (classes.length) element.className = classes.join(' ');

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
