
define( function (require) {
	'use strict';
	
	var after = require('agj/function/after');
	
	describe("function/after", function () {

		it("takes a decoration funciton and a target function, and creates a function that calls the decoration after the target function, passing it the result of calling the target", function () {
			var lastCalled;
			var targetResult;

			function target(a, b) {
				lastCalled = target;
				return a + b;
			}
			function decoration(r) {
				lastCalled = decoration;
				targetResult = r;
			}

			var decorated = after(decoration, target);

			expect( decorated(10, 5) ).toBe( 15 );
			expect( targetResult ).toBe( 15 );
			expect( lastCalled ).toBe( decoration );
		});

		it("can be also used in curried form", function () {
			var targetResult;
			var lastCalled;

			function target(a, b) {
				lastCalled = target;
				return a + b;
			}
			function decoration(r) {
				lastCalled = decoration;
				targetResult = r;
			}

			var decorated = after(decoration)(target);

			expect( decorated(10, 5) ).toBe( 15 );
			expect( targetResult ).toBe( 15 );
			expect( lastCalled ).toBe( decoration );
		});

	});

});
