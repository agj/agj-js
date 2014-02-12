

define(["agj/core", "rsvp", "signals"], function (AGJ, RSVP, signals) {
	"use strict";

	var module = AGJ.defineModules({}, {
		array: function (start, end, time, mspf, easing) {
			return module.liveArray(start.clone(), end.clone(), time, mspf, easing);
		},

		liveArray: function (start, end, time, mspf, easing) {
			var deferred = RSVP.defer();
			var r = {
				result: start.clone(),
				updated: new signals.Signal(),
				progress: 0,
				stop: function () {
					if (!isFinished) {
						isFinished = true;
						r.updated.removeAll();
						deferred.resolve(true);
					}
				},
				finished: deferred.promise
			};

			var isFinished = false;
			time = time || 500;
			mspf = mspf || 20;
			easing = easing || module.easing.linear;
			var startTime = Date.now();

			var execute = function () {
				if (isFinished) return;

				var progress = r.progress = (Date.now() - startTime) / time;
				var i = start.length;
				if (progress < 1) {
					var p = easing(progress);
					while (--i >= 0) {
						r.result[i] = start[i] * (1 - p) + end[i] * p;
					}
					r.updated.dispatch();
					setTimeout(execute, mspf);
				} else {
					while (--i >= 0) {
						r.result[i] = end[i];
					}
					r.progress = 1;
					r.updated.dispatch();
					r.stop();
				}
			};
			setTimeout(execute, mspf);

			return r;
		},

		easing: {
			linear: function (p) {
				return p;
			},
			easeInQuad: function (p) {
				return p * p;
			},
			easeOutSine: function (p) {
				return Math.sin(p * (AGJ.math.TAU / 4));
			}
		}
	});

	return module;
});

