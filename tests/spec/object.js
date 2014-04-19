
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');

	describe("Object utility", function () {
		var testing = require('reusable/object-functions');
		util.checkMethods(testing,
			function (method, o) {
				var result = object[method].apply(null, o.args);
				while (o) {
					var res = result;
					if (o.checker) res = o.checker(res);
					var exp = expect( res );
					if (o.loose) exp.toEqual( o.result );
					else         exp.toBe( o.result );
					o = o.next;
				}
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
