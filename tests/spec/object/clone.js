
define( function (require) {
	'use strict';
	
	var clone = require('agj/object/clone');
	
	describe("object/clone", function () {

		it("creates a (shallow) clone of the passed object", function () {
			var obj = { a: 1, b: 2 };
			var result = clone(obj);
			
			expect( obj ).not.toBe( result );
			expect( obj ).toEqual( result );
		});

	});

});
