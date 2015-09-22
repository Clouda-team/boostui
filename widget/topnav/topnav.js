/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * 顶部二级导航
 * @file topnav.js
 * @author dingquan@baidu.com
 */

$.widget('blend.topnav', {
    /**
     * 配置信息
     */
    options: {
        defaultIcon: true
    },
    /**
     * 创建组件
     * @private
     */
    _create: function () {

    },
    /**
     * 初始化组件
     * @private
     */
    _init: function () {

        FastClick.attach(this.element[0]);
        var opt = this.options;
        this.$el = this.element;

        this.defaultIcon = opt.defaultIcon;

        this._initUI();
        this._bindEvent();
    },
    /**
     * 初始化UI, 增加相应的class
     * @private
     */
    _initUI: function () {
        var contentHTML = this.$el.html();

        // 外层增加wrapper
        var $wrapper = $('<div class="' + NAMESPACE + 'topnav-wrapper"></div>');
        $wrapper.html(contentHTML);

        this.$el.empty().append($wrapper);

        var $items = this.$items = this.$el.find('.' + NAMESPACE + 'topnav-item');

        if (this.defaultIcon) {
            for (var i = 0, len = $items.length; i < len; i++) {
                var item = $items[i];

                if (item.getElementsByTagName('ul').length > 0) {
                    $(item).find('span').addClass(NAMESPACE + 'topnav-arrow')
                    .addClass(NAMESPACE + 'topnav-downarrow');
                }
            }
        }
        /**
         * show 整个nav
         */
        this.$el.show();

    },
    /**
     * 导航相关事件绑定
     * @private
     */
    _bindEvent: function () {

        var $items = this.$items;

        for (var i = 0, len = $items.length; i < len; i++) {
            var $item = $items.eq(i);

            $item.on('click', function (e) {
                var $this = $(this);
                var $ul = $(this).find('ul');
                var $span = $(this).find('span');
                var isActive = $(this).hasClass(NAMESPACE + 'topnav-active') ? true : false;

                $items.not(i).removeClass(NAMESPACE + 'topnav-active');
                $items.not(i).find('ul').hide();
                $items.not(i).find('span').removeClass(NAMESPACE + 'topnav-uparrow')
                .addClass(NAMESPACE + 'topnav-downarrow');

                if (isActive) {
                    $this.removeClass(NAMESPACE + 'topnav-active');
                    $ul.hide();
                    $span.removeClass(NAMESPACE + 'topnav-uparrow').addClass(NAMESPACE + 'topnav-downarrow');
                }
                else {
                    $this.addClass(NAMESPACE + 'topnav-active');
                    $ul.show();
                    $span.removeClass(NAMESPACE + 'topnav-downarrow').addClass(NAMESPACE + 'topnav-uparrow');
                }

            });
        }
    }

});
