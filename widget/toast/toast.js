/* globals NAMESPACE */
/**
 * @file toast.js
 * @name toast
 * @author wangzhonghua
 * @date 2015.02.05
 */
'use strict';
$.widget('blend.toast', {
    /*配置项*/
    options: {
        toastClass: '',
        toastTpl: '',
        delay: 2500
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;
        this.$el = this.element;
        this.$body = $('body');
        this.toastTpl = options.toastTpl || '<div data-' + NAMESPACE + 'widget="toast" class="'
        + (options.toastClass || '') + ' ' + NAMESPACE + 'toast">{%content%}</div>';
    },
    /**
     * 初始化组件调用
     * @private
     */
    _init: function () {
        !this.$el.length && (this.defaultSegment = true);
    },
    /**
     * 设置延时消失
     * @param {number} delay 设置延时的时间
     * @private
     */
    _setDelay: function (delay) {
        var self = this;
        delay = parseInt(delay, 10) || this.options.delay;
        clearTimeout(this.timeout);
        this.timeOut = window.setTimeout(function () {
            self.hide();
        }, delay);
    },
    /**
     * 显示toast
     * @param  {string} content 需要展示的内容
     * @param  {number} delay 延时的时间
     * @return {Object} 当前Zepto对象
     */
    show: function (content, delay) {
        if (!content) {
            return false;
        }
        if (!this.$el.length) {
            (this.$el = $(this.toastTpl.replace(/{%content%}/g, content))).appendTo(this.$body);
        }
        else {
            this.$el.html(content);
        }
        this._setDelay(delay);
        return this.$el.show();
    },
    /**
     * 关闭toast
     * @return {Object} 当前Zepto对象
     */
    hide: function () {
        return this.$el.hide();
    },
    /**
     * 销毁toast
     * @return {[type]}
     */
    destroy: function () {
        if (this.defaultSegment) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    }
});
