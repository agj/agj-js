
define( function (require) {
	'use strict';
	
	var last = require('agj/string/last');
	
	describe("string/last", function () {

		it("gets the number of characters specified from the end of the string", function () {
			expect( last('last', 2) ).toBe( 'st' );
		});

		it("gets the whole string if it's shorter than the number of characters specified", function () {
			expect( last('last', 100) ).toBe( 'last' );
		});

		it("gets the last character if no number is passed", function () {
			expect( last('last') ).toBe( 't' );
		});

	});

});
