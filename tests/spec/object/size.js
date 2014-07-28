
define( function (require) {
	'use strict';
	
	var size = require('agj/object/size');
	
	describe("object/size", function () {

		it("returns the number of own properties of the object", function () {
			var proto = { keyInProto: 'a' };

			expect( size({ a: 1, b: 2, c: 3 }) ).toBe( 3 );
			expect( size({}) ).toBe( 0 );
			expect( size(Object.create(proto)) ).toBe( 0 );
		});

	});

});
