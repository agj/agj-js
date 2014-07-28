
define( function (require) {
	'use strict';
	
	var lateProp = require('agj/object/lateProp');
	
	describe("object/lateProp", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("returns a function that, when called, returns the current value of the passed object's property defined in the second argument", function () {
			expect( lateProp({ a: 10}, 'a')() ).toBe( 10 );

			var obj = {};
			var getter = lateProp(obj, 'prop');
			expect( getter() ).toBe( undefined );
			obj.prop = 'later';
			expect( getter() ).toBe( 'later' );
		});

	});

});
