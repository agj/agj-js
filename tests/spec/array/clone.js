
define( function (require) {
	'use strict';
	
	var clone = require('agj/array/clone');
	
	describe("array/clone", function () {

		it("makes a shallow copy of an array", function () {
			var original = [100, 10, 1];
			var theClone = clone(original);

			expect( theClone ).not.toBe( original );
			expect( theClone ).toEqual( original );
		});

	});

});
