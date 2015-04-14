/**
 * Slider 组件
 * Created by dingquan on 15-02-03
 * @file slider.js
 * @author dingquan
 */
'use strict';
$.widget('blend.slider', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        autoSwipe: true,            // 自动滚动,默认开启
        continuousScroll: true,     // 连续滚动
        axisX: true,                // 滚动方向,默认x轴滚动
        transitionType: 'ease',     // 过渡类型
        duration: 0.6,
        speed: 2000,                // 切换的时间间隔
        theme: "d2",
        needDirection: false,    // 是否需要左右切换的按钮
        ratio: "normal"     // normal/wide/square/small
    },
    /**
     * 创建组件调用一次
     * @private
     */
    _create: function () {

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $el = this.element;
        /**
         * 经过继承的 options
         */
        var options = this.options;

        var ratioClass = NAMESPACE + 'slider-';
        switch (options.ratio) {
            case 'wide':
                ratioClass += 'wide';
                break;
            case 'square':
                ratioClass += 'square';
                break;
            case 'small':
                ratioClass += 'small';
                break;
            default :
                ratioClass += 'normal';
        }
        $el.addClass(ratioClass);

        this.$container = $el;
        this.$ul = $el.find('.' + NAMESPACE + 'slides');
        this.$li = $el.find('.' + NAMESPACE + 'slides li');

        this.liWidth = this.$li.width();
        this.liHeight = this.$li.height();
        this.liLength = this.$li.length;

        this.autoScroll = null;     // 自动播放interval对象
        this._index = 0;            // 当前幻灯片位置

        if (typeof options.theme !== 'string') {
            options.theme = 'default';
        }

        this._addComponents(options.theme);
    },
    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {

        var opts = this.options;
        var that = this;
        var $ul = this.$ul;
        var $li = this.$li;

        /**
         * 连续滚动，需要复制dom
         */
        if (opts.continuousScroll) {
            $ul.prepend($li.last().clone()).append($li.first().clone());
            if (opts.axisX) {
                that._fnTranslate($ul.children().first(), that.liWidth * -1);
                that._fnTranslate($ul.children().last(), that.liWidth * that.liLength);
            }
            else {
                that._fnTranslate($ul.children().first(), that.liHeight * -1);
                that._fnTranslate($ul.children().last(), that.liHeight * that.liLength);
            }
        }

        /**
         * 给初始图片定位
         */
        if (opts.axisX) {
            $li.each(function (i) {
                that._fnTranslate($(this), that.liWidth * i);
            });
        }
        else {
            $li.each(function (i) {
                that._fnTranslate($(this), that.liHeight * i);
            });
        }

        that._fnAutoSwipe();
        this._initEvent();
        // this._initView();
    },
    /**
     * 初始化事件绑定
     * @private
     */
    _initEvent: function () {
        var that = this;
        // 绑定触摸
        var hammer = new Hammer(this.$container[0]);

        hammer.on('panstart', function (e) {

            that.startX = e.center.x;
            that.startY = e.center.y;
        });

        hammer.on('panmove', function (e) {

            if (that.options.autoSwipe) {
                clearInterval(that.autoScroll);
            }

            that.curX = e.center.x;
            that.curY = e.center.y;

            that.moveX = that.curX - that.startX;
            that.moveY = that.curY - that.startY;

            that._fnTransition(that.$ul, 0);

            if (that.options.axisX) {
                // console.log(-(that.liWidth * (parseInt(that._index)) - that.moveX));
                that._fnTranslate(that.$ul, -(that.liWidth * (parseInt(that._index, 10)) - that.moveX));
            }

        });

        hammer.on('panend', function (e) {

            var opts = that.options;
            var _touchDistance = 50;

            if (opts.axisX) {
                that.moveDistance = that.moveX;
            }
            else {
                that.moveDistance = that.moveY;
            }

            // 距离小
            if (Math.abs(that.moveDistance) <= _touchDistance) {
                that._fnScroll(.3);
            }
            else {
                // 距离大
                // 手指触摸上一屏滚动
                if (that.moveDistance > _touchDistance) {
                    that._fnMovePrev();
                    that._fnAutoSwipe();
                // 手指触摸下一屏滚动
                }
                else if (that.moveDistance < -_touchDistance) {
                    that._fnMoveNext();
                    that._fnAutoSwipe();
                }
            }

            that.moveX = 0;
            that.moveY = 0;
        });
    },
    /**
     * 根据不同的theme添加组件和初始化样式
     * @private
     * @param {string} theme 幻灯片主题,目前支持有限的几个
     */
    _addComponents: function (theme) {

        var $el = this.$container;

        if (theme === 'a1') {
            $el.addClass(NAMESPACE + 'slider-a1');
            this._initControl();
        }
        if (theme === 'a2') {
            $el.addClass(NAMESPACE + 'slider-a2');
            this._initControl();
        }
        if (theme === 'd1') {
            $el.addClass(NAMESPACE + 'slider-title');
        }
        if (theme === 'd2') {
            $el.addClass(NAMESPACE + 'slider-title');
            this._initControl();
        }
    },
    /**
     * 初始化control控件
     * @private
     */
    _initControl: function () {

        var $el = this.$container;
        var liLength = this.liLength;

        var html = '';
        for (var i = 0; i < liLength; i++) {
            html += (i === 0) ? '<li><a class="' + NAMESPACE + 'slider-active"></a></li>' : '<li><a></a></li>';
        }

        var $ol = $('<ol class="' + NAMESPACE + 'slider-control-nav">' + html + '</ol>');

        $el.append($ol);

        this.$controlOl = $ol;
    },
    /**
     * 初始化title
     * @private
     */
    _initTitle: function () {
        // to do
        // var $el = this.$container;
    },
    /*
     * css 过渡
     * @private
     * @param {Object} dom  zepto object
     * @param {number} num - transition number
     */
    _fnTransition: function (dom, num) {

        var opts = this.options;
        dom.css({
            '-webkit-transition': 'all ' + num + 's ' + opts.transitionType,
            'transition': 'all ' + num + 's ' + opts.transitionType
        });
    },
    /**
     * css 滚动
     * @private
     * @param  {Object} dom    zepto object
     * @param  {number} result translate number
     */
    _fnTranslate: function (dom, result) {

        var opts = this.options;

        if (opts.axisX) {
            dom.css({
                '-webkit-transform': 'translate3d(' + result + 'px,0,0)',
                'transform': 'translate3d(' + result + 'px,0,0)'
            });
        }
        else {
            dom.css({
                '-webkit-transform': 'translate3d(0,' + result + 'px,0)',
                'transform': 'translate3d(0,' + result + 'px,0)'
            });
        }
    },
    /**
     * 下一屏滚动
     * @private
     */
    _fnMoveNext: function () {
        this._index ++;
        this._fnMove();
        /*if(opts.lazyLoad){
            if(opts.continuousScroll){
                fnLazyLoad(_index+2);
            }else{
                fnLazyLoad(_index+1);
            }
        }*/
    },
    /**
     * 上一屏滚动
     * @private
     */
    _fnMovePrev: function () {
        this._index --;
        this._fnMove();
        // 第一次往右滚动懒加载图片
        /*if(firstMovePrev && opts.lazyLoad){
            var i = _liLength-1;
            for(i; i <= (_liLength+1); i++){
                fnLazyLoad(i);
            }
            firstMovePrev = false;
            return;
        }
        if(!firstMovePrev && opts.lazyLoad){
            fnLazyLoad(_index);
        }*/
    },
    /**
     * 自动滑动
     * @private
     */
    _fnAutoSwipe: function () {
        var that = this;
        var opts = this.options;

        if (opts.autoSwipe) {
            this.autoScroll = setInterval(function () {
                that._fnMoveNext();
            }, opts.speed);
        }
    },
    /**
     * [_fnMove description]
     * @private
     */
    _fnMove: function () {
        var that = this;
        var opts = this.options;
        // var _vars = this._vars;
        // var _liLength = this.liLength;

        if (opts.continuousScroll) {
            if (that._index >= that.liLength) {
                that._fnScroll(.3);
                that._index = 0;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else if (that._index < 0) {
                that._fnScroll(.3);
                that._index = that.liLength - 1;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else {
                that._fnScroll(.3);
            }
        }
        else {
            if (that._index >= that.liLength) {
                that._index = 0;
            }
            else if (that._index < 0) {
                that._index = that.liLength - 1;
            }
            that._fnScroll(.3);
        }

        that._setDotActive();

        // callback(_index);
    },
    /**
     * 滑动
     * @private
     * @param  {number} num num
     */
    _fnScroll: function (num) {
        var $ul = this.$ul;
        var _index = this._index;
        var _liWidth = this.liWidth;
        var _liHeight = this.liHeight;
        var opts = this.options;

        this._fnTransition($ul, num);
        if (opts.axisX) {
            this._fnTranslate($ul, -_index * _liWidth);
        }
        else {
            this._fnTranslate($ul, -_index * _liHeight);
        }
    },
    /**
     * 设置圆点的状态
     * @private
     */
    _setDotActive: function () {
        this.$controlOl.find('li a').removeClass(NAMESPACE + 'slider-active');
        this.$controlOl.find('li').eq(this._index).find('a').addClass(NAMESPACE + 'slider-active');
    },
    /**
     * 下一张幻灯片
     * @return {Object} 当前Zepto对象
     */
    next: function () {
        this._fnMoveNext();
        return this.$container;
    },
    /**
     * 上一张幻灯片
     * @return {Object} 当前Zepto对象
     */
    prev: function () {
        this._fnMovePrev();
        return this.$container;
    },
    /**
     * 暂停
     * @return {Object} 当前Zepto对象
     */
    paused: function () {
        clearInterval(this.autoScroll);
        return this.$container;
    }

});