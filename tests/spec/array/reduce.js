
define( function (require) {
	'use strict';
	
	var reduce = require('agj/array/reduce');
	
	describe("array/reduce", function () {

		function add(a, b) {
			return a + b;
		}
		function multiply(a, b) {
			return a * b;
		}

		it("accumulates all items in an array through a specified function, with an optional starter parameter", function () {
			expect( reduce([1, 2, 3], add) ).toBe( 6 );
			expect( reduce(add, [1, 2, 3]) ).toBe( 6 );
			expect( reduce([1, 2, 3], add, 10) ).toBe( 16 );
			expect( reduce(add, [1, 2, 3], 10) ).toBe( 16 );
		});

		it("can be partially applied with a function or an array", function () {
			var sum = reduce(add);
			var product = reduce(multiply);

			expect( sum([1, 2, 3, 4, 5]) ).toBe( 15 );
			expect( product([1, 2, 3, 4, 5]) ).toBe( 120 );
			expect( sum([1, 2, 3, 4, 5], 100) ).toBe( 115 );
			expect( product([1, 2, 3, 4, 5], 100) ).toBe( 12000 );

			expect( reduce([1, 2, 3])(add) ).toBe( 6 );
			expect( reduce([1, 2, 3])(add, 10) ).toBe( 16 );
			expect( reduce([1, 2, 3])(multiply) ).toBe( 6 );
			expect( reduce([1, 2, 3])(multiply, 10) ).toBe( 60 );
		});

	});

});
