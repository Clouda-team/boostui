/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
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
        // duration: 0.6,
        speed: 2000,                // 切换的时间间隔
        theme: 'd2',
        // needDirection: false,    // 是否需要左右切换的按钮
        ratio: 'normal' ,    // normal/wide/square/small
        wrapWidth: document.body && document.body.clientWidth,
        bgImg: false        // 是否加默认背景图，默认不加
    },
    /**
     * 创建组件调用一次
     * @private
     */
    _create: function () {

        var win = window;
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
            case 'square':
            case 'middle':
            case 'small':
                ratioClass += options.ratio;
                break;
            default :
                ratioClass += 'normal';
        }
        $el.addClass(ratioClass);
        // 添加背景图样式
        if (options.bgImg){
            $el.addClass(NAMESPACE + "slider-bgImg");
        }
        $el.css("visibility", "visible");

        this.$container = $el;
        this.$ul = $el.find('.' + NAMESPACE + 'slides');
        this.$li = $el.find('.' + NAMESPACE + 'slides li');

        // this._liWidth = this.$li.width() ? this.$li.width() : options.wrapWidth;
        // this._liHeight = this.$li.height();
        // this._liLength = this.$li.length;
        //
        // this.autoScroll = null;     // 自动播放interval对象
        // this._index = 0;            // 当前幻灯片位置
        //
        // if (typeof options.theme !== 'string') {
        //     options.theme = 'default';
        // }
        //
        // this._addComponents(options.theme);

        var that = this;

        var whichEvent = ('orientationchange' in win) ? 'orientationchange' : 'resize';
        win.addEventListener(whichEvent, function(){
            // that._init();
            that._liWidth = that.$li.width() ? that.$li.width() : opts.wrapWidth;
            that._liHeight = that.$li.height();
            that._spin();
        },false);

        return;

        /*
        * matchMedia.addListener() 在安卓手机上支持太差，先注释掉
        if (typeof win.matchMedia !== 'undefined') {
          var mql = win.matchMedia("(orientation: portrait)");
          alert(mql);
          mql.addListener(function(m) {
            alert('matchMedia');
          	if(m.matches) {} else {}
          });
        }else{
          var whichEvent = ('orientationchange' in win) ? 'orientationchange' : 'resize';
          win.addEventListener(whichEvent, function(){
              alert('orientationchange or resize ---');
          },false);
        }
        */

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



        this._liWidth = $li.width() ? $li.width() : opts.wrapWidth;
        this._liHeight = $li.height();
        this._liLength = $li.length;

        this.autoScroll = null;     // 自动播放interval对象
        this._index = 0;            // 当前幻灯片位置

        if (typeof opts.theme !== 'string') {
            opts.theme = 'default';
        }

        this._addComponents(opts.theme);


        // 如果speed是0, 不自动滚动
        if (this.options.speed <= 0) {
            this.options.autoSwipe = false;
        }

        /**
         * 连续滚动，需要复制dom
         */
        if (opts.continuousScroll) {
            $ul.prepend($li.last().clone()).append($li.first().clone());

            var widthOrHeight = opts.axisX ? that._liWidth : that._liHeight;
            that._fnTranslate($ul.children().first(), widthOrHeight * -1);
            that._fnTranslate($ul.children().last(), widthOrHeight * that._liLength);

        }

        // 给初始图片定位
        $li.each(function (i) {
            that._fnTranslate($(this), (opts.axisX ? that._liWidth : that._liHeight) * i);
        });

        that._fnAutoSwipe();
        this._initEvent();

    },
    /**
     * 初始化事件绑定
     * @private
     */
    _initEvent: function () {
        var that = this;
        var device = this._device();
        var evReady = true;
        var isPhone = (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent));
        // 绑定触摸
        that.$ul[0].addEventListener(device.startEvt, function (evt){
            if (evReady){
                that.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
                that.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
                //evt.preventDefault();

                that.$ul[0].addEventListener(device.moveEvt, moveHandler, false);
                that.$ul[0].addEventListener(device.endEvt, endHandler, false);

                evReady = false;
            }
        }, false);

        function moveHandler (evt){
            $("#prevent").html("");
            if (that.options.autoSwipe) {
                clearInterval(that.autoScroll);
            }

            that.curX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
            that.curY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;

            that.moveX = that.curX - that.startX;
            that.moveY = that.curY - that.startY;

            that._transitionHandle(that.$ul, 0);

            //横向滑动阻止默认事件

            if (Math.abs(that.moveY) > 20 && that.options.axisX){
                endHandler(evt);
            }else if (Math.abs(that.moveX) > 7 || !isPhone){
                evt.preventDefault();
            }

            if (that.options.axisX && Math.abs(that.moveX) > Math.abs(that.moveY)) {
                that._fnTranslate(that.$ul, -(that._liWidth * (parseInt(that._index, 10)) - that.moveX));
            }

        };

        function endHandler (evt){
            var opts = that.options;
            var _touchDistance = 50;

            if (opts.axisX) {
                that.moveDistance = that.moveX;
            }
            else {
                that.moveDistance = that.moveY;
            }

            // 距离小
            if (opts.axisX && Math.abs(that.moveY) > Math.abs(that.moveX)){
                that._fnScroll(.3);
                that._fnAutoSwipe();
            }else if (Math.abs(that.moveDistance) <= _touchDistance) {
                that._fnScroll(.3);
            }else {
                // 距离大
                // 手指触摸上一屏滚动
                if (that.moveDistance > _touchDistance) {
                    that._fnMovePrev();
                // 手指触摸下一屏滚动
                }
                else if (that.moveDistance < -_touchDistance) {
                    that._fnMoveNext();
                }
                that._fnAutoSwipe();
            }



            that.moveX = 0;
            that.moveY = 0;
            evReady = true;

            that.$ul[0].removeEventListener(device.moveEvt, moveHandler, false);
            that.$ul[0].removeEventListener(device.endEvt, endHandler, false);
            if(!isPhone){
                evt.preventDefault();
                return false;
            }
        };
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
        if (theme === 's1') {
            $el.addClass(NAMESPACE + 'slider-special');
            this._initControl();
        }
    },
    /**
     * 初始化control控件
     * @private
     */
    _initControl: function () {

        var $el = this.$container;
        var liLength = this._liLength;

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
    _transitionHandle: function (dom, num) {

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
        clearInterval(this.autoScroll);

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
        // var _liLength = this._liLength;

        if (opts.continuousScroll) {
            if (that._index >= that._liLength) {
                that._fnScroll(.3);
                that._index = 0;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else if (that._index < 0) {
                that._fnScroll(.3);
                that._index = that._liLength - 1;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else {
                that._fnScroll(.3);
            }
        }
        else {
            if (that._index >= that._liLength) {
                that._index = 0;
            }
            else if (that._index < 0) {
                that._index = that._liLength - 1;
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
        var _liWidth = this._liWidth;
        var _liHeight = this._liHeight;
        var opts = this.options;

        this._transitionHandle($ul, num);
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
    /**
     * 屏幕旋转后的处理函数
     */
    _spin: function () {
      var that = this;
      var $ul = this.$ul;
      var $li = this.$li;
      var options = this.options;

      this.paused();
      var widthOrHeight = options.axisX ? this._liWidth : this._liHeight;
      this._fnTranslate($ul.children().first(), widthOrHeight * -1);
      this._fnTranslate($ul.children().last(), widthOrHeight * that._liLength);

      // 给初始图片定位
      $li.each(function (i) {
          that._fnTranslate($(this), (options.axisX ? that._liWidth : that._liHeight) * i);
      });
      this.start();
      this.next();
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
    },
    start: function () {
        clearInterval(this.autoScroll);
        this._fnAutoSwipe();
        return this.$container;
    }

});
