/**
 * @function fullcolumn
 * @file  fullcolumn.js
 * @name fullcolumn
 * @author cuixuecheng
 * @date 2015.04.07
 * @memberof $.fn or $.blend
 * 	$.boost.fullcolumn()
 */
'use strict';
$.widget('blend.fullcolumn', {
    /**
     * 组件初始化
     * @private
     */
    _init: function () {
        // 此处是解决某些浏览器，如uc，横竖屏切换时，由于地址栏的显隐现象，导致的fullcolumn不能落底的问题。
        $(window).on('resize orientationchange', function () {
            window.scrollBy(0, 0);
        });
    }
});