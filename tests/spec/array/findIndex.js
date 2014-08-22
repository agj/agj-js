
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
		});

	});

});
