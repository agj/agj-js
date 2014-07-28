
define( function (require) {
	'use strict';
	
	var padLeft = require('agj/string/padLeft');
	
	describe("string/padLeft", function () {

		it("fills the string up to the specified number of characters by adding spaces or the passed 'padding' to the left as many times as needed", function () {
			expect( padLeft('my', 5) ).toBe( '   my' );
			expect( padLeft('my', 5, '!') ).toBe( '!!!my' );
			expect( padLeft('my', 5, '!?') ).toBe( '!?!my' );
		});

		it("returns the original string if already long enough", function () {
			expect( padLeft('oh my', 5) ).toBe( 'oh my' );
			expect( padLeft('oh my!', 5) ).toBe( 'oh my!' );
		});

	});

});
