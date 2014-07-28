
define( function (require) {
	'use strict';
	
	var valueToKey = require('agj/object/valueToKey');
	
	describe("object/valueToKey", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("returns a key containing the specified value, or undefined if not found", function () {
			expect( valueToKey({ a: 10}, 10) ).toBe( 'a' );
			expect( valueToKey({ a: 10}, 'none') ).toBe( undefined );
		});

	});

});
