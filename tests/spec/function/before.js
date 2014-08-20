
define( function (require) {
	'use strict';
	
	var before = require('agj/function/before');
	
	describe("function/before", function () {

		it("takes a decoration function and a target function, and creates a function that calls the decoration before the original function, passing it the same arguments as the target function", function () {
			var lastCalled;
			var targetArguments;

			function target(a, b) {
				lastCalled = target;
				return a + b;
			}
			function decoration(a, b) {
				lastCalled = decoration;
				targetArguments = [a, b];
			}

			var decorated = before(decoration, target);

			expect( decorated(10, 5) ).toBe( 15 );
			expect( targetArguments ).toEqual( [10, 5] );
			expect( lastCalled ).toBe( target );
		});

		it("can be also used in curried form", function () {
			var targetArguments;
			var lastCalled;

			function target(a, b) {
				lastCalled = target;
				return a + b;
			}
			function decoration(a, b) {
				lastCalled = decoration;
				targetArguments = [a, b];
			}

			var decorated = before(decoration)(target);

			expect( decorated(10, 5) ).toBe( 15 );
			expect( targetArguments ).toEqual( [10, 5] );
			expect( lastCalled ).toBe( target );
		});

	});

});
