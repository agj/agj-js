
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');
	var λ = require('lib/lambda-functional.js');

	var declaratorDefault = util.declarator( function () {
		return { args: [{ one: 1, two: '2', three: 'three' }] };
	});
	var pass = declaratorDefault.pass;
	var get = declaratorDefault.get;
	var passOnly = util.declarator().pass;

	return {
		bindMethod: [
			passOnly( { action: λ('-> this.a'), a: 10 }, 'action' )
				.checkWith( λ('_()') )
				.get(10)
				.becauseIt("binds the object's method in methodName to the object and returns a portable function"),
			passOnly( { action: λ('b -> this.a + b'), a: 10 }, 'action' )
				.checkWith( λ('_(7)') )
				.get(17)
				.becauseIt("produces a function that passes arguments to the method"),
		],
		every: [
			pass( λ('_') )
				.get(true),
			pass( λ('_ === 1') )
				.get(false),
		],
		filter: [
			pass( λ('_ > "a"') )
				.get({ three: 'three' }),
		],
		// forEach
		map: [
			pass( λ('_+"added"') )
				.get({ one: '1added', two: '2added', three: 'threeadded' }),
		],
		some: [
			pass( λ('_ == "three"') )
				.get(true),
			pass( λ('_ === "four"') )
				.get(false),
		],
		valueToKey: [
			pass('2')
				.get('two'),
		],
		isEmpty: [
			get(false),
			passOnly({})
				.get(true)
		],
		merge: [
			pass({ a: 'one' })
				.get({ one: 1, two: '2', three: 'three', a: 'one' }),
		],
		mergeInto: [
			pass({ a: 'one' })
				.get({ one: 1, two: '2', three: 'three', a: 'one' }),
		],
		size: [
			get(3),
		],
		values: [
			get([1, '2', 'three']),
		],
	};

});
