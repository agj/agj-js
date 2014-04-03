
define( function (require) {
	'use strict';

	var to = require('../to');
	var is = require('../is');
	var toArray = require('../utils/to-array');

	function iff(v, els, fn) {
		if (is.set(v)) return fn(v);
		return els;
	}

	function anyEl(tag, attrs) {
		var classes = iff(tag.match(/^[^\.]*\.(.+)$/), [], function (m) { return m[1].split('.').map(to.call('trim')); });
		var id = iff(tag.match(/#([^\.]+)(\.|$)/), '', function (m) { return m[1].trim(); });
		tag = iff(tag.match(/^([^\.#]+)(\.|#|$)/), '', function (m) { return m[1].trim().toLowerCase(); });

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
