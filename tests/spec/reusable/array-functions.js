
define( function (require) {

	var util = require('util/util');
	var λ = require('lib/lambda-functional.js');

	var declarator = util.declarator(function () {
		return { args: [['10', '1', '100']] };
	});
	var pass = declarator.pass;
	var get = declarator.get;
	var passOnly = util.declarator().pass;

	return {
		clone:           get(['10', '1', '100']),
		find:            pass(λ('_==1')).get('1'),
		findIndex:       pass(λ('_==1')).get(1),
		first:           get('10'),
		flatten: [
			passOnly(['a', ['b', ['c', 'd']], 'e'])
				.get(['a', 'b', ['c', 'd'], 'e'])
				.becauseIt("will flatten the array one level (shallow) by default"),
			passOnly(['a', ['b', ['c', 'd']], 'e'], true)
				.get(['a', 'b', 'c', 'd', 'e'])
				.becauseIt("will deep flatten the array if true is passed for the deep parameter"),
		],
		get2D:           pass(2, 0, 1).get('100'),
		getDifference:   pass(['10', '100']).get(['1']),
		// getRandom
		has: [
		                 pass('100').get(true),
		                 pass('x').get(false),
		],
		intersect:       pass(['10', '100']).get(['10', '100']),
		last:            get('100'),
		mapToObject:     pass(λ('*10')).get({ '10': 100, '1': 10, '100': 1000 }),
		nextIndex:       pass(2).get(0),
		nextIndexTo:     pass('1').get(2),
		nextTo:          pass('1').get('100'),
		overlaps: [
		                 pass(['nope', 'no', '100', 'not this one']).get(true),
		                 pass(['nope', 'no', 'not this one']).get(false),
		],
		prevIndex:       pass(0).get(2),
		prevIndexTo:     pass('1').get(0),
		prevTo:          pass('1').get('10'),
		remove:          pass('1').get(['10', '100']),
		set2D:           pass(2, 0, 1, 'new').get(['10', '1', 'new']),
		// shuffle
		subtract:        pass(['100']).get(['10', '1']),
	};

});
