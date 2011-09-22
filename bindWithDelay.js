/*

the previous(forked) script had a strong bug. It did not work as jquery $.bind 
because inside the event function "this" was not a DOM element, but a jquery array

here's *simplified* version working for me and tested. I've rewritten it much


(function($) {
$.fn.bindWithDelay = function( type, fun, timeout, throttle ) {
	var wait;
	
	function cb() {
		var self = this
		
		function throttler() {
			wait = null;
			$(self).each(fun);
		};
	
		if (!throttle && wait) { clearTimeout(wait); }
		if (!throttle || !wait) { wait = setTimeout(throttler, timeout); }
	}
	
	return this.bind(type, cb);
}
})(jQuery);




and here's the suggested fix. please test it yourself. 
PS: I don't know how to work with $.extend()

contact me mybodya@gmail.com
*/

(function($) {
$.fn.bindWithDelay = function( type, data, fn, timeout, throttle ) {
	var wait;
	
	if ( $.isFunction( data ) ) {
		throttle = timeout;
		timeout = fn;
		fn = data;
		data = undefined;
	}
	
	function cb() {
//		var e = $.extend(true, { }, arguments[0]);
		var that = this;

		function throttler() {
			wait = null;
			that.each(fn);
		};
		
		if (!throttle && wait) { clearTimeout(wait); }
		if (!throttle || !wait) { wait = setTimeout(throttler, timeout); }
	}
	
	return this.bind(type, data, cb);
}
})(jQuery);
