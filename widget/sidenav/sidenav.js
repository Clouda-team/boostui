/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * 侧边导航组件
 *
 * @file sidenav.js
 * @author dingquan
 */
$.widget('blend.sidenav', {

    options: {
        limit: 44,
        // type: 1 // 类型，1为连续滚动
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
        var opts = this.options;

        this.navId = 'wZijePQW';   // 自定义， 用于建立nav和content一一对应关系

        this.$el = this.element;
        this.limit = opts.limit;
        this.type = opts.type;

        this.navs = this.$el.find('.blend-sidenav-nav li');
        this.contents = this.$el.find('.blend-sidenav-content .blend-sidenav-item');

        this._initSidePosition();   // 初始化side位置
        this._initContent();    // 初始化右侧内容

        this._bindEvent();
    },
    /**
     * 初始化左侧side 位置, 只在页面加载时候执行一次
     * @private
     */
    _initSidePosition: function () {
        var doc = document;
        var originScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
        if (originScrollTop > 0) {
            this.$el.find('.blend-sidenav-nav').css('top', 0);
        }
    },
    /**
     * 初始化右侧显示
     * @private
     */
    _initContent: function () {
        var activeIndex;
        var nav;
        for (var i = 0, len = this.navs.length; i < len; i++) {
            nav = this.navs.eq(i);
            if (nav.hasClass('blend-sidenav-active')) {
                activeIndex = i;
            }
            // 建立导航和内容的对应关系
            nav.data(this.navId, i);
            this.contents.eq(i).data(this.navId, i);
        }
        if (!activeIndex) {
            activeIndex = 0;
            this.navs.eq(0).addClass('blend-sidenav-active');
        }
        if (this.type === 1) {
            this.contents.show();
            return;
        }
        this.contents.hide();
        this.contents.eq(activeIndex).show();

    },
    /**
     * 绑定事件
     * @private
     */
    _bindEvent: function () {
        var doc = document;
        var me = this;
        var $side = this.$el.find('.blend-sidenav-nav');
        var flag = false;
        
        var $nav = this.$el.find('.blend-sidenav-nav ul');
        $nav.on('click', function (e) {
            e.preventDefault();
            $nav.find('li').removeClass('blend-sidenav-active');
            var target = e.target || e.srcElement;
            var nodeName = target.nodeName.toLowerCase();
            var blendId;
            if (nodeName === 'li') {
                blendId = $(target).data(me.navId);
                $(target).addClass('blend-sidenav-active');
                me.contents.hide();
                me.contents.eq(blendId).show();
            }
        });
    }
});

