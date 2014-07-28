
define( function (require) {
	'use strict';
	
	var values = require('agj/object/values');
	
	describe("object/values", function () {

		it("returns an array of the values of the object's own properties", function () {
			expect( values({ a: 1, b: 2, c: 3 }) ).toEqual( [1, 2, 3] );
			expect( values({}) ).toEqual( [] );
		});

	});

});
