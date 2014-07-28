
define( function (require) {
	'use strict';
	
	var first = require('agj/string/first');
	
	describe("string/first", function () {

		it("gets the number of characters specified from the start of the string", function () {
			expect( first('first', 2) ).toBe( 'fi' );
		});

		it("gets the whole string if it's shorter than the number of characters specified", function () {
			expect( first('first', 100) ).toBe( 'first' );
		});

		it("gets the first character if no number is passed", function () {
			expect( first('first') ).toBe( 'f' );
		});

	});

});
