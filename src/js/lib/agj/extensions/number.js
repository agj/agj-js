

define(["../core"], function (AGJ) {

	return function () {
		AGJ.mixin(Number.prototype, {
			degToRad: function () { // Number
				return this * Math.TAU / 360;
			},
			radToDeg: function () { // Number
				return this * 360 / Math.TAU;
			},

			toBase: function (base, pad) { // String
				var result = this.toString(base);
				if (!isNaN(pad)) {
					while (result.length < pad) {
						result = "0" + result;
					}
				}
				return result;
			},

			toHex: function (pad) { // String
				return this.toBase(16, pad);
			},

			logBase: function (base) {
				return Math.log(this) / Math.log(base);
			}
		});
	};

});