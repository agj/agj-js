
define( function (require) {

	var util = require('util/util');
	var λ = require('lib/lambda-functional.js');

	var pass = util.pass( function () {
		return { args: [['10', '1', '100']] };
	});
	var get = function (result) { return pass().get(result); };

	return {
		clone:           get(['10', '1', '100']),
		find:            pass(λ('_==1')).get('1'),
		findIndex:       pass(λ('_==1')).get(1),
		first:           get('10'),
		get2D:           pass(2, 0, 1).get('100'),
		getDifference:   pass(['10', '100']).get(['1']),
		// getRandom
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
