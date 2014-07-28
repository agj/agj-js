
define( function (require) {
	'use strict';
	
	var startsWith = require('agj/string/startsWith');
	
	describe("string/startsWith", function () {

		it("returns true only if the passed comparison string is contained at the start of the string", function () {
			expect( startsWith('starts', 'st') ).toBe( true );
			expect( startsWith('starts', 'no') ).toBe( false );
		});

	});

});
