
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var string = require('agj/string');

	describe("String utility", function () {
		var pass = util.pass();

		util.checkMethods(require('reusable/string-functions'),
			function (method, o) {
				var exp = expect( string[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);
	});

});
