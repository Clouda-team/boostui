/**
 * tab 组件
 * Created by wanghongliang02 on 15-1-29.
 */


$.widget("boost.tab", {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        start: 0,
        animate: true
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
         * 建议: Zepto/jQuery 对象变量名前加 $
         */
        this.itemSelector = '.boosttab-header-item';
        this.itemContentSelector = '.boosttab-content-item';
        this.itemActiveSelector = '.boosttab-header-active';
        this.animateClass = 'boosttab-animation';
        this.$headerItem = $ele.find(this.itemSelector);
        this.$contentItem = $ele.find(this.itemContentSelector);
        this.$activeEle = $ele.find(this.itemActiveSelector);
        //计算active宽度和位置
        this.itemWidth = this.$headerItem.eq(0).width();
        this.$activeEle.css('width', this.itemWidth * .7);
        this.itemOffsetX = this.itemWidth * .15;
        this.current = 0;

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var tab = this;

        tab._checkStart();
        if (!tab.inited) {
            tab._initEvent();
            tab.inited = true;
        }
        tab._switch(tab.options.start);

        if (tab.options.animate) {
            //初始化的时候不出动画
            setTimeout(function() {
                tab.element.addClass(tab.animateClass);
            }, 0);
        } else {
            tab.element.removeClass(tab.animateClass);
        }

    },
    /**
     * 验证初始化的start参数
     * @private
     */
    _checkStart: function () {
        var tab = this;
        var lenth = tab.$headerItem.length;
        tab.options.start = parseInt(tab.options.start);
        if (tab.options.start < 0 || tab.options.start >= lenth) {
            tab.options.start = 0;
        }
        tab.current = tab.options.start;
    },

    /**
     *
     * @private
     */
    _initEvent: function () {
        var tab = this;
        tab.$headerItem.on('click', function (e) {
            var index = $(this).index();
            tab._switch(index);
        });
    },
    /**
     * tab切换
     * @param index
     * @private
     */
    _switch: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            tab.current = tab.options.start;
        } else {
            tab.current = index;
        }
        var left = tab.itemOffsetX + tab.current * tab.itemWidth;
        tab.$activeEle.css('left', left);
        tab.$contentItem.hide();
        tab.$contentItem.eq(tab.current).show();
    },

    /**
     * 切换到某个tab,获取当前的tab
     * @param index
     */
    active: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            return tab.current;
        }
        this._switch(index);
    }

});
