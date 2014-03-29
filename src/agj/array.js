
define( function (require) {
	'use strict';

	return {
		clone:         require('./array/clone'),
		first:         require('./array/first'),
		get2D:         require('./array/get-2D'),
		getDifference: require('./array/get-difference'),
		getRandom:     require('./array/get-random'),
		intersect:     require('./array/intersect'),
		last:          require('./array/last'),
		mapToObject:   require('./array/map-to-object'),
		nextIndex:     require('./array/next-index'),
		nextIndexTo:   require('./array/next-index-to'),
		nextTo:        require('./array/next-to'),
		overlaps:      require('./array/overlaps'),
		prevIndex:     require('./array/prev-index'),
		prevIndexTo:   require('./array/prev-index-to'),
		prevTo:        require('./array/prev-to'),
		remove:        require('./array/remove'),
		set2D:         require('./array/set-2D'),
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
