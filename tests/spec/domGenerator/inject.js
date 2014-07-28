
define( function (require) {
	'use strict';
	
	var inject = require('agj/domGenerator/inject');
	
	describe("domGenerator/inject", function () {

		it("takes a function, and calls it passing it toEl() generated functions matching the function's parameters, then returns its return value", function () {
			var result = inject( function (div, span, myDashedTag, prefixed_tag, prefixed_andDashed) {
				return div(
					span(), myDashedTag(), prefixed_tag(), prefixed_andDashed()
				);
			});

			expect( result.tagName ).toBe( 'DIV' );
			expect( result.childNodes[0].tagName ).toBe( 'SPAN' );
			expect( result.childNodes[1].tagName ).toBe( 'MY-DASHED-TAG' );
			expect( result.childNodes[2].tagName ).toBe( 'PREFIXED:TAG' );
			expect( result.childNodes[3].tagName ).toBe( 'PREFIXED:AND-DASHED' );
		});

	});

});
