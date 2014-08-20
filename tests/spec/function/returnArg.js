
define( function (require) {
	'use strict';
	
	var returnArg = require('agj/function/returnArg');
	
	describe("function/returnArg", function () {

		function original() {
			return 'original return value';
		}

		it("decorates a function so that it returns the first argument by default, or one on any specified index", function () {
			var modified = returnArg(original);
			expect( original(50, 100, 3) ).toBe( 'original return value' );
			expect( modified(50, 100, 3) ).toBe( 50 );

			var modified0 = returnArg(0, original);
			expect( original(50, 100, 3) ).toBe( 'original return value' );
			expect( modified0(50, 100, 3) ).toBe( 50 );

			var modified2 = returnArg(2, original);
			expect( original(50, 100, 3) ).toBe( 'original return value' );
			expect( modified2(50, 100, 3) ).toBe( 3 );
		});

	});

});
