
define( function (require) {
	'use strict';
	
	var getter = require('agj/object/getter');
	
	describe("object/getter", function () {

		it("returns a function that, when called, returns the current value of a property in an object", function () {
			var obj = {};
			var getProp = getter(obj, 'prop');
			expect( getProp() ).toBe( undefined );
			obj.prop = 'later';
			expect( getProp() ).toBe( 'later' );
		});

		it("is partially applied automatically", function () {
			expect( getter({ prop: 10 })('prop')() ).toBe( 10 );
		});

	});

});
