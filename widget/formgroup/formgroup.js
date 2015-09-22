/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file formgroup 组件
 * @author wanghongliang02
 */

$.widget('blend.formgroup', {
    /**
     * 组件的默认选项
     */
    options: {
        labelClass: NAMESPACE + 'formgroup-label',
        inputClass: NAMESPACE + 'formgroup-input',
        // selectClass: NAMESPACE + 'formgroup-select',
        btnClass: NAMESPACE + 'formgroup-btn',
        errorClass: NAMESPACE + 'formgroup-error',
        validate: false,  // false/blur/true,
        /**
         * custon validate function
         * @param {string} msg error msg
         * @param {Object} $ele element
         * @param {Function} cb callback function
         * @return {boolean|string}
         */
        validateFunction: function (msg, $ele, cb) {
            return true;
        },
        asyn: false  // true/false
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        var formgroup = this;
        var validate = formgroup.options.validate;
        var events = false;
        // 预留其他事件接口(input/paste...)
        switch (validate) {
            case true:
                events = 'blur';
                break;
            case 'blur':
                events = 'blur';
                break;
            default :
                validate = false;
        }
        formgroup.events = events;
        if (!$.isFunction(formgroup.options.validateFunction)) {
            formgroup.options.validateFunction = function () {
            };
        }
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var formgroup = this;
        var $el = formgroup.element;
        formgroup.$inputItem = $el.find('.' + formgroup.options.inputClass);
        if (formgroup.options.validate && formgroup.events) {
            formgroup._initEvent();
        }
    },
    /**
     * 初始化事件
     * @private
     */
    _initEvent: function () {
        var formgroup = this;
        formgroup.$inputItem.on('focus.formgroup', function (e) {
            var $me = $(this);
            formgroup._removeError();
        });
        formgroup.$inputItem.on(formgroup.events + '.formgroup', function (e) {
            var $me = $(this);
            var value = $me.val();
            if (formgroup.options.validate) {
                formgroup._validate(value, $me);
            }
        });
    },
    /**
     * remove error class
     * @private
     */
    _removeError: function () {
        var formgroup = this;
        formgroup.element.removeClass(formgroup.options.errorClass);
    },
    /**
     * show error
     * @param {string} msg error tips
     * @private
     */
    _showError: function (msg) {
        var formgroup = this;
        formgroup.element.addClass(formgroup.options.errorClass);
        // TODO error tip
        var toast = $[NAMESPACE.substr(0, NAMESPACE.length - 1)].toast();
        toast.show(msg, 1000);
    },
    /**
     *
     * @param {string} value input value
     * @param {Object} $ele element
     * @private
     */
    _validate: function (value, $ele) {
        var formgroup = this;
        if (formgroup.options.asyn === true) {
            formgroup.options.validateFunction(value, $ele, function (ret) {
                if (ret && typeof ret === 'string') {
                    formgroup._showError(ret);
                }
            });
        }
        else {
            var ret = formgroup.options.validateFunction(value, $ele);
            if (ret && typeof ret === 'string') {
                formgroup._showError(ret);
            }
        }
    },
    /**
     * 更新或者获取当前表单项的值
     * @param {string} value 欲更新或者获取当前表单项的值
     * @return {mix}
     * @private
     */
    _value: function (value) {
        var formgroup = this;
        if (typeof value === 'undefined') {
            return formgroup.$inputItem.val();
        }
        formgroup.$inputItem.val(value);
    },
    /**
     * 销毁formgroup对象
     * @private
     */
    _destroy: function () {
        var formgroup = this;
        if (formgroup.options.validate && formgroup.events) {
            formgroup.$inputItem.off(formgroup.events + '.formgroup');
            formgroup.$inputItem.off('focus.formgroup');
        }
    },
    /**
     * 更新或者获取当前表单项的值
     * @param {string} value 欲更新或者获取当前表单项的值
     * @return {mix}
     * @private
     */
    value: function (value) {
        return this._value(value);
    }

});
