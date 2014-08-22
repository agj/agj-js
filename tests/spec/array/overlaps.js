
define( function (require) {
	'use strict';
	
	var overlaps = require('agj/array/overlaps');
	
	describe("array/overlaps", function () {

		it("returns a boolean value indicating whether two arrays share items or not", function () {
			expect( overlaps(['a', 'b', 'c', 'd'], ['c', 'd', 'e', 'f']) ).toBe( true );
			expect( overlaps(['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']) ).toBe( false );
		});

	});

});
