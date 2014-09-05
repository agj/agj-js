
define( function (require) {
	'use strict';
	
	var parseRGB = require('agj/color/parseRGB');
	
	describe("color/parseRGB", function () {

		it("returns an plain object with values for channels red, green, and blue", function () {
			expect( parseRGB(0xff9966) ).toEqual( { red: 0xff, green: 0x99, blue: 0x66 } );
			expect( parseRGB(0x000000) ).toEqual( { red: 0x00, green: 0x00, blue: 0x00 } );
			expect( parseRGB(0xffffff) ).toEqual( { red: 0xff, green: 0xff, blue: 0xff } );
		});

	});

});
