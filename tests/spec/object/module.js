
define( function (require) {
	'use strict';
	
	var module = require('agj/object/module');
	
	describe("object/module", function () {

		it("defines a property in an object, enumerable but neither writable nor configurable, and returns the value", function () {
			var container = { };
			var mod = { };

			var result = module(container, 'prop', mod);

			expect( result ).toBe( mod );
			expect( container.prop ).toBe( mod );
			expect( function () { container.prop = 'modified'; } ).toThrow();
		});

		it("can also define all the properties in an object into the leftmost argument, as enumerable but neither writable nor configurable, and returns the target", function () {
			var container = { };
			var mods = {
				a: {},
				b: {}
			};

			var result = module(container, mods);

			expect( result ).toBe( container );
			expect( container.a ).toBe( mods.a );
			expect( container.b ).toBe( mods.b );
			expect( function () { container.a = 'modified'; } ).toThrow();
		});

		it("is automatically partially applied if only the first argument is passed", function () {
			var container = { };
			var mod = { };

			var moduleContainer = module(container);

			var result = moduleContainer('prop', mod);

			expect( result ).toBe( mod );
			expect( container.prop ).toBe( mod );
			expect( function () { container.prop = 'modified'; } ).toThrow();

			var mods = {
				a: {},
				b: {}
			};

			result = moduleContainer(mods);

			expect( result ).toBe( container );
			expect( container.a ).toBe( mods.a );
			expect( container.b ).toBe( mods.b );
			expect( function () { container.a = 'modified'; } ).toThrow();
		});

	});

});
