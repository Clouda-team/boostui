/* globals NAMESPACE */
/**
 * @function loading
 * @file loading.js
 * @name loading
 * @author wangzhonghua
 * @date 2015.02.05
 * @memberof $.fn or $.blend
 * @grammar  $('.test').loading().show(),$.blend.loading().show()
 * @desc 页面级loading
 * @param {Object} opts 组件配置（以下参数为配置项）
 * @param {String} opts.loadingClass (可选, 默认值:\'\') loading节点的className
 * @param {String} opts.loadingHtml (可选, 默认值:\'\') loading节点
 *
 * @example
 * 	1、$('.j_test_loading').loading(), $('.j_test_loading')为loading自定义节点,并不是容器,切记
 * 	2、var loading = $.blend.loading({
 * 						loadingClass: 'my_define'
 * 					});
 * 		  loading.show();
 *  3、var loading = $.blend.loading({
 * 						loadingHtml: '<div class="my_define">loading...</div>'
 * 					});
 * 		  loading.show();
 */
'use strict';
$.widget('blend.loading', {
	/*配置项*/
    options: {
        loadingClass: '',
        loadingImgClass:'blend-loading-default',
        loadingHtml: '',
        loadingImg: '',
        loadingWord: '正在载入...'
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;
        this.$el = this.element;
        this.$body = $('body');
        
        this.loadingHtml = options.loadingHtml || '<div data-' + NAMESPACE + 'widget="loading" class="' + NAMESPACE + 'loading '+ (options.loadingClass || '') + '"><div class="' + options.loadingImgClass + '"></div><p class="' + NAMESPACE + 'loading-word">' + options.loadingWord + '</p></div>';
        console.log(this.loadingHtml);
    },
    /**
     * 组件初始化
     * @private
     */
    _init: function () {
        if (this.$el.length) {
            this.show();
        }
        else {
            this.defaultSegment = true;
        }
    },
    /**
     * 显示dialog
     * @private
     * @return {Object} 当前Zepto对象
     */
    show: function () {
        if (!this.$el.length) {
            (this.$el = $(this.loadingHtml)).appendTo(this.$body);
        }
        return this.$el.show();
    },
    /**
     * 关闭loading
     * @private
     * @return {Object} 当前Zepto对象
     */
    hide: function () {
        return this.$el.hide();
    },
    /**
     * 销毁toast
     * @private
     * @return {Object} 当前Zepto对象
     */
    destroy: function () {
        if (this.defaultSegment) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    }
});
