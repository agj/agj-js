
define( function (require) {
	'use strict';
	
	var find = require('agj/array/find');
	
	describe("array/find", function () {

		it("calls a predicate function on each item in an array, and returns the item for which the predicate returns a truthy value", function () {
			var array = [100, 10, 1];
			var called = 0;

			function predicate(item, index, arr) {
				called++;
				expect( [100, 10, 1] ).toContain( item );
				expect( [0, 1, 2] ).toContain( index );
				expect( arr ).toBe( array );

				return item < 5;
			}

			expect( find(array, predicate) ).toBe( 1 );
			expect( called ).toBe( 3 );

			called = 0;
			expect( find(predicate, array) ).toBe( 1 );
			expect( called ).toBe( 3 );
		});

		it("gets auto curried if only one parameter is passed", function () {
			var array = [100, 10, 1];

			function predicate(item, index, arr) {
				return item < 5;
			}
			
			expect( find(predicate)(array) ).toBe( 1 );
			expect( find(array)(predicate) ).toBe( 1 );
		});

		it("accepts a third 'this' argument, for the predicate, for compatibility with ES6", function () {
			var array = [100, 10, 1];
			var thisObj = {};

			function predicate(item, index, arr) {
				expect( this ).toBe( thisObj );
				return item < 5;
			}
			
			find(array, predicate, thisObj);
			find(predicate, array, thisObj);
			find(predicate)(array, thisObj);
			find(array)(predicate, thisObj);
		});

	});

});
