
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');
	var λ = require('lib/lambda-functional.js');

	var pass = util.pass( function () {
		return { args: [{ one: 1, two: '2', three: 'three' }] };
	});
	var passOnly = util.pass();
	var get = function (result) { return pass().get(result); };

	return {
		every: [
		                 pass( λ('_') ).get(true),
		                 pass( λ('_ === 1') ).get(false),
		],
		filter:          pass( λ('_ > "a"') ).get({ three: 'three' }),
		// forEach
		map:             pass( λ('_+"added"') ).get({ one: '1added', two: '2added', three: 'threeadded' }),
		some: [
		                 pass( λ('_ == "three"') ).get(true),
		                 pass( λ('_ === "four"') ).get(false),
		],
		getKeyFromValue: pass('2').get('two'),
		isEmpty: [
		                 get(false),
		                 passOnly({}).get(true)
		],
		merge:           pass({ a: 'one' }).get({ one: 1, two: '2', three: 'three', a: 'one' }),
		mergeInto:       pass({ a: 'one' }).get({ one: 1, two: '2', three: 'three', a: 'one' }),
		size:            get(3),
		values:          get([1, '2', 'three'])
	};

});
