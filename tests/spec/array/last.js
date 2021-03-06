
define( function (require) {
	'use strict';
	
	var last = require('agj/array/last');
	
	describe("array/last", function () {

		var array = ['a', 'b', 'c', 'd', 'e'];

		it("returns the last element of an array", function () {
			expect( last(array) ).toBe( 'e' );
		});

		it("if an amount is specified, returns an array consisting of a certain number of elements from the end of an array", function () {
			expect( last(array, 0) ).toEqual( [] );
			expect( last(array, 1) ).toEqual( ['e'] );
			expect( last(array, 2) ).toEqual( ['d', 'e'] );
			expect( last(array, 100) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
			expect( last(0, array) ).toEqual( [] );
			expect( last(1, array) ).toEqual( ['e'] );
			expect( last(2, array) ).toEqual( ['d', 'e'] );
			expect( last(100, array) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
		});

		it("will return all values except a certain number from the start, if a negative amount is passed", function () {
			expect( last(array, -2) ).toEqual( ['c', 'd', 'e'] );
			expect( last(array, -100) ).toEqual( [] );
			expect( last(-2, array) ).toEqual( ['c', 'd', 'e'] );
			expect( last(-100, array) ).toEqual( [] );
		});

		it("if only an amount is passed, it gets partially applied", function () {
			expect( last(0)(array) ).toEqual( [] );
			expect( last(1)(array) ).toEqual( ['e'] );
			expect( last(2)(array) ).toEqual( ['d', 'e'] );
			expect( last(100)(array) ).toEqual( ['a', 'b', 'c', 'd', 'e'] );
			expect( last(-2)(array) ).toEqual( ['c', 'd', 'e'] );
			expect( last(-100)(array) ).toEqual( [] );
		});

	});

});
