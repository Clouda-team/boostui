/**
     * @function fixedBar
     * @name fixedBar
     * @author wangzhonghua
     * @date 2015.02.05
     * @memberof $.fn or $.blend
     * @example 
     * 	$.boost.fixedBar()
     */
    
'use strict';
$.widget("blend.fixedBar", {
	
    _init: function () {
    	//此处是解决某些浏览器，如uc，横竖屏切换时，由于地址栏的显隐现象，导致的fixedBar不能落底的问题。
		$(window).on('resize orientationchange', function(){
			 window.scrollBy(0,0);
		});
    },
    
});