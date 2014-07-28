
define( function (require) {
	'use strict';
	
	var padRight = require('agj/string/padRight');
	
	describe("string/padRight", function () {

		it("fills the string up to the specified number of characters by adding spaces or the passed 'padding' to the right as many times as needed", function () {
			expect( padRight('my', 5) ).toBe( 'my   ' );
			expect( padRight('my', 5, '!') ).toBe( 'my!!!' );
			expect( padRight('my', 5, '!?') ).toBe( 'my!?!' );
		});

		it("returns the original string if already long enough", function () {
			expect( padRight('oh my', 5) ).toBe( 'oh my' );
			expect( padRight('oh my!', 5) ).toBe( 'oh my!' );
		});

	});

});
