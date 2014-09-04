
define( function (require) {
	'use strict';
	
	var passThis = require('agj/function/passThis');
	
	describe("function/passThis", function () {

		it("modifies a function so that it always receives the value of 'this' when invoked", function () {
			function id(arg) {
				return arg;
			}
			var obj = {
				regular: id,
				passThised: passThis(id),
			};

			expect( obj.regular('test') ).toBe( 'test' );
			expect( obj.passThised('test') ).toBe( obj );
		});

	});

});
