/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file checkbox 组件
 * @author dingquan
 */

'use strict';

$.widget('blend.checkbox', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        itemSelector: '.' + NAMESPACE + 'checkbox',
        itemLabel: NAMESPACE + 'checkbox-label',
        type: 'group',
        itemSelected: NAMESPACE + 'checkbox-checked',
        itemSelectAll: NAMESPACE + 'checkbox-all'
    },
    _create: function () {

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $this = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;


        this.$group = $this.find(options.itemSelector); //
        this.$label = $this.find('.' + options.itemLabel);
        this.$container = $this;

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        FastClick.attach(this.element[0]);
        this._initEvent();
    },
    _checkGroup: function (curElem) {

        var that = this;
        var EventSelected = that.$container.find('.' + that.options.itemSelected);
        var EventSelector = that.$container.find(that.options.itemSelector);

        var eventData = {
            checked: 0
        };

        if (that.options.type === 'radio') {
            EventSelected.removeClass(that.options.itemSelected);
            curElem.addClass(that.options.itemSelected);
            eventData.checked++;
        }
        else {

            var len = 0;
            // 判断有无已勾选
            EventSelector.each(function () {
                var $this = $(this);
                if (!$this.hasClass(that.options.itemSelectAll)) {
                    len++;
                    if ($this.hasClass(that.options.itemSelected)) {
                        eventData.checked++;
                    }
                }
            });

            if (curElem.hasClass(that.options.itemSelectAll)) {
                if (eventData.checked < len) {
                    EventSelector.each(function () {
                        $(this).addClass(that.options.itemSelected);
                    });
                    eventData.checked = len;
                }
                else {
                    EventSelected.removeClass(that.options.itemSelected);
                    eventData.checked = 0;
                }
            }
            else {

                if (curElem.hasClass(that.options.itemSelected)) {
                    curElem.removeClass(that.options.itemSelected);
                    eventData.checked--;
                }
                else {
                    curElem.addClass(that.options.itemSelected);
                    eventData.checked++;
                }

            }
            if (eventData.checked < len) {
                that.$container.find('.' + that.options.itemSelectAll).removeClass(that.options.itemSelected);
            }
            else {
                that.$container.find('.' + that.options.itemSelectAll).addClass(that.options.itemSelected);
            }
        }
        that._trigger('checked', null, eventData);
    },
    _initEvent: function () {

        var that = this;
        
        this.$group.on('click', function () {
            if (that._trigger('beforechecked', null, {})) {
                var curElem = $(this);
                that._checkGroup(curElem);
            }
        });
        this.$label.on('click', function () {
            if (that._trigger('beforechecked', null, {})) {
                var curElem = that.$group.eq([that.$label.index($(this))]);
                that._checkGroup(curElem);
            }
        });
    },
    /**
     *
     * @return {*}
     * 获取value值函数
     */
    getValues: function () {
        var $this;
        var valArr = [];
        var val;
        var elems = this.$group;
        for (var i = 0; i < elems.length; i++) {
            $this = $(elems[i]);
            if ($this.hasClass(NAMESPACE + 'checkbox-checked') || $this.hasClass(NAMESPACE + 'button-checkbox-checked') && !$this.hasClass(NAMESPACE + 'checkbox-all')) {
                val = this.options.values[i];
                valArr.push(this.options.values[i]);
            }
        }
        if (this.options.type === 'radio') {
            return val;
        }
        return valArr;
    }
});
