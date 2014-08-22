
define( function (require) {
	'use strict';
	
	var radToDeg = require('agj/number/radToDeg');

	describe("number/radToDeg", function () {

		it("converts a number from radians to degrees", function () {
			expect( radToDeg(Math.PI / 2) ).toBe( 90 );
		});

	});

});
