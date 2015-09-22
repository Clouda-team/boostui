/* globals NAMESPACE */
/**
 * @function suspend
 * @name suspend
 * @param {Object} options 组件配置（以下参数为配置项）
 * @param {String} options.addCSSClass (可选, 默认值: \'\') dialog最外层自定义class
 * @param {String} options.maskTapClose (可选, 默认值: false) mask被点击后是否关闭dialog
 * @example
 *  1、$('.suspend').suspend(), $('.suspend')为dialog自定义节点,并不是dialog的容器,切记
 *  2、var suspend = $.blend.suspend({
 *                      addCSSClass: '',
 *                      maskTapClose: true,
 *                  });
 *        suspend.show();
 */
'use strict';
$.widget('blend.suspend', {
    /*配置项*/
    options: {
        maskTapClose: true,    // 点击mask，关闭suspend
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;

        this.addCSSClass = options.addCSSClass ? options.addCSSClass : '';
        this.maskTapClose = options.maskTapClose;
        this.$el = this.element;
    },
    /**
     * 初始化
     * @private
     */
    _init: function () {
        this._bindEvent();
    },
    /**
     * 为suspend相关元素添加事件
     * @private
     */
    _bindEvent: function () {
        var self = this;

        this.$el.on('click', '.' + NAMESPACE + 'suspend-close', function () {
            self.hide();
        });
    },
    /**
     * 定义事件派发
     * @param {Object} event 事件对象
     * @private
     */
    _trigger: function (event) {
        this.$el.trigger('suspend:' + event);
    },
    /**
     * 显示suspend
     * @param {string} content 指定show方法要展示的body内容
     * @return {Object}
     */
    show: function () {
        var self = this;
        this.mask();
        window.setTimeout(function () {
            self.$el.find(".blend-suspend-content").addClass(NAMESPACE + 'suspend-show');
        }, 50);
        return this.$el;
    },
    /**
     * 关闭dialog
     * @return {Object}
     */
    hide: function () {
        var self = this;
        window.setTimeout(function () {
            self.unmask();
        }, 50);
        return this.$el.find(".blend-suspend-content").removeClass(NAMESPACE + 'suspend-show');
    },
    /**
     * 销毁dialog
     * @return {Object}
     */
    destroy: function () {
        this.unmask();
        if (this.$el) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    },
    /**
     * 显示mask
     * @param {number} opacity 透明度
     */
    mask: function () {
        var self = this;
        this._maskDom = $('.' + NAMESPACE + 'suspend-mask');
        this._maskDom.show();
        this._maskDom.on('click', function (e) {
            e.preventDefault();
            self.maskTapClose && self.hide();
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
        /*this.$el.css({
            '-webkit-transform':'translate3d(0,100%,0)',
            'transform':'translate3d(0,100%,0)'
        });*/
    },
    /**
     * 关闭mask
     */
    unmask: function () {
        this._maskDom.off('touchstart touchmove').hide();
        /*this.$el.css({
            '-webkit-transition': 'none',
            'transition': 'none'
        });*/
    }
});
