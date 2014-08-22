
define( function (require) {
	'use strict';
	
	var last = require('agj/array/last');
	
	describe("array/last", function () {

		var array = ['a', 'b', 'c', 'd', 'e'];

		it("returns the last element of an array", function () {
			expect( last(array) ).toBe( 'e' );
		});

		it("if amount is specified, returns an array consisting of a certain number of elements from the end of an array", function () {
			expect( last(array, 0) ).toEqual( [] );
			expect( last(array, 1) ).toEqual( ['e'] );
			expect( last(array, 2) ).toEqual( ['d', 'e'] );
			expect( last(array, 100) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
		});

	});

});
