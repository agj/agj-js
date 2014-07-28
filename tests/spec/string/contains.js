
define( function (require) {
	'use strict';

	var contains = require('agj/string/contains');
	
	describe("string/contains", function () {

		it("returns true if the passed search string is contained within the string", function () {
			expect( contains('cucumber', 'umb') ).toBe( true );
		});

		it("returns false if the passed search string is not contained within the string", function () {
			expect( contains('cucumber', 'bla') ).toBe( false );
		});

		it("coerces values into strings", function () {
			expect( contains('anullate', null) ).toBe( true );
		});

	});

});
