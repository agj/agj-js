
define( function (require) {
	'use strict';

	require('./array/clone');
	require('./array/exclude');
	require('./array/find');
	require('./array/findIndex');
	require('./array/first');
	require('./array/flatten');
	require('./array/get2D');
	require('./array/has');
	require('./array/intersect');
	require('./array/last');
	require('./array/mapToObject');
	require('./array/nextIndex');
	require('./array/nextIndexTo');
	require('./array/nextTo');
	require('./array/overlaps');
	require('./array/prevIndex');
	require('./array/prevIndexTo');
	require('./array/prevTo');
	require('./array/remove');
	require('./array/sample');
	require('./array/set2D');
	require('./array/shuffle');


/*
	var util = require('util/util');
	var array = require('agj/array');
	var arrayFunctions = require('reusable/array-functions');

	describe("Array utility", function () {
		util.checkMethods(arrayFunctions,
			function (method, o) {
				var exp = expect( array[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);

		it("getRandom", function () {
			expect( ['10', '1', '100'] ).toContain( array.getRandom(['10', '1', '100']) );
		});

		it("shuffle", function () {
			var arr = ['10', '1', '100'];
			var shuffled = array.shuffle(arr);
			expect( shuffled ).toBe(arr);
			expect( shuffled.length ).toBe(3);
			expect( shuffled ).toContain('1');
			expect( shuffled ).toContain('10');
			expect( shuffled ).toContain('100');
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(array) ).toBe( size(arrayFunctions) + 2 );
		});
	});
*/

});
