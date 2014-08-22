
define( function (require) {
	'use strict';
	
	var first = require('agj/array/first');
	
	describe("array/first", function () {

		var array = ['a', 'b', 'c', 'd', 'e'];

		it("returns the first element of an array", function () {
			expect( first(array) ).toBe( 'a' );
		});

		it("if an amount is specified, returns an array consisting of a certain number of elements from the start of an array", function () {
			expect( first(array, 0) ).toEqual( [] );
			expect( first(array, 1) ).toEqual( ['a'] );
			expect( first(array, 2) ).toEqual( ['a', 'b'] );
			expect( first(array, 100) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
			expect( first(0, array) ).toEqual( [] );
			expect( first(1, array) ).toEqual( ['a'] );
			expect( first(2, array) ).toEqual( ['a', 'b'] );
			expect( first(100, array) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
		});

		it("if only an amount is passed, it is auto-curried", function () {
			expect( first(0)(array) ).toEqual( [] );
			expect( first(1)(array) ).toEqual( ['a'] );
			expect( first(2)(array) ).toEqual( ['a', 'b'] );
			expect( first(100)(array) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
		});

	});

});
