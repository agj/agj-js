
define( function (require) {

	var util = require('util/util');

	var pass = util.pass( function () {
		return { args: [['10', '1', '100']] };
	});
	var get = function (result) { return pass().get(result); };

	return {
		clone:           get(['10', '1', '100']),
		first:           get('10'),
		last:            get('100'),
		// getRandom
		overlaps: [
		                 pass(['nope', 'no', '100', 'not this one']).get(true),
		                 pass(['nope', 'no', 'not this one']).get(false)
		],
		getDifference:   pass(['10', '100']).get(['1']),
		subtract:        pass(['100']).get(['10', '1']),
		getIntersection: pass(['10', '100']).get(['10', '100']),
		remove:          pass('1').get(['10', '100']),
		// shuffle

		get2D:           pass(2, 0, 1).get('100'),
		set2D:           pass(2, 0, 1, 'new').get(['10', '1', 'new']),

		nextTo:          pass('1').get('100'),
		prevTo:          pass('1').get('10'),
		nextIndex:       pass(2).get(0),
		prevIndex:       pass(0).get(2),
		nextIndexTo:     pass('1').get(2),
		prevIndexTo:     pass('1').get(0)
	};

});
