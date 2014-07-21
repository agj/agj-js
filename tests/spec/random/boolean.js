
define( function (require) {
	'use strict';
	
	var boolean = require('agj/random/boolean');
	
	describe("random/boolean", function () {

		it("returns true or false, randomly", function () {
			expect( typeof boolean() ).toBe( 'boolean' );
		});

	});

});
