/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file list 组件
 * @author wanghongliang02
 */

$.widget('blend.list', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        del: true,  // 删除的开关
        animate: true,  // 动画的开关
        itemClass: NAMESPACE + 'list-item',     // 滑动的element的class
        animateClass: NAMESPACE + 'list-animation', // 动画实现的class
        itemContentClass: NAMESPACE + 'list-item-content',  // 列表主体element的class
        itemDeleteActiveClass: NAMESPACE + 'list-item-delete-active',   // 列表删除激活时的class
        asyn: false,    // 删除的异步模式开关
        exceptionElement: false // 不删除的元素, 填写css的class
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        // 保存上一个删除的dom，for revert
        this.$tempEl = null;
        this.tempIndex = null;
        this.deleteWidth = '-54px';
        this.deleteBtnClass = NAMESPACE + 'list-item-delete';
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var list = this;
        FastClick.attach(list.element[0]);
        if (!list.options.del) {
            this._destroy();
            return;
        }
        if (list.options.animate) {
            list.element.addClass(list.options.animateClass);
        }
        else {
            list.element.removeClass(list.options.animateClass);
        }
        list._initEvent();
    },
    /**
     * 绑定事件
     * @private
     */
    _initEvent: function () {
        var list = this;
        var $items = list.element.find('.' + list.options.itemClass);
        var device = this._device();
        
        $items.each(function () {
            if (!device.hasTouch) {
                this.style.cursor = 'pointer';
                this.ondragstart = function (evt) {
                    if (evt) {
                        return false;
                    }
                    return true;
                };
            }

            this.addEventListener(device.startEvt, function (evt){
                list._startHandler(evt, this, list);
            }, false);
            this.addEventListener(device.moveEvt, function (evt){
                list._moveHandler(evt, this, list);
            }, false);
            this.addEventListener(device.endEvt, function (evt){
                list._endHandler(evt, this, list);
            }, false);
        });
        if (!list.eventInit) {
            list.eventInit = true;
            list.element.on('click.list', '.' + list.deleteBtnClass, function (e) {
                var $parent = $(this).closest('.' + list.options.itemClass);
                list.tempIndex = $parent.index();
                $parent.data('height', $parent.height());

                var eventData = {};
                eventData.ele = $parent;
                if (list.options.asyn) {
                    eventData.callback = function () {
                        $parent.height(0);
                        setTimeout(function () {
                            list.$tempEl = $parent.detach();
                            list.$tempEl.removeClass(list.options.itemDeleteActiveClass);
                            list.$tempEl.find('.' + list.options.itemContentClass).css('left', 0);
                        }, list.options.animate ? 500 : 0);
                    };
                    list._trigger('beforedelete', null, eventData);
                }
                else {
                    if (list._trigger('beforedelete', null, eventData)) {
                        $parent.height(0);
                        setTimeout(function () {
                            list.$tempEl = $parent.detach();
                            list.$tempEl.removeClass(list.options.itemDeleteActiveClass);
                            list.$tempEl.find('.' + list.options.itemContentClass).css('left', 0);
                        }, list.options.animate ? 500 : 0);
                    }
                }
            });
            // 未点击删除时的恢复
            list.element.on('touchstart.list', function (e) {
                var $target = $(e.target);
                var className = list.deleteBtnClass;
                if (!$target.hasClass(className) &&
                    list.element.find('.' + list.options.itemDeleteActiveClass).length === 1) {
                    var $el = list.element.find('.' + list.options.itemDeleteActiveClass);
                    if ($el.length === 1) {
                        $el.removeClass(list.options.itemDeleteActiveClass);
                        $el.find('.' + list.options.itemContentClass).css('left', 0);
                    }
                }
            });
        }

    },
    /**
     * destroy the swipe event
     * 取消一个列表的滑动删除效果
     * @private
     */
    _destroy: function () {
        var list = this;
        list._startHandler = null;
        list._moveHandler = null;
        list._endHandler = null;

        list.eventInit = false;
        list.element.off('tap.list', '.' + list.deleteBtnClass);
        list.element.off('touchstart.list');
    },
    /**
     * 刷新配置
     */
    refresh: function () {
        this._init();
    },
    /**
     * 用于删除失败时的恢复
     */
    revert: function () {
        var list = this;
        if (list.tempIndex === null || list.tempIndex === -1) {
            return;
        }
        var height = list.$tempEl.data('height');
        var $lastItem = list.element.find('.' + list.options.itemClass).eq(list.tempIndex);
        if ($lastItem.length === 1) {
            list.$tempEl.insertBefore($lastItem).height(height);
        }
        else {
            list.$tempEl.appendTo(list.element).height(height);
        }
    },
    /**
     * judge the device
     * @private
     * @return {Object} 事件
     */
    _device: function () {
        var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
    },
    _startHandler: function (evt, that, list){
        var device = list._device();

        that.startTime = +new Date();
        that.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        that.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
    },
    _moveHandler: function (evt, that, list){
        if (that.startTime === 0){
            return;
        }
        var device = list._device();

        var pageY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
        //判断滑出范围就重置startTime
        if (pageY < that.offsetTop || pageY > (that.offsetTop + that.offsetHeight)){
            that.startTime = 0;
        }
    },
    _endHandler: function (evt, that, list){
        var device = list._device();
        var endTime = +new Date();
         var endX = device.hasTouch ? evt.changedTouches[0].pageX : evt.pageX;
      
        if (that.startTime > 0 && endTime - that.startTime < 400 && that.startX - endX > 50){
            if ($(that).find('.' + list.deleteBtnClass).length === 0) {
                that.parent().append('<span class="' + list.deleteBtnClass + '">删除</span>');
            }
            $(that).addClass(list.options.itemDeleteActiveClass);
            $(that).find('.' + list.options.itemContentClass).css('left', list.deleteWidth);
        }

        that.startTime = 0;
    }

});
