
define( function (require) {
	'use strict';

	return {
		clone:         require('./array/clone'),
		first:         require('./array/first'),
		get2D:         require('./array/get2D'),
		getDifference: require('./array/getDifference'),
		getRandom:     require('./array/getRandom'),
		intersect:     require('./array/intersect'),
		last:          require('./array/last'),
		mapToObject:   require('./array/mapToObject'),
		nextIndex:     require('./array/nextIndex'),
		nextIndexTo:   require('./array/nextIndexTo'),
		nextTo:        require('./array/nextTo'),
		overlaps:      require('./array/overlaps'),
		prevIndex:     require('./array/prevIndex'),
		prevIndexTo:   require('./array/prevIndexTo'),
		prevTo:        require('./array/prevTo'),
		remove:        require('./array/remove'),
		set2D:         require('./array/set2D'),
		shuffle:       require('./array/shuffle'),
		subtract:      require('./array/subtract'),
	};

// function getRandomIndexExcept(arr, arrayIndexExceptions) {
// 	var exc, i, j, nums, random, total;

// 	exc = arrayIndexExceptions.concat();
// 	exc.sort();
// 	nums = [];

// 	total = arr.length;
// 	for (j = 0; j < total; j++) {
// 		nums.push(j);
// 	}
// 	for (i = exc.length - 1; i >= 0; i--) {
// 		nums.splice(exc[i], 1);
// 	}

// 	random = Math.randomInt(nums.length);
// 	return nums[random];
// }
});
