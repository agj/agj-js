
define( function (require) {
	'use strict';
	
	var bindMethod = require('agj/object/bindMethod');
	
	describe("object/bindMethod", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("binds the object's method name to that object and returns a portable function", function () {
			var methodOwner = {
				action: function (a) { return this.something + a; },
				something: 10,
			};
			var bound = bindMethod(methodOwner, 'action');
			expect( bound(5) ).toBe( 15 );
		});

	});

});
