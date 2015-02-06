/**
 * @file list 组件
 * @author wanghongliang02
 */

$.widget('blend.list', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        delete: true,
        animate: true,
        itemSelector: '.' + NAMESPACE + 'list-item',
        animateClass: NAMESPACE + 'list-animation',
        itemContentSelector: '.' + NAMESPACE + 'list-item-content',
        itemDeleteActiveClass: NAMESPACE + 'list-item-delete-active',
        exceptionClass: false
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
        if (!list.options.delete) {
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
        var $items = list.element.find(list.options.itemSelector);
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
                $this.find(list.options.itemContentSelector).css('left', list.deleteWidth);
            });
        });
        if (!list.eventInit) {
            list.eventInit = true;
            list.element.on('click.list', '.' + list.deleteBtnClass, function (e) {
                var $parent = $(this).closest(list.options.itemSelector);
                list.tempIndex = $parent.index();
                $parent.data('height', $parent.height());
                $parent.height(0);
                setTimeout(function () {
                    list.$tempEl = $parent.detach();
                    list.$tempEl.removeClass(list.options.itemDeleteActiveClass);
                    list.$tempEl.find(list.options.itemContentSelector).css('left', 0);
                }, list.options.animate ? 500 : 0);
            });
            // 未点击删除时的恢复
            list.element.on('touchstart.list', function (e) {
                var $target = $(e.target);
                var className = list.deleteBtnClass;
                if (!$target.hasClass(className) && list.element.find('.' + list.options.itemDeleteActiveClass).length === 1) {
                    var $el = list.element.find('.' + list.options.itemDeleteActiveClass);
                    if ($el.length === 1) {
                        $el.removeClass(list.options.itemDeleteActiveClass);
                        $el.find(list.options.itemContentSelector).css('left', 0);
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
        var $items = list.element.find(list.options.itemSelector);
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
        var $lastItem = list.element.find(list.options.itemSelector).eq(list.tempIndex);
        if ($lastItem.length === 1) {
            list.$tempEl.insertBefore($lastItem).height(height);
        }
        else {
            list.$tempEl.appendTo(list.element).height(height);
        }
    }

});
