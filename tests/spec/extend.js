
define( function (require) {
	'use strict';

	var is = require('agj/is');
	var util = require('util/util');
	var merge = require('agj/object/merge');
	var λ = require('lib/lambda-functional.js');


	describe("Extend function", function () {

		describe("allows wrapping a primitive", function () {
			describe("string, which still", function () {
				var xt = require('agj/extend/string');
				it("is instance of String", function () {
					expect( xt('some string') instanceof String ).toBe(true);
				});
				it("coerces into its primitive value", function () {
					expect( xt('some string') == 'some string' ).toBe(true);
					expect( xt('aaa') < 'zzz' ).toBe(true);
					expect( xt('some string').valueOf() ).toBe('some string');
					expect( xt('some string') + ' concatenated' ).toBe('some string concatenated');
				});
			});
			describe("number, which still", function () {
				var xt = require('agj/extend/number');
				it("is instance of Number", function () {
					expect( xt(10) instanceof Number ).toBe(true);
				});
				it("coerces into its primitive value", function () {
					expect( xt(10) == 10 ).toBe(true);
					expect( xt(-10) < 10 ).toBe(true);
					expect( xt(10).valueOf() ).toBe(10);
					expect( xt(10) + 5 ).toBe(15);
				});
			});
		});

		describe("allows wrapping a native", function () {
			describe("array, which", function () {
				var xt = require('agj/extend/array');

				it("remains an instance of Array", function () {
					expect( xt([]) instanceof Array ).toBe(true);
				});
				it("is, however, sadly not an Array", function () {
					expect( Array.isArray(xt([])) ).toBe(false);
				});
				it("also sadly doesn't coerce to value", function () {
					expect( xt([1,2,3]) ).not.toEqual([1,2,3]);
					expect( [1,2,3].concat(xt([4,5,6]))[3].value ).toEqual([4,5,6]);
				});
				it("luckily coerces adequately to string", function () {
					expect( xt([1,2,3]) + '' ).toBe('1,2,3');
				});
				it("keeps its native value accessible via the 'value' property", function () {
					expect( xt([1,2,3]).value ).toEqual([1,2,3]);
				});
			});
			describe("object (literal), which", function () {
				var xt = require('agj/extend/object');

				beforeEach( function () { this.obj = { yeah: 'hey' }; });

				it("keeps the original object accessible via the 'value' property", function () {
					expect( xt(this.obj).value.yeah ).toBe('hey');
				});
				it("-----------------", function () {
					expect( xt(this.obj).hasOwnProperty('yeah') ).toBe(true);
					expect( xt(this.obj).keys() ).toEqual(['yeah']);
				});
			});
		});

		it("allows naturally stringing return values", function () {
			var xt = require('agj/extend/string')
				.register(require('agj/extend/number'))
				.register(require('agj/extend/array'))
				.register(require('agj/extend/object'));
			expect( xt([1,2,3]).concat([4,5,6]).slice(1, 4).value ).toEqual([2,3,4]);
			expect( xt(['1', '2', '3']).reduce(λ('*')) == 6 ).toBe(true);
			expect( xt({ 'a': 2, 'b': 4, 'c': 8 }).keys().push('c').join('').charAt(2).len() + 1 ).toBe(2);
		});

	});
	
});
