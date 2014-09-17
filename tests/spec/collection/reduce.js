
define( function (require) {
	'use strict';
	
	var reduce = require('agj/collection/reduce');
	
	describe("collection/reduce", function () {

		function add(a, b) {
			return a + b;
		}

		it("accumulates all items in a collection through a specified function, with an optional starter parameter", function () {
			expect( reduce([1, 2, 3], add) ).toBe( 6 );
			expect( reduce(add, [1, 2, 3]) ).toBe( 6 );
			expect( reduce({ a: 1, b: 2, c: 3 }, add) ).toBe( 6 );
			expect( reduce(add, { a: 1, b: 2, c: 3 }) ).toBe( 6 );
		});

		it("takes an optional starter value parameter", function () {
			expect( reduce([1, 2, 3], add, 10) ).toBe( 16 );
			expect( reduce(add, [1, 2, 3], 10) ).toBe( 16 );
		});

		it("is auto-curried", function () {
			expect( reduce([1, 2, 3])(add) ).toBe( 6 );
			expect( reduce(add)([1, 2, 3]) ).toBe( 6 );
			expect( reduce([1, 2, 3])(add, 10) ).toBe( 16 );
			expect( reduce(add)([1, 2, 3], 10) ).toBe( 16 );
			expect( reduce({ a: 1, b: 2, c: 3 })(add) ).toBe( 6 );
			expect( reduce(add)({ a: 1, b: 2, c: 3 }) ).toBe( 6 );
			expect( reduce({ a: 1, b: 2, c: 3 })(add, 10) ).toBe( 16 );
			expect( reduce(add)({ a: 1, b: 2, c: 3 }, 10) ).toBe( 16 );
		});

	});

});
