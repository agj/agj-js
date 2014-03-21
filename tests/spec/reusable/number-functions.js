
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var pass = util.pass();

	return {
		degToRad: pass( 90 ).get( Math.PI / 2 ),
		radToDeg: pass( Math.PI / 2 ).get( 90 ),
		toBase:   pass( 10, 5, 5 ).get( '00020' ),
		toHex:    pass( 10, 2 ).get( '0a' ),
		logBase:  pass( 16, 2 ).get( 4 )
	};

});
