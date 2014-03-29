
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');

	describe("Object utility", function () {
		var testing = require('reusable/object-functions');
		util.checkMethods(testing,
			function (method, o) {
				var exp = expect( object[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);

		it("forEach", function () {
			var r = '';
			object.forEach({ one: 1, two: '2', three: 'three' }, function (v) {
				r += v;
			});
			expect( r ).toBe( '12three' );
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(object) ).toBe( size(testing) + 1 );
		});
	});

});
