
define( function (require) {
	'use strict';
	
	var sample = require('agj/array/sample');
	
	describe("array/sample", function () {

		it("returns one random element from an array", function () {
			var array = ['a', 'b', 'c', 'd', 'e'];
			expect( array ).toContain( sample(array) );
		});

		xit("optionally returns an array of a number of items contained in the array, randomly ordered", function () {
			var array = ['a', 'b', 'c', 'd', 'e'];
			var called = 0;

			sample(array, 3).forEach( function (item) {
				called++;
				expect( array ).toContain( item );
			});

			expect( called ).toBe( 3 );
		});

	});

});
