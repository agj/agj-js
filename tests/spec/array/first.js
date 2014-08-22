
define( function (require) {
	'use strict';
	
	var first = require('agj/array/first');
	
	describe("array/first", function () {

		var array = ['a', 'b', 'c', 'd', 'e'];

		it("returns the first element of an array", function () {
			expect( first(array) ).toBe( 'a' );
		});

		it("if amount is specified, returns an array consisting of a certain number of elements from the start of an array", function () {
			expect( first(array, 0) ).toEqual( [] );
			expect( first(array, 1) ).toEqual( ['a'] );
			expect( first(array, 2) ).toEqual( ['a', 'b'] );
			expect( first(array, 100) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
		});

	});

});
