
define( function (require) {
	'use strict';

	var agj = require('./core');
	var toArray = agj.toArray;


	function clone(arr) {
		return arr.concat();
	}

	function first(arr, amount) {
		if (isNaN(amount)) amount = 1;
		if (amount === 1) return arr[0];
		return arr.slice(0, amount);
	}
	function last(arr, amount) {
		if (isNaN(amount)) amount = 1;
		if (amount === 1) return arr[arr.length - 1];
		return arr.slice(-amount);
	}

	function getRandom(arr) {
		var len = arr.length;
		if (len <= 0) return agj.undefined;
		return arr[Math.floor(Math.random() * len)];
	}

	function overlaps(arr, array) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if (array.indexOf(arr[i]) >= 0)
				return true;
		}
		return false;
	}

	function getDifference(arr, array) {
		return arr.filter(function (item) {
			return array.indexOf(item) === -1;
		});
	}

	function subtract(arr, array) {
		for (var i = arr.length - 1; i >= 0; i--) {
			if (array.indexOf(arr[i]) >= 0)
				arr.splice(i, 1);
		}
		return arr;
	}

	function getIntersection(arr, array) {
		return arr.filter(function (item) {
			return array.indexOf(item) >= 0;
		});
	}

	function remove(arr) {
		var items = toArray(arguments).slice(1);
		items.forEach( function (item) {
			var i;
			while (i = arr.indexOf(item), i !== -1) {
				arr.splice(i, 1);
			}
		});
		return arr;
	}

	function shuffle(arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			var r = Math.floor(Math.random() * (i + 1));
			var temp = arr[i];
			arr[i] = arr[r];
			arr[r] = temp;
		}
		return arr;
	}

	function nextTo(arr, item, dontWrapAround) {
		var index = nextOrPrevIndex(arr, arr.indexOf(item), true, dontWrapAround);
		if (index >= 0)
			return arr[index];
		return agj.undefined;
	}
	function prevTo(arr, item, dontWrapAround) {
		var index = nextOrPrevIndex(arr, arr.indexOf(item), false, dontWrapAround);
		if (index >= 0)
			return arr[index];
		return agj.undefined;
	}
	function nextIndex(arr, index, dontWrapAround) {
		return nextOrPrevIndex(arr, index, true, dontWrapAround);
	}
	function prevIndex(arr, index, dontWrapAround) {
		return nextOrPrevIndex(arr, index, false, dontWrapAround);
	}
	function nextIndexTo(arr, item, dontWrapAround) {
		return nextOrPrevIndex(arr, arr.indexOf(item), true, dontWrapAround);
	}
	function prevIndexTo(arr, item, dontWrapAround) {
		return nextOrPrevIndex(arr, arr.indexOf(item), false, dontWrapAround);
	}
	function nextOrPrevIndex(arr, index, getNext, dontWrapAround) {
		index += getNext ? 1 : -1;
		var len = arr.length;
		if (index >= len) {
			if (!dontWrapAround)
				index = index % len;
			else
				index = -1;
		} else if (index < 0) {
			if (!dontWrapAround)
				index += len;
			else
				index = -1;
		}
		return index;
	}

	function get2D(arr, width, x, y) {
		return arr[x + y * width];
	}
	function set2D(arr, width, x, y, value) {
		arr[x + y * width] = value;
		return arr;
	}

	return {
		clone: clone,
		first: first,
		last: last,
		getRandom: getRandom,
		overlaps: overlaps,
		getDifference: getDifference,
		subtract: subtract,
		getIntersection: getIntersection,
		remove: remove,
		shuffle: shuffle,

		get2D: get2D,
		set2D: set2D,

		nextTo: nextTo,
		prevTo: prevTo,
		nextIndex: nextIndex,
		prevIndex: prevIndex,
		nextIndexTo: nextIndexTo,
		prevIndexTo: prevIndexTo
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
