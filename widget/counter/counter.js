/* globals NAMESPACE */
/**
 * counter 组件
 * @file counter.js
 * @author zhangyuanwei
 */
'use strict';
$.widget('blend.counter', {

    /**
     * 组件的默认选项，可以由多从覆盖关系
     */
    options: {
        minusSelector: '.' + NAMESPACE + 'counter-minus',
        plusSelector: '.' + NAMESPACE + 'counter-plus',
        inputSelector: '.' + NAMESPACE + 'counter-input',
        minValue: 0,
        maxValue: Infinity,
        disableClass: NAMESPACE + 'disabled',
        step: 1,
        asyn: false // true/false

    },

    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {

        /**
         * this 对象为一个 组件 实例
         * 不是 Zepto/jQuery 对象
         * 也不是 Dom 对象
         */

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $el = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;

        /**
         * 建议: Zepto/jQuery 对象变量名前加 $
         */
        this.$minus = $el.find(options.minusSelector); // !!!选择器选择的时候需要指定范围!!!
        this.$plus = $el.find(options.plusSelector);
        this.$input = $el.find(options.inputSelector);
    },

    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {
        FastClick.attach(this.element[0]);
        var options = this.options;
        var minValue = Number(options.minValue);
        var maxValue = Number(options.maxValue);

        this._minValue = isNaN(minValue) ? 0 : minValue;
        this._maxValue = isNaN(maxValue) ? Infinity : maxValue;

        this._initValue();
        this._initEvent();

    },

    /**
     * _initValue 自定义的成员函数，
     * 所有以下划线开头的函数不可在外部调用
     * @private
     */
    _initValue: function () {
        // var initValue = Number(this.$input.val());
        // this._value = isNaN(initValue) ? 0 : initValue;
        var value = Number(this.$input.val());
        if (isNaN(value)) {
            return;
        }
        if (this._maxValue <= this._minValue) {
            this.$minus.addClass(this.options.disableClass);
            this.$plus.addClass(this.options.disableClass);
        }
        else {
            this.$minus.toggleClass(this.options.disableClass, value <= this._minValue);
            this.$plus.toggleClass(this.options.disableClass, value >= this._maxValue);
        }
        value = Math.min(this._maxValue, Math.max(this._minValue, value));
        this.$input.val(value);
        this._value = value;
    },

    /**
     * 初始化控件事件
     * @private
     */
    _initEvent: function () {
        var thisObj = this;
        var step = Number(this.options.step);
        step = isNaN(step) ? 1 : step;

        this.$plus.on('click', function () {
            thisObj.value(thisObj._value + step);
        });
        this.$minus.on('click', function () {
            thisObj.value(thisObj._value - step);
        });
        this.$input.on('blur', function () {
            thisObj.value(Number(thisObj.$input.val()) || thisObj._value);
        });
    },

    /**
     * value 自定义的成员方法,
     * 没有返回值或者返回值为 undefined 时会保持调用链，
     * 如果返回值不为 undefined 则将该值返回，不能再次链式调用
     *
     * @param {number} n 设置value值
     * @return {undefined}
     */
    value: function (n) {
        var value;
        var oldValue;
        var eventData;

        if (arguments.length > 0) {
            value = Number(n);
            if (isNaN(value)) {
                return;
            }
            if (this._maxValue <= this._minValue) {
                this.$minus.addClass(this.options.disableClass);
                this.$plus.addClass(this.options.disableClass);
            }
            else {
                this.$minus.toggleClass(this.options.disableClass, value <= this._minValue);
                this.$plus.toggleClass(this.options.disableClass, value >= this._maxValue);
            }
            value = Math.min(this._maxValue, Math.max(this._minValue, value));
            oldValue = this._value;

            if (oldValue === value) {
                return;
            }

            eventData = {
                oldValue: oldValue,
                newValue: value
            };

            if (this.options.asyn) {
                var counter = this;
                var updateData = {
                    oldValue: oldValue,
                    newValue: value
                };
                eventData.callback = function () {
                    counter.$input.val(value);
                    counter._value = value;
                    counter._trigger('update', null, updateData);
                };
                this._trigger('beforeupdate', null, eventData);
            }
            else {

                /**
                 * this._trigger 派发自定义事件
                 * 使用 jQuery/Zepto 的事件机制
                 * 监听时需要加上模块名
                 * eg: $("xx").navbar().on("navbar:xxx", function(){
                 *    // 可以通过 return false 影响程序执行
                 *    return false;
                 * });
                 */
                if (this._trigger('beforeupdate', null, eventData)) {
                    this.$input.val(value);
                    this._value = value;
                    this._trigger('update', null, eventData);
                }
            }

        }
        else {
            return this._value;
        }
    }

});
