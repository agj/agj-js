
define( function (require) {
	'use strict';
	
	var flatten = require('agj/array/flatten');
	
	describe("array/flatten", function () {

		it("takes an array an flattens all nested arrays, recursively", function () {
			expect( flatten(['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', 'b', 'c', 'd', 'e', 'f'] );
		});

		it("optionally flattens up to a specified number of levels", function () {
			expect( flatten(0, ['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', ['b', [['c', 'd'], 'e']], 'f'] );
			expect( flatten(1, ['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', 'b', [['c', 'd'], 'e'], 'f'] );
			expect( flatten(2, ['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', 'b', ['c', 'd'], 'e', 'f'] );
		});

		it("is auto-currying", function () {
			expect( flatten(1)(['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', 'b', [['c', 'd'], 'e'], 'f'] );
			expect( flatten(2)(['a', ['b', [['c', 'd'], 'e']], 'f']) ).toEqual( ['a', 'b', ['c', 'd'], 'e', 'f'] );
		});

	});

});
