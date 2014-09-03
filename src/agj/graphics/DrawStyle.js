
define( function (require) {
	'use strict';

	var Class = require('../class/Class');
	var fluent = require('../function/returnThis');

	var _lineCapsStyles = ['butt', 'round', 'square'];
	var _lineJointStyles = ['round', 'miter', 'bevel'];

	function checkColor(value) { // Number
		return value & 0xffffff;
	}

	function checkFraction(number, defaultValue) { // Number
		if (isNaN(number))
			return defaultValue;
		return Math.max(0, Math.min(1, number));
	}

	var DrawStyle = Class.extend({
		init: function (fillColor, fillAlpha, lineColor, lineWeight, lineAlpha) {
			this.setFillColor(fillColor)
				.setFillAlpha(fillAlpha)
				.setLineColor(lineColor)
				.setLineWeight(lineWeight)
				.setLineAlpha(lineAlpha)

				.setLineCapsStyle(null)
				.setLineJointStyle(null)
				.setLineMiterLimit(null);
		},

		setFillColor: fluent( function (value) {
			this.fillColor = checkColor(value);
		}),

		setFillAlpha: fluent( function (value) {
			this.fillAlpha = checkFraction(value, 1);
		}),

		setLineColor: fluent( function (value) {
			this.lineColor = checkColor(value);
		}),

		setLineAlpha: fluent( function (value) {
			this.lineAlpha = checkFraction(value);
		}),

		setLineWeight: fluent( function (value) {
			if (!isNaN(value))
				this.lineWeight = Math.max(0, value);
			else
				this.lineWeight = 0;
		}),

		setLineCapsStyle: fluent( function (value) {
			if (_lineCapsStyles.indexOf(value) >= 0)
				this.lineCapsStyle = value;
			else
				this.lineCapsStyle = _lineCapsStyles[0];
		}),

		setLineJointStyle: fluent( function (value) {
			if (_lineJointStyles.indexOf(value) >= 0)
				this.lineJointStyle = value;
			else
				this.lineJointStyle = _lineJointStyles[0];
		}),

		setLineMiterLimit: fluent( function (value) {
			if (!isNaN(value))
				this.lineMiterLimit = Math.max(0, value);
			else
				this.lineMiterLimit = 3;
		}),

		getDefinesLine: function () { // Boolean
			return (this.lineAlpha > 0 && this.lineWeight > 0);
		},

		getDefinesFill: function () { // Boolean
			return (this.fillAlpha > 0);
		},

		statics: {
			makeLineStyle: function (lineColor, lineWeight, lineAlpha, lineCapsStyle, lineJointStyle, lineMiterLimit) { // DrawStyle
				var ds = new DrawStyle(null, null, lineColor, lineWeight, lineAlpha);
				ds.setLineCapsStyle(lineCapsStyle).
					setLineJointStyle(lineJointStyle).
					setLineMiterLimit(lineMiterLimit);
				return ds;
			}
		}
	});

	return DrawStyle;

});

