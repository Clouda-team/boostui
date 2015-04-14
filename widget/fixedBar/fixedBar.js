/**
 * fixedBar
 * @file fixedBar.js
 * @author wangzhonghua
 * @date 2015.02.05
 * @memberof $.fn or $.blend
 * 	$.boost.fixedBar()
 */
'use strict';
$.widget('blend.fixedBar', {
    /**
     * 初始化组件
     * @private
     */
    _init: function () {
        // 此处是解决某些浏览器，如uc，横竖屏切换时，由于地址栏的显隐现象，导致的fixedBar不能落底的问题。
        $(window).on('resize orientationchange', function () {
            window.scrollBy(0, 0);
        });
    }
});