/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file address 组件
 */

$.widget('blend.address', {
    /**
     * 组件的默认选项
     */
    options: {
        btnClass: NAMESPACE + 'address-btn',

    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        this.btnClass = this.options.btnClass;
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var btnItem = this.element.find("." + this.btnClass);
        if (btnItem.length > 0) {
            this._initEvent();
        }
    },
    /**
     * 初始化事件
     * @private
     */
    _initEvent: function () {
        var $el = this.element;
       $el.on('click', '.' + this.btnClass, function () {
            $el.trigger('address:click');
        })
    }
});
