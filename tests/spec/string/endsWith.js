
define( function (require) {
	'use strict';
	
	var endsWith = require('agj/string/endsWith');
	
	describe("string/endsWith", function () {

		it("returns true only if the passed comparison string is contained at the end of the string", function () {
			expect( endsWith('ends', 'ds') ).toBe( true );
			expect( endsWith('ends', 'no') ).toBe( false );
		});

	});

});
