
define( function (require) {
	'use strict';
	
	var maybe = require('agj/function/maybe');
	
	describe("function/maybe", function () {

		function lessThanTwenty(a) {
			return a < 20;
		}
		function byTwo(a) {
			return a / 2;
		}
		function functionReturnValue() {}

		it("produces a function that tests against the passed value with a predicate first, which if positive calls the passed function, and if negative returns a default value", function () {
			expect( maybe(lessThanTwenty, 'default', byTwo)(10) ).toBe( 5 );
			expect( maybe(lessThanTwenty, 'default', byTwo)(20) ).toBe( 'default' );
			expect( maybe(lessThanTwenty, byTwo)(20) ).toBe( undefined );
		});

		it("is fully auto-curried", function () {
			expect( maybe(lessThanTwenty)('default')(byTwo)(20) ).toBe( 'default' );
			expect( maybe(lessThanTwenty, 'default')(byTwo)(20) ).toBe( 'default' );
			expect( maybe(lessThanTwenty)('default', byTwo)(20) ).toBe( 'default' );

			expect( maybe(lessThanTwenty)(byTwo)(10) ).toBe( 5 );
			expect( maybe(lessThanTwenty)(byTwo)(20) ).toBe( undefined );
		});

		it("will terminate currying early after it takes two functions straight, so for a function as a return value, avoid currying", function () {
			expect( maybe(lessThanTwenty, functionReturnValue, byTwo)(20) ).toBe( functionReturnValue );
			expect( maybe(lessThanTwenty)(functionReturnValue, byTwo)(20) ).toBe( functionReturnValue );
		});

	});

});
