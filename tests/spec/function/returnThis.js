
define( function (require) {
	'use strict';
	
	var returnThis = require('agj/function/returnThis');
	
	describe("function/returnThis", function () {

		it("takes a function and forces it to return the value of 'this'", function () {
			function method(a) {
				return a;
			}

			var objA = { method: method };
			var objB = { method: returnThis(method) };

			expect( objA.method(5) ).toBe(5);
			expect( objB.method(5) ).toBe(objB);
		});

	});

});
