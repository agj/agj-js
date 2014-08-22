
define( function (require) {
	'use strict';
	
	var has = require('agj/array/has');
	
	describe("array/has", function () {

		it("returns a boolean value indicating whether an array has an item or not", function () {
			expect( has(['a', 'b', 'c'], 'a') ).toBe( true );
			expect( has(['a', 'b', 'c'], 100) ).toBe( false );
		});

	});

});
