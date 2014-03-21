
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');

	describe("Object utility", function () {
		var pass = util.pass( function () {
			return { args: [{ one: 1, two: '2', three: 'three' }] };
		});
		var passOnly = util.pass();
		var get = function (result) { return pass().get(result); };

		util.checkMethods(require('reusable/object-functions'),
			function (method, o) {
				var exp = expect( object[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);
	});

});
