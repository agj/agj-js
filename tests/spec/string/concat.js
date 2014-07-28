
define( function (require) {
	'use strict';
	
	var concat = require('agj/string/concat');
	
	describe("string/concat", function () {

		it("returns all the passed strings concatenated", function () {
			expect( concat('a', 'b', 'c', 'd') ).toBe( 'abcd' );
		});

		it("returns an empty string if nothing is passed", function () {
			expect( concat() ).toBe( '' );
		});

		it("null and undefined are ignored, while other non-string values are coerced into strings", function () {
			expect( concat('a', null, 'b', undefined, 'c') ).toBe( 'abc' );
			expect( concat(true, false, 10) ).toBe( 'truefalse10' );
		});

	});

});
