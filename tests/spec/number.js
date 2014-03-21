
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var number = require('agj/number');

	describe("Number utility", function () {
		util.checkMethods(require('reusable/number-functions'),
			function (method, o) {
				var exp = expect( number[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);
	});

});
