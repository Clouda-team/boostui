/* globals NAMESPACE */
/* globals Hammer */
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
        $items.each(function () {
            var $this = $(this);
            var hammer = $this.data('hammer');
            if (!hammer) {
                hammer = new Hammer(this);
            }
            $this.data('hammer', hammer);
            if ($this.hasClass(list.options.exceptionClass)) {
                return;
            }
            hammer.on('swipeleft', function (ev) {
                if ($this.find('.' + list.deleteBtnClass).length === 0) {
                    $this.parent().append('<span class="' + list.deleteBtnClass + '">删除</span>');
                }
                $this.addClass(list.options.itemDeleteActiveClass);
                $this.find('.' + list.options.itemContentClass).css('left', list.deleteWidth);
            });
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
        var $items = list.element.find('.' + list.options.itemClass);
        $items.each(function () {
            var hammer = $(this).data('hammer');
            if (hammer) {
                hammer.off('swipeleft');
            }
        });
        list.eventInit = false;
        list.element.off('click.list', '.' + list.deleteBtnClass);
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
    }

});
