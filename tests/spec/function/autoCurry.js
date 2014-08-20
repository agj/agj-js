
define( function (require) {
	'use strict';
	
	var autoCurry = require('agj/function/autoCurry');
	
	describe("function/autoCurry", function () {

		var fn3 = function (a, b, c) {
			return a / b / c;
		};

		var fn2 = function (a, b) {
			return a / b;
		};

		it("creates a function to which you can pass arguments one by one, each time returning a partially applied function until all original parameters are fulfilled", function () {
			expect( autoCurry(fn3)(10)(2)(5) ).toBe( 1 );
			expect( autoCurry(fn2)(10)(2) ).toBe( 5 );
		});

		it("also allows for passing an arbitrary number of parameters", function () {
			expect( autoCurry(fn3)(10, 2)(5) ).toBe( 1 );
			expect( autoCurry(fn3)(10)(2, 5) ).toBe( 1 );
			expect( autoCurry(fn2)(10, 2, 5) ).toBe( 5 );
		});

	});

});
