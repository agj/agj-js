
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var is = require('agj/is');

	describe("'is' comparison utility", function () {
		var pass = util.pass();
		var passAny = util.pass( function () {
			return { any: true };
		});

		var MyClass = function () {};
		var myObj = {};

		var functions = {
			set: [
				passAny({}, [], 'a', 10, 0, -0, Infinity).get(true),
				passAny(void 0, null, 0/0, '').get(false)
			],
			array: [
				passAny([], new Array()).get(true),
				passAny({}, null, void 0, 10, { 0: true, 1: true, length: 2 }).get(false)
			],
			undefined: [
				passAny(void 0).get(true),
				passAny(null, '', 0).get(false)
			],
			boolean: [
				passAny(true, false).get(true),
				passAny(null, 0, 1, void 0, {}, '', 'true', new Boolean(null)).get(false)
			],
			number: [
				passAny(0, -0, 10, Infinity, -Infinity, 0/0).get(true),
				passAny('0', '1', {}, null, void 0).get(false)
			],
			string: [
				passAny('a', '', new String('a')).get(true),
				passAny(10, /.*/, null).get(false)
			],
			fn: [
				passAny( function(){}, new Function(), eval('(function(){})')).get(true),
				passAny({}, null).get(false)
			],
			date: [
				passAny(new Date()).get(true),
				passAny({}, null).get(false)
			],
			objectLiteral: [
				passAny({}, new Object()).get(true),
				passAny([], /.*/, new MyClass(), function(){}).get(false)
			]
		};
		var comparisons = {
			instanceOf: [
				pass(MyClass, new MyClass()).get(true),
				pass(Object, []).get(true),
				pass(MyClass, []).get(false),
				pass(MyClass, MyClass).get(false),
				pass(MyClass, MyClass()).get(false)
			],
			equal: [
				pass(false, false).get(true),
				pass('a', 'a').get(true),
				pass(101, 101).get(true),
				pass(myObj, myObj).get(true),
				pass({}, {}).get(false),
				pass([], []).get(false),
				pass(1, 2).get(false)
			],
			greater: [
				pass(5, 10).get(true),
				pass('a', 'b').get(true),
				pass(10, 5).get(false),
				pass(5, 5).get(false),
				pass('b', 'a').get(false),
				pass('b', 'b').get(false)
			],
			greaterOrEqual: [
				pass(5, 10).get(true),
				pass('a', 'b').get(true),
				pass(10, 5).get(false),
				pass(5, 5).get(true),
				pass('b', 'a').get(false),
				pass('b', 'b').get(true)
			],
			less: [
				pass(5, 10).get(false),
				pass('a', 'b').get(false),
				pass(10, 5).get(true),
				pass(5, 5).get(false),
				pass('b', 'a').get(true),
				pass('b', 'b').get(false)
			],
			lessOrEqual: [
				pass(5, 10).get(false),
				pass('a', 'b').get(false),
				pass(10, 5).get(true),
				pass(5, 5).get(true),
				pass('b', 'a').get(true),
				pass('b', 'b').get(true)
			],
			eq: [
				pass(1, 1).get(true),
				pass(1, 0).get(false)
			],
			gt: [
				pass(0, 1).get(true),
				pass(1, 1).get(false),
				pass(1, 0).get(false)
			],
			gte: [
				pass(0, 1).get(true),
				pass(1, 1).get(true),
				pass(1, 0).get(false)
			],
			lt: [
				pass(1, 0).get(true),
				pass(1, 1).get(false),
				pass(0, 1).get(false)
			],
			lte: [
				pass(1, 0).get(true),
				pass(1, 1).get(true),
				pass(0, 1).get(false)
			]
		};

		describe("functions", function () {
			util.checkMethods(functions,
				function (method, o) {
					if (o.any) {
						o.args.forEach(perform);
					} else {
						perform(o.args);
					}
					function perform(arg) {
						if (!is.array(arg) || !arg.length) arg = [arg];
						var exp = expect( is[method].apply(null, arg) );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				}
			);
		});

		describe("auto-currying comparison functions", function () {
			util.checkMethods(comparisons,
				function (method, o) {
					var exp = o.args.reduce( function (fn, arg) {
						return fn(arg);
					}, is[method]);
					exp = expect(exp);
					if (o.loose) exp.toEqual( o.result );
					else         exp.toBe( o.result );
				}
			);

			it("in", function () {
				expect( is.in({ a: 'one', b: 'two' }, 'two') ).toBe( true );
				expect( is.in(['one', 'two'], 'two') ).toBe( true );
				var test = function () {
					is.in(new Date(), 'whatever');
				};
				expect( test ).toThrow();
			});
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(is) ).toBe( size(functions) + size(comparisons) + 1 );
		});
	});

});
