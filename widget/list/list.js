/**
 * list 组件
 * Created by wanghongliang02 on 15-1-29.
 */


$.widget("boost.list", {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        delete: true,
        animate: true,
        //禁止删除的selector
        exception: false
    },
    /**
     * _create 创建组件时调用一次
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
        var $ele = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;

        /**
         * 建议: Zepto/jQuery 对象变量名前加 $
         */
        this.itemSelector = '.boostlist-item';
        this.itemContentSelector = '.boostlist-item-content';
        this.itemDeleteActiveSelector = '.boostlist-item-delete-active';
        this.animateClass = 'boostlist-animation';
        this.$item = $ele.find(this.itemSelector);
        this.deleteBtnSelector = '.boostlist-item-delete';
        //保存上一个删除的dom，for revert
        this.$tempEle = null;
        this.tempIndex = null;
        this.deleteWidth = '-54px';
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var list = this;
        if (!list.options.delete) {
            if (list.inited) {
                this._destroy();
            }
            return;
        }
        if (list.options.animate) {
            list.element.addClass(this.animateClass);
        } else {
            list.element.removeClass(this.animateClass);
        }
        if (!list.inited) {
            this._initEvent();
            this.inited = true;
        }
    },
    /**
     *
     * @private
     */
    _initEvent: function() {
        var list = this;

        var $items = list.element.find(list.itemSelector);
        $items.each(function() {
            var $this = $(this);
            var hammer = new Hammer(this);
            $this.data('hammer', hammer);

            hammer.on('swipeleft', function(ev) {
                if ($this.find(list.deleteBtnSelector).length === 0) {
                    $this.parent().append('<span class="' + list.deleteBtnSelector.substr(1) + '">删除</span>');
                }
                $this.addClass(list.itemDeleteActiveSelector.substr(1));
                $this.find(list.itemContentSelector).css('left', list.deleteWidth);
            });
        });

        list.element.on('click', list.deleteBtnSelector, function(e) {
            var $parent = $(this).closest(list.itemSelector);
            list.tempIndex = $parent.index();
            $parent.data('height', $parent.height());
            $parent.height(0);
            setTimeout(function() {
                list.$tempEle = $parent.detach();
                list.$tempEle.removeClass(list.itemDeleteActiveSelector.substr(1));
                list.$tempEle.find(list.itemContentSelector).css('left', 0);
            }, list.options.animate ? 500 : 0);

        });
        //全局监听，未点击删除时的恢复
        $('body').on('touchstart', function(e) {
            var $target = $(e.target);
            var className = list.deleteBtnSelector.substr(1);
            if (!$target.hasClass(className) && list.element.find(list.itemDeleteActiveSelector).length === 1) {
                list._hideDelete();
            }
        });
    },
    _hideDelete: function() {
        var list = this;
        var $ele = list.element.find(list.itemDeleteActiveSelector);
        if ($ele.length === 1) {
            $ele.removeClass(list.itemDeleteActiveSelector.substr(1));
            $ele.find(list.itemContentSelector).css('left', 0);
        }
    },
    /**
     *  * _destroy 自定义的成员函数，
     * destroy the swipe event
     * 所有以下划线开头的函数不可在外部调用
     * @private
     */
    _destroy: function () {
        var list = this;
        var $items = list.element.find(list.itemSelector);
        list.inited = false;
        $items.each(function() {
            var hammer = $(this).data('hammer');
            hammer.off('swipeleft');
        });

    },
    /**
     * 取消一个列表的滑动删除效果
     */
    destroy: function() {
        this._destroy();
    },
    /**
     * 用于删除失败时的恢复
     */
    revert: function() {
        var list = this;
        if (list.tempIndex === null || list.tempIndex === -1) {
            return;
        }
        var height = list.$tempEle.data('height');
        var $lastItem = list.element.find(this.itemSelector).eq(list.tempIndex);
        if ($lastItem.length === 1) {
            list.$tempEle.insertBefore($lastItem).height(height);
        } else {
            list.$tempEle.appendTo(list.element).height(height);
        }
    }

});
