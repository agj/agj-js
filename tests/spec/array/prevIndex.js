
define( function (require) {
	'use strict';
	
	var prevIndex = require('agj/array/prevIndex');
	
	describe("array/prevIndex", function () {

		it("retrieves the previous available index in the passed array", function () {
			expect( prevIndex(['a', 'b', 'c', 'd'], 2) ).toBe( 1 );
		});

		it("will wrap around to the last index when the start is reached, unless 'true' is passed as the third argument", function () {
			expect( prevIndex(['a', 'b', 'c', 'd'], 0) ).toBe( 3 );
			expect( prevIndex(['a', 'b', 'c', 'd'], 0, true) ).toBe( -1 );
		});

	});

});
