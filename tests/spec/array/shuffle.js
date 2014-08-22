
define( function (require) {
	'use strict';
	
	var shuffle = require('agj/array/shuffle');
	
	describe("array/shuffle", function () {

		it("returns a new array with the passed array's same contents in random ordering", function () {
			var original = ['a', 'b', 'c', 'd', 'e', 'f'];
			var shuffled = shuffle(original);

			expect( shuffled ).not.toBe( original );
			expect( shuffled ).toContain( 'a' );
			expect( shuffled ).toContain( 'c' );
			expect( shuffled ).toContain( 'e' );
			expect( shuffled.length ).toBe( 6 );
		});

	});

});
