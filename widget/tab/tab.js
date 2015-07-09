/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file tab 组件
 * @author wanghongliang02
 */

$.widget('blend.tab', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        start: 0,
        animate: true,
        activeClass: NAMESPACE + 'tab-header-item-active',
        animateClass: NAMESPACE + 'tab-animation'
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        var tab = this;
        var $el = this.element;
        tab._itemSelector = '.' + NAMESPACE + 'tab-header-item';
        tab._itemContentSelector = '.' + NAMESPACE + 'tab-content-item';
        tab._itemActiveSelector = '.' + NAMESPACE + 'tab-header-active';
        tab.$headerItem = $el.find(tab._itemSelector);
        tab.$contentItem = $el.find(tab._itemContentSelector);
        tab.$activeEle = $el.find(tab._itemActiveSelector);
        // 计算active宽度和位置
        tab.itemWidth = tab.$headerItem.eq(0).width();
        $el.removeClass(tab.options.animateClass);

        if (tab.itemWidth){
            tab.$activeEle.css('width', tab.itemWidth);
            setTimeout(function (){
                $el.addClass(tab.options.animateClass);
            }, 100);
        }else{
            var tabTimer = setInterval(function (){
                tab.itemWidth = tab.$headerItem.eq(0).width();
                if (tab.itemWidth){
                    clearInterval(tabTimer);
                    tab.$activeEle.css('width', tab.itemWidth);
                    setTimeout(function (){
                        $el.addClass(tab.options.animateClass);
                    }, 100);
                }
            }, 100);
        }
        
        tab.itemOffsetX = 0;
        tab.current = 0;
        this._uix = null;
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () { 
        FastClick.attach(this.element[0]);
          if (IS_UIX) {
            this._UIXInit();
          } else {
            this._webInit();
          }
    },
    /**
     * uix版的初始化
     * @private
     */
    _UIXInit : function () {
        var me = this;
        if (this._uix !== null) {
            this._uix.destroy();
        }
        $.dynamicLoad (function() {
            require(['src/blend'], function (blend) {
                me._uix = me._initUIXComponent(blend);
            });
        });
    },
    /**
     * 创建UIX的实例
     * @private
     */
     _initUIXComponent : function (blend) {
        var uixTab,
            me = this, 
            $el = this.element,
            $tabItem = $el.find(this._itemSelector);
            /*创建一个UIXtab*/
            uixTab = blend.create('tab', {
                 "id": "tab",
                 "items":[]
            });
            $tabItem.each(me._generateItem(function (item) {
                uixTab.append(item);
                uixTab.render();
            },uixTab));
            return uixTab;
     },
    /**
     * 生成uix的tab的item
     * @private
     */
    _generateItem : function (callback, uixTab) {
        return function (index, _item) {
            var $item = $(_item),
                blendItem,
                itemConf ={
                    text : $item.text(),
                    href : $item.data('href')
                },
                itemTab;
            itemTab = uixTab.create(itemConf);
            callback(itemTab);
        };
    },
   /**
     * web版的初始化
     * @private
     */
    _webInit: function () {
        var tab = this;

        tab._checkStart();
        if (!tab.inited) {
            tab._initEvent();
            tab.inited = true;
        }
        tab._switch(tab.options.start);

        if (tab.options.animate && tab.$headerItem.eq(0).width() > 0) {
            // 初始化的时候不出动画
            setTimeout(function () {
                tab.element.addClass(tab.options.animateClass);
            }, 0);
        }
        else {
            tab.element.removeClass(tab.options.animateClass);
        }


    },
    /**
     * 验证初始化的start参数
     * @private
     */
    _checkStart: function () {
        var tab = this;
        var lenth = tab.$headerItem.length;
        tab.options.start = parseInt(tab.options.start, 10);
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
        tab.$headerItem.on('click.tab', function (e) {
            var index = $(this).index();
            tab._switch(index);
        });
    },
    /**
     * tab切换
     * @param {number} index 要切换到tab序号。
     * @private
     */
    _switch: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            tab.current = tab.options.start;
        }
        else {
            tab.current = index;
        }

        var left = tab.itemOffsetX + tab.current * tab.itemWidth;
        tab.$activeEle.css({'transform': "translateX(" + left + "px)", '-webkit-transform': "translateX(" + left + "px)"});
        //tab.$activeEle.css('left', left);
        tab.$contentItem.hide();
        tab.$contentItem.eq(tab.current).show();
        tab.$headerItem.removeClass(tab.options.activeClass);
        tab.$headerItem.eq(tab.current).addClass(tab.options.activeClass);
    },
    /**
     * 销毁tab对象
     * @private
     */
    _destroy: function () {
        var tab = this;
        tab.$headerItem.off('click.tab');
    },

    /**
     * 切换到某个tab,获取当前的tab
     * @param {number=} index 切换的tab序号
     * @return {current|*|number} 当前tab序号或者不返回
     */
    active: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            return tab.current;
        }
        this._switch(index);
    }

});
