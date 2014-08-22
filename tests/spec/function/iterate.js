
define( function (require) {
	'use strict';
	
	var iterate = require('agj/function/iterate');
	
	describe("function/iterate", function () {

		it("calls a callback function repeatedly, passing it an iteration index, the value upon which it will end (by default Infinity), and the start value (by default 0)", function () {
			iterate( function (i, e, s) {
				expect(i).toBe(0);
				expect(e).toBe(Infinity);
				expect(s).toBe(0);
				return true;
			});
		});

		it("calls it until it returns a non-undefined value, and returns that", function () {
			var iter;
			var result = iterate( function (i, e, s) {
				iter = i;
				return 'hi';
			});
			expect(iter).toBe(0);
			expect(result).toBe('hi');
		});

		it("optionally accepts an endIndex argument, up to which (but not including) it will iterate", function () {
			var sum = 0;
			var result = iterate(5, function (i, e, s) {
				sum += i;
				expect(e).toBe(5);
				expect(s).toBe(0);
			});
			expect(sum).toBe(10);
			expect(result).toBe(undefined);
		});

		it("optionally accepts a set of startIndex and endIndex values, between which it will iterate", function () {
			var sum = 0;
			var result = iterate(5, 100, function (i, e, s) {
				sum += i;
				expect(e).toBe(100);
				expect(s).toBe(5);
				if (i === 7) return 0;
			});
			expect(sum).toBe(18);
			expect(result).toBe(0);
		});

		it("can take a higher start value for a decreasing iterator", function () {
			var calc = 120;
			iterate(5, 1, function (i, e, s) {
				calc /= i;
				expect(e).toBe(1);
				expect(s).toBe(5);
			});
			expect(calc).toBe(1);
		});

	});

});
