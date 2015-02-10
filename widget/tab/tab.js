/**
 * tab 组件
 * Created by wanghongliang02 on 15-1-29.
 */


$.widget("blend.tab", {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        start: 0,
        animate: true,
        animateClass: NAMESPACE + 'tab-animation'
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function() {
        var tab = this;
        var $el = this.element;
        tab.itemSelector = '.' + NAMESPACE + 'tab-header-item';
        tab.itemContentSelector = '.' + NAMESPACE + 'tab-content-item';
        tab.itemActiveSelector = '.' + NAMESPACE + 'tab-header-active';
        tab.$headerItem = $el.find(tab.itemSelector);
        tab.$contentItem = $el.find(tab.itemContentSelector);
        tab.$activeEle = $el.find(tab.itemActiveSelector);
        //计算active宽度和位置
        tab.itemWidth = this.$headerItem.eq(0).width();
        tab.$activeEle.css('width', this.itemWidth * .7);
        tab.itemOffsetX = this.itemWidth * .15;
        tab.current = 0;

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function() {
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
                tab.element.addClass(tab.options.animateClass);
            }, 0);
        } else {
            tab.element.removeClass(tab.options.animateClass);
        }

    },
    /**
     * 验证初始化的start参数
     * @private
     */
    _checkStart: function() {
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
    _initEvent: function() {
        var tab = this;
        tab.$headerItem.on('click.tab', function(e) {
            var index = $(this).index();
            tab._switch(index);
        });
    },
    /**
     * tab切换
     * @param index
     * @private
     */
    _switch: function(index) {
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
     * 销毁tab对象
     * @private
     */
    _destroy: function() {
        var tab = this;
        tab.$headerItem.off('click.tab');
    },

    /**
     * 切换到某个tab,获取当前的tab
     * @param index
     */
    active: function(index) {
        var tab = this;
        if (arguments.length === 0) {
            return tab.current;
        }
        this._switch(index);
    }

});
