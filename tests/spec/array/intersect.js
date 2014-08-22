
define( function (require) {
	'use strict';
	
	var intersect = require('agj/array/intersect');
	
	describe("array/intersect", function () {

		it("creates an array with all items shared by two arrays", function () {
			expect( intersect([1, 2, 3, 4], [3, 4, 5]) ).toEqual( [3, 4] );
		});

	});

});
