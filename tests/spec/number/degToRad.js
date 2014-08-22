
define( function (require) {
	'use strict';
	
	var degToRad = require('agj/number/degToRad');
	
	describe("number/degToRad", function () {

		it("converts a number from degrees to radians", function () {
			expect( degToRad(90) ).toBe( Math.PI / 2 );
		});

	});

});
