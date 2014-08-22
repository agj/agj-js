
define( function (require) {
	'use strict';
	
	var findIndex = require('agj/array/findIndex');
	
	describe("array/findIndex", function () {

		it("calls a predicate function on each item in an array, and returns the index of the item for which the predicate returns a truthy value", function () {
			var array = [100, 10, 1];
			var called = 0;

			function predicate(item, index, arr) {
				called++;
				expect( [100, 10, 1] ).toContain( item );
				expect( [0, 1, 2] ).toContain( index );
				expect( arr ).toBe( array );

				return item < 5;
			}

			expect( findIndex(array, predicate) ).toBe( 2 );
			expect( called ).toBe( 3 );

			called = 0;
			expect( findIndex(predicate, array) ).toBe( 2 );
			expect( called ).toBe( 3 );
		});

		it("gets auto curried if only one parameter is passed", function () {
			var array = [100, 10, 1];

			function predicate(item, index, arr) {
				return item < 5;
			}
			
			expect( findIndex(predicate)(array) ).toBe( 2 );
			expect( findIndex(array)(predicate) ).toBe( 2 );
		});

		it("accepts a third 'this' argument, for the predicate, for compatibility with ES6", function () {
			var array = [100, 10, 1];
			var thisObj = {};

			function predicate(item, index, arr) {
				expect( this ).toBe( thisObj );
				return item < 5;
			}
			
			findIndex(array, predicate, thisObj);
			findIndex(predicate, array, thisObj);
			findIndex(predicate)(array, thisObj);
			findIndex(array)(predicate, thisObj);
		});

	});

});
