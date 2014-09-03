
/**
 * Utilities for drawing on a canvas object.
 *
 * Created by agj (www.agj.cl).
 */

define( function (require) {
	'use strict';

	var toHex = require('../number/inBase')(6);

	var draw = {
		line: function (context2D, drawStyle, from, to) {
			if ((from.x !== to.x) || (from.y !== to.y)) {
				context2D.save();
				context2D.beginPath();
				setLine(context2D, drawStyle);
				context2D.moveTo(from.x, from.y);
				context2D.lineTo(to.x, to.y);
				endLine(context2D);
				context2D.restore();
			} else {
				drawPoint(context2D, drawStyle, from, to);
			}
		},

		curve: function (context2D, drawStyle, from, mid, to) {
			if ((from.x !== to.x) || (from.y !== to.y)) {
				context2D.save();
				context2D.beginPath();
				setLine(context2D, drawStyle);
				context2D.moveTo(from.x, from.y);
				context2D.quadraticCurveTo(mid.x, mid.y, to.x, to.y);
				endLine(context2D);
				context2D.restore();
			} else {
				drawPoint(context2D, drawStyle, from, to);
			}
		},

		circle: function (context2D, drawStyle, circ) {
			context2D.save();
			context2D.beginPath();
			setFill(context2D, drawStyle);
			context2D.arc(circ.x, circ.y, circ.radius, 0, Math.PI * 2);
			endFill(context2D);
			context2D.restore();
		},

		rectangle: function (context2D, drawStyle, rect) {
			context2D.save();
			context2D.beginPath();
			setFill(context2D, drawStyle);
			context2D.fillRect(rect.x, rect.y, rect.width, rect.height);
			endFill(context2D);
			context2D.restore();
		}
	};

	function setLine(context2D, drawStyle) {
		if (drawStyle.getDefinesLine()) {
			context2D.lineWidth = drawStyle.lineWeight;
			context2D.strokeStyle = '#' + toHex(drawStyle.lineColor, 6);
			context2D.lineCap = drawStyle.lineCapsStyle;
		}
	}
	function setFill(context2D, drawStyle) {
		if (drawStyle.getDefinesFill()) {
			context2D.fillStyle = '#' + toHex(drawStyle.lineColor, 6);
		}
	}
	function endLine(context2D) {
		context2D.stroke();
	}
	function endFill(context2D) {
		context2D.fill();
	}

	function drawPoint(context2D, drawStyle, from, to) {
		if (drawStyle.lineCapsStyle === 'round') {
			draw.circle(context2D, drawStyle, { x: from.x, y: from.y, radius: drawStyle.lineWeight * 0.5 });
		} else {
			var halfLT = drawStyle.lineWeight / 2;
			draw.rectangle(context2D, drawStyle, { x: from.x - halfLT, y: from.y - halfLT, width: drawStyle.lineWeight, height: drawStyle.lineWeight });
		}
	}

	return draw;

});

