
define( function (require) {
	'use strict';
	
	var nextIndex = require('agj/array/nextIndex');
	
	describe("array/nextIndex", function () {

		it("retrieves the next available index in the passed array", function () {
			expect( nextIndex(['a', 'b', 'c', 'd'], 1) ).toBe( 2 );
		});

		it("will wrap around to 0 when the end is reached, unless 'true' is passed as the third argument", function () {
			expect( nextIndex(['a', 'b', 'c', 'd'], 3) ).toBe( 0 );
			expect( nextIndex(['a', 'b', 'c', 'd'], 3, true) ).toBe( -1 );
		});

	});

});
