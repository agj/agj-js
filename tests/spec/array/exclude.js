
define( function (require) {
	'use strict';
	
	var exclude = require('agj/array/exclude');
	
	describe("array/exclude", function () {

		it("creates an array with all items in one array not present in a second", function () {
			expect( exclude([1, 2, 3, 4], [3, 4, 5]) ).toEqual( [1, 2] );
		});

	});

});
