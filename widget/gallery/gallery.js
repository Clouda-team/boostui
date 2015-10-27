/**
 * gallery 组件
 * Created by dingquan on 15-3-24.
 *
 * @file gallery.js
 * @author dingquan
 */

'use strict';
// var NAMESPACE = "blend-";
$.widget('blend.gallery', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     * tapMode: true表示点击图片切换显示描述，false表示点击切换显示图集
     */
    options: {
    },
    /**
     * 创建组件是调用一次
     * @private
     */
    _create: function () {
        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        this.$el = this.element;
        /**
         * 经过继承的 options
         */
        var options = this.options;

        if (!options.data || !options.data.length) {
            throw new Error('data can not be empty');
        }
    },
    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {

        //FastClick.attach(this.element[0]);

        var me = this;

        if (IS_UIX) {
            // UIX
            if (this._uix !== null) {
              // (this._uix.destroy)&&(this._uix.destroy());
            }
            $.dynamicLoad (function() {
                require(['src/blend'], function (blend) {
                   me._uix = me._initUIXGallery(blend);
                });
            });

        }
        else {
            /**
             * web gallery 初始化
             */
            this._createMask();   // 创建遮罩mask
            this._setting();    // 设置相关内部属性
            this._renderHTML();
            this._bindHandler();
        }

    },
    /**
     * 初始化 uix gallery
     * @private
     * @param  {Object} blend blend对象
     * @return {[type]}
     */
    _initUIXGallery: function (blend) {

        var uixGallery = blend.create('gallery', {
            images: this.options.data
        });

        return uixGallery;

    },
    /**
     * 创建遮罩mask
     * @private
     */
    _createMask: function () {

        if (this.mask) {
            // 已经初始化过mask
            return;
        }

        var mask = document.createElement('div');
        mask.classList.add(NAMESPACE + 'gallery-mask');
        document.querySelector('body').appendChild(this.mask = mask);

    },
    /**
     * 根据传入options 设置内部变量
     * @private
     */
    _setting: function () {

        var opts = this.options;
        // 幻灯片外层容器
        this.wrap = this.mask;
        // 幻灯片 内容list
        this.data = opts.data;
        // 内容类型 dom or pic
        this.type = 'pic';
        // 滑动方向
        this.isVertical = false;
        // Overspread mode
        this.isOverspread = opts.isOverspread || false;
        // 图片切换时间间隔
        this.duration = opts.duration || 2000;
        // 指定开始播放的图片index
        this.initIndex = opts.initIndex || 0;
        if (this.initIndex > this.data.length - 1 || this.initIndex < 0) {
            this.initIndex = 0;
        }
        // touchstart prevent default to fixPage
        this.fixPage = true;
        this.slideIndex = this.slideIndex || this.initIndex || 0;

        this.axis = 'X';
        this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

        this.width = this.width || this.wrap.clientWidth || document.body.clientWidth || document.body.offsetWidth;
        this.height = this.height || this.wrap.clientHeight || document.body.clientHeight || document.body.offsetHeight;

        this.ratio = this.height / this.width;
        this.scale = this.width;
        // Callback function when your finger is moving
        this.onslide = opts.onslide;
        // Callback function when your finger touch the screen
        this.onslidestart = opts.onslidestart;
        // Callback function when the finger move out of the screen
        this.onslideend = opts.onslideend;
        // Callback function when the finger move out of the screen
        this.onslidechange = opts.onslidechange;

        //单击是显示描述/图集
        this.tapMode = (typeof opts.tapMode === "undefined") ?  true : opts.tapMode;
      
        this.offset = this.offset || {
            X: 0,
            Y: 0
        };
        this.useZoom = opts.useZoom || false;
        // looping logic adjust
        if (this.data.length < 2) {
            this.isLooping = false;
            this.isAutoPlay = false;
        }
        else {
            this.isLooping = opts.isLooping || false;
            this.isAutoplay = false;
        }
        // little trick set, when you chooce tear & vertical same time
        // iSlider overspread mode will be set true autometicly
        if (opts.animateType === 'card' && this.isVertical) {
            this.isOverspread = true;
        }
        // 自动播放模式
        if (this.isAutoplay) {
            this.show();
            this._play();
        }

        if (this.useZoom) {
            this._addZoomPlugin();
            this._initZoom(opts);
        }

        this.infoType = opts.infoType || 0;
        this.bottomHeight = (this.infoType === 1) ? '50px' : '116px';
        // debug mode
        this.log = opts.isDebug ? function (str) {
                window.console.log(str);
            } : function () {
        };
        // set Damping function
        this._setUpDamping();
        // stop autoplay when window blur
        // this._setPlayWhenFocus();
        // set animate Function
        this._animateFunc =
        opts.animateType in this._animateFuncs ? this._animateFuncs[opts.animateType] : this._animateFuncs['default'];
    },
    /**
     * transform 移动动画
     * @private
     * @type {Object}
     */
    _animateFuncs: {
        'default': function (dom, axis, scale, i, offset) {
            dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
        }
    },
    /**
     * @private
     */
    _setUpDamping: function () {
        var oneIn2 = this.scale >> 1;
        var oneIn4 = oneIn2 >> 1;
        var oneIn16 = oneIn4 >> 2;
        this._damping = function (distance) {
            var dis = Math.abs(distance);
            var result;
            if (dis < oneIn2) {
                result = dis >> 1;
            }
            else if (dis < oneIn2 + oneIn4) {
                result = oneIn4 + (dis - oneIn2 >> 2);
            }
            else {
                result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
            }
            return distance > 0 ? result : -result;
        };
    },
    /**
    * render single item html by idx
    * @private
    * @param {element} el ..
    * @param {number}  i  ..
    */
    _renderItem: function (el, i) {
        var item;
        var html;
        var len = this.data.length;
        // get the right item of data
        if (!this.isLooping) {
            item = this.data[i] || {empty: true};
        }
        else {
            if (i < 0) {
                item = this.data[len + i];
            }
            else if (i > len - 1) {
                item = this.data[i - len];
            }
            else {
                item = this.data[i];
            }
        }
        if (item.empty) {
            el.innerHTML = '';
            el.style.background = '';
            return;
        }
        if (this.type === 'pic') {
            if (!this.isOverspread) {
                html = item.height / item.width > this.ratio ?
                '<img  height="' + this.height + '" src="' + item.image + '">' :
                '<img width="' + this.width + '" src="' + item.image + '">';
            }
            else {
                el.style.background = 'url(' + item.image + ') 50% 50% no-repeat';
                el.style.backgroundSize = 'cover';
            }
        }
        else if (this.type === 'dom') {
            html = item.image;
        }
        html && (el.innerHTML = html);
    },
    /**
     * render list html
     * @private
     */
    _renderHTML: function () {

        this.outer && (this.outer.innerHTML = '');
        // initail ul element
        var outer = this.outer || document.createElement('ul');
        outer.style.cssText =
        'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';
        // storage li elements, only store 3 elements to reduce memory usage
        this.els = [];
        for (var i = 0; i < 3; i++) {
            var li = document.createElement('li');
            li.className = this.type === 'dom' ? NAMESPACE + 'gallery-dom' : NAMESPACE + 'gallery-pic';
            li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
            this.els.push(li);
            // prepare style animation
            this._animateFunc(li, this.axis, this.scale, i, 0);

            if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
                this._renderItem(li, 1 - i + this.slideIndex);
            }
            else {
                this._renderItem(li, i - 1 + this.slideIndex);
            }
            outer.appendChild(li);
        }
        this._initLoadImg();
        // append ul to div#canvas
        if (!this.outer) {
            this.outer = outer;
            this.wrap.appendChild(outer);
        }

        if (!this.topMenu) {
            this._renderTopAndBottom();
        }
    },
    /**
     * 渲染顶部和底部
     * @private
     */
    _renderTopAndBottom: function () {

        var topMenu = this.topMenu || document.createElement('div');
        var topBack = this.topBack || document.createElement('span');
        var topTitle = this.topTitle || document.createElement('div');

        topMenu.classList.add(NAMESPACE + 'gallery-top');
        topBack.classList.add(NAMESPACE + 'gallery-top-back');
        topTitle.classList.add(NAMESPACE + 'gallery-top-title');

        topMenu.appendChild(topBack);
        topMenu.appendChild(this.topTitle = topTitle);

        topBack.addEventListener('click', (function (val) {
            var that = val;

            return function (e) {
                that.outer.innerHTML = '';
                // that.mask.style.visibility = "hidden";
                that.mask.style.display = 'none';
                that._hideMenu();
                that.$el.trigger('gallery:close');
            };
        })(this));

        var bottomMenu = this.bottomMenu || document.createElement('div');
        bottomMenu.classList.add(NAMESPACE + 'gallery-bottom');
        if (this.infoType === 1) {
          bottomMenu.classList.add(NAMESPACE + 'gallery-type-1');  
        }

        // 底部内容展示

        var bottomInfoWrap = this.bottomInfoWrap || document.createElement('div');
        bottomInfoWrap.classList.add(NAMESPACE + 'gallery-bottom-info-wrap');


        var bottomInfo = this.bottomInfo || document.createElement('div');
        bottomInfo.classList.add(NAMESPACE + 'gallery-bottom-info');


        var bottomPage = this.bottomPage || document.createElement('span');
        bottomPage.classList.add(NAMESPACE + 'gallery-bottom-page');

        bottomInfoWrap.appendChild(this.bottomPage = bottomPage);
        bottomInfoWrap.appendChild(this.bottomInfo = bottomInfo);

        bottomMenu.appendChild(bottomInfoWrap);

        this.wrap.appendChild(this.topMenu = topMenu);
        this.wrap.appendChild(this.bottomMenu = bottomMenu);

    },
    /**
     *  preload img when slideChange
     *  @private
     *  @param {number} dataIndex means which image will be load
     */
    _preloadImg: function (dataIndex) {
        var len = this.data.length;
        var idx = dataIndex;
        var self = this;
        var loadImg = function (index) {
            if (index > -1 && !self.data[index].loaded) {
                var preloadImg = new Image();
                preloadImg.src = self.data[index].image;
                self.data[index].loaded = 1;
            }
        };
        if (self.type !== 'dom') {
            var nextIndex = idx + 2 > len - 1 ? (idx + 2) % len : idx + 2;
            var prevIndex = idx - 2 < 0 ? len - 2 + idx : idx - 2;
            loadImg(nextIndex);
            loadImg(prevIndex);
        }
    },
    /**
     *  load extra imgs when renderHTML
     *  @private
     */
    _initLoadImg: function () {
        var data = this.data;
        var len = data.length;
        var idx = this.initIndex;
        var self = this;
        /*if (idx >= len - 1) {
            // fix bug
            return;
        }*/
        if (this.type !== 'dom' && len > 3) {
            var nextIndex = idx + 2 > len ? (idx + 1) % len : idx + 1;
            var prevIndex = idx - 1 < 0 ? len - 1 + idx : idx - 1;
            data[idx].loaded = 1;
            data[nextIndex].loaded = 1;
            if (self.isLooping) {
                data[prevIndex].loaded = 1;
            }
            setTimeout(function () {
                self._preloadImg(idx);
            }, 200);
        }
    },
    /**
     * @private
     */
    _play: function () {
        var self = this;
        var duration = this.duration;
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = setInterval(function () {
            self._slideTo(self.slideIndex + 1);
        }, duration);
    },
    /**
     * 滑动到指定的图片
     * @private
     * @param  {number} dataIndex 图片索引
     */
    _slideTo: function (dataIndex) {

        var data = this.data;
        var els = this.els;
        var idx = dataIndex;
        var n = dataIndex - this.slideIndex;
        if (Math.abs(n) > 1) {
            var nextEls = n > 0 ? this.els[2] : this.els[0];
            this._renderItem(nextEls, idx);
        }
        // preload when slide
        this._preloadImg(idx);
        // get right item of data
        if (data[idx]) {
            this.slideIndex = idx;
        }
        else {
            if (this.isLooping) {
                this.slideIndex = n > 0 ? 0 : data.length - 1;
            }
            else {
                this.slideIndex = this.slideIndex;
                n = 0;
            }
        }

        this.log('pic idx:' + this.slideIndex);
        this.topTitle.innerText = this.data[this.slideIndex].title;
        this.bottomInfo.innerText = this.data[this.slideIndex].description;
        this.bottomPage.innerText = (this.slideIndex + 1) + '/' + this.data.length;

        // keep the right order of items
        var sEle;
        if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
            if (n > 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
            else if (n < 0) {
                sEle = els.shift();
                els.push(sEle);
            }
        }
        else {
            if (n > 0) {
                sEle = els.shift();
                els.push(sEle);
            }
            else if (n < 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
        }
        // slidechange should render new item
        // and change new item style to fit animation
        if (n !== 0) {
            if (Math.abs(n) > 1) {
                this._renderItem(els[0], idx - 1);
                this._renderItem(els[2], idx + 1);
            }
            else if (Math.abs(n) === 1) {
                this._renderItem(sEle, idx + n);
            }
            sEle.style.webkitTransition = 'none';
            sEle.style.visibility = 'hidden';
            setTimeout(function () {
                sEle.style.visibility = 'visible';
            }, 200);
            // this.onslidechange && this.onslidechange(this.slideIndex);
            // this.dotchange && this.dotchange();
        }
        // do the trick animation
        for (var i = 0; i < 3; i++) {
            if (els[i] !== sEle) {
                els[i].style.webkitTransition = 'all .3s ease';
            }
            this._animateFunc(els[i], this.axis, this.scale, i, 0);
        }

        // stop playing when meet the end of data
        if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
            this._pause();
        }
    },
    /**
     * 暂停自动播放
     * @private
     */
    _pause: function () {
        clearInterval(this.autoPlayTimer);
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
     * 绑定事件
     * @private
     */
    _bindHandler: function () {

        var outer = this.outer;
        var device = this._device();
        if (!device.hasTouch) {
            outer.style.cursor = 'pointer';
            outer.ondragstart = function (evt) {
                if (evt) {
                    return false;
                }
                return true;
            };
        }

        outer.addEventListener(device.startEvt, this);
        outer.addEventListener(device.moveEvt, this);
        outer.addEventListener(device.endEvt, this);
        window.addEventListener('orientationchange', this);
    },
    handleEvent: function (evt) {
        var device = this._device();
        switch (evt.type) {
            case device.startEvt:
                this._startHandler(evt);
                break;
            case device.moveEvt:
                this._moveHandler(evt);
                break;
            case device.endEvt:
                this._endHandler(evt);
                break;
            case 'touchcancel':
                this._endHandler(evt);
                break;
            case 'orientationchange':
                this._orientationchangeHandler();
                break;
            case 'focus':
                this.isAutoplay && this._play();
                break;
            case 'blur':
                this._pause();
                break;
        }
    },
    /**
     * 处理touchStart事件
     * @private
     * @param  {Event} evt ...
     */
    _startHandler: function (evt) {
        if (this.fixPage) {
            evt.preventDefault();
        }

        var device = this._device();
   
        this.isMoving = true;
        this._pause();
        // this.onslidestart && this.onslidestart();
        this.log('Event: beforeslide');
        this.startTime = new Date().getTime();
        this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
        this.zoomStartHandler && this.zoomStartHandler(evt);  // zoom 事件
    },
    /**
     * 处理touchMove事件
     * @private
     * @param  {Event} evt ...
     */
    _moveHandler: function (evt) {
        if (this.isMoving) {

            var device = this._device();
            var len = this.data.length;
            var axis = this.axis;
            var reverseAxis = this.reverseAxis;
            var offset = {
                X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
                Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
            };
            var res = this.zoomMoveHandler ? this.zoomMoveHandler(evt) : false;  // zoom  事件
            // var res = false;
            if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
                evt.preventDefault();
                this.onslide && this.onslide(offset[axis]);
                this.log('Event: onslide');
                if (!this.isLooping) {
                    // 未开启循环
                    if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
                        offset[axis] = this._damping(offset[axis]);
                    }
                }
                for (var i = 0; i < 3; i++) {
                    var item = this.els[i];
                    item.style.webkitTransition = 'all 0s';
                    this._animateFunc(item, axis, this.scale, i, offset[axis]);
                }
            }
            this.offset = offset;
        }
    },
    /**
     * 处理touchEnd事件
     * @private
     * @param  {Event} evt ...
     */
    _endHandler: function (evt) {
        this.isMoving = false;
        var offset = this.offset;
        var axis = this.axis;
        var boundary = this.scale / 2;
        var endTime = new Date().getTime();
        // a quick slide time must under 300ms
        // a quick slide should also slide at least 14 px
        boundary = endTime - this.startTime > 300 ? boundary : 14;
        var res = this.zoomEndHandler ? this.zoomEndHandler(evt) : false; // zoom  事件
        // var res = false;

        var absOffset = Math.abs(offset[axis]);
        var absReverseOffset = Math.abs(offset[this.reverseAxis]);
        if (!res && offset[axis] >= boundary && absReverseOffset < absOffset) {
            this._slideTo(this.slideIndex - 1);
        }
        else if (!res && offset[axis] < -boundary && absReverseOffset < absOffset) {
            this._slideTo(this.slideIndex + 1);
        }
        else if (!res) {
            this._slideTo(this.slideIndex);

            var _that = this;
            setTimeout(function (){
                if (_that.gesture !== 3 && _that.tapMode){
                     if (_that.isMenuShow) {
                        _that._hideMenu();
                    }
                    else {
                        _that._showMenu();
                    }
                }else if (_that.gesture !== 3 && !_that.tapMode){
                    _that.hide();
                }
            }, 300);
        }
        // create tap event if offset < 10
        if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
            this.tapEvt = document.createEvent('Event');
            this.tapEvt.initEvent('tap', true, true);
            if (!evt.target.dispatchEvent(this.tapEvt)) {
                evt.preventDefault();
            }
        }
        this.offset.X = this.offset.Y = 0;
        this.isAutoplay && this._play();
        // this.onslideend && this.onslideend(this.slideIndex);
        this.log('Event: afterslide');
    },
    /**
     * @private
     */
    _destroy: function () {
        var outer = this.outer;
        var device = this._device();
        outer.removeEventListener(device.startEvt, this);
        outer.removeEventListener(device.moveEvt, this);
        outer.removeEventListener(device.endEvt, this);
        window.removeEventListener('orientationchange', this);
        window.removeEventListener('focus', this);
        window.removeEventListener('blur', this);
        this.wrap.innerHTML = '';
    },
    /**
     * 展示顶部和底部
     * @private
     */
    _showMenu: function () {

        this.topMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.bottomMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.isMenuShow = true;
    },
    /**
     * 隐藏顶部和底部
     * @private
     */
    _hideMenu: function () {

        this.topMenu.style.webkitTransform = 'translate3d(0, -44px, 0)';
        // this.bottomMenu.style.webkitTransform = 'translate3d(0, 116px, 0)';
        this.bottomMenu.style.webkitTransform = 'translate3d(0, ' + this.bottomHeight + ', 0)';
        this.isMenuShow = false;
    },
    /**
     * 指定展示第几张图片
     * @public
     * @param  {number} val 图片索引
     */
    show: function (val) {
        if (IS_UIX && this._uix) {
            this._uix.show();
            return;
        }

        if (val < 0 || isNaN(parseInt(val, 10))) {
            val = 0;
        }
        else if (val >= this.data.length) {
            val = this.data.length - 1;
        }

        this.initIndex = val;
        this._renderHTML();

        this._slideTo(val);
        this.mask.style.visibility = 'visible';
        this.mask.style.display = 'block';


        /* if (!this.outer || !this.outer.innerHTML) {
            this._renderHTML();
        }*/
        if (this.tapMode){
            var that = this;
            setTimeout(function(){
                that._showMenu();
            },300);
        }
        
        // this._showMenu();
    },
    /**
     * 隐藏gallery
     * @public
     */
    hide: function () {
        this.mask.style.display = 'none';
        this.mask.style.visibility = 'hidden';   
    },
    extend: function (plugin, main) {
        if (!main) {
            main = this;
        }
        Object.keys(plugin).forEach(function (property) {
            Object.defineProperty(main, property, Object.getOwnPropertyDescriptor(plugin, property));
        });
    },
    /**
     * 增加图片的缩放功能
     * @private
     */
    _addZoomPlugin: function () {
        var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
        var minScale = 1 / 2;
        var viewScope = {};
        function generateTranslate(x, y, z, scale) {
            return 'translate' + (has3d ? '3d(' : '(') + x
            + 'px,' + y + (has3d ? 'px,' + z + 'px)' : 'px)') + 'scale(' + scale + ')';
        }
        function getDistance(a, b) {
            var x;
            var y;
            x = a.left - b.left;
            y = a.top - b.top;
            return Math.sqrt(x * x + y * y);
        }
        function generateTransformOrigin(x, y) {
            return x + 'px ' + y + 'px';
        }
        function getTouches(touches) {
            return Array.prototype.slice.call(touches).map(function (touch) {
                return {
                    left: touch.pageX,
                    top: touch.pageY
                };
            });
        }
        function calculateScale(start, end) {
            var startDistance = getDistance(start[0], start[1]);
            var endDistance = getDistance(end[0], end[1]);
            return endDistance / startDistance;
        }
        function getComputedTranslate(obj) {
            var result = {
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
                offsetX: 0,
                offsetY: 0
            };
            var offsetX = 0;
            var offsetY = 0;
            if (!window.getComputedStyle || !obj) {
                return result;
            }
            var style = window.getComputedStyle(obj);
            var transform;
            var origin;
            transform = style.webkitTransform || style.mozTransform;
            origin = style.webkitTransformOrigin || style.mozTransformOrigin;
            var par = origin.match(/(.*)px\s+(.*)px/);
            if (par.length > 1) {
                offsetX = par[1] - 0;
                offsetY = par[2] - 0;
            }
            if (transform === 'none') {
                return result;
            }
            var mat3d = transform.match(/^matrix3d\((.+)\)$/);
            var mat2d = transform.match(/^matrix\((.+)\)$/);
            var str;
            if (mat3d) {
                str = mat3d[1].split(', ');
                result = {
                    translateX: str[12] - 0,
                    translateY: str[13] - 0,
                    translateZ: str[14] - 0,
                    offsetX: offsetX - 0,
                    offsetY: offsetY - 0,
                    scaleX: str[0] - 0,
                    scaleY: str[5] - 0,
                    scaleZ: str[10] - 0
                };
            }
            else if (mat2d) {
                str = mat2d[1].split(', ');
                result = {
                    translateX: str[4] - 0,
                    translateY: str[5] - 0,
                    offsetX: offsetX - 0,
                    offsetY: offsetY - 0,
                    scaleX: str[0] - 0,
                    scaleY: str[3] - 0
                };
            }
            return result;
        }
        function getCenter(a, b) {
            return {
                x: (a.x + b.x) / 2,
                y: (a.y + b.y) / 2
            };
        }
        // 初始化缩放参数等
        function initZoom(opts) {
            this.currentScale = 1;
            this.zoomFactor = opts.zoomFactor || 2;
        }
        function startHandler(evt) {
            if (this.useZoom) {
                var node = this.els[1].querySelector('img');
                var transform = getComputedTranslate(node);
                this.startTouches = getTouches(evt.targetTouches);
                this._startX = transform.translateX - 0;
                this._startY = transform.translateY - 0;
                this.currentScale = transform.scaleX;
                this.zoomNode = node;
                var pos = getPosition(node);
                if (evt.targetTouches.length === 2) {
                    this.lastTouchStart = null;
                    var touches = evt.touches;
                    var touchCenter = getCenter({
                        x: touches[0].pageX,
                        y: touches[0].pageY
                    }, {
                        x: touches[1].pageX,
                        y: touches[1].pageY
                    });
                    node.style.webkitTransformOrigin =
                    generateTransformOrigin(touchCenter.x - pos.left, touchCenter.y - pos.top);
                }
                else if (evt.targetTouches.length === 1) {
                    var time = new Date().getTime();
                    this.gesture = 0;
                    if (time - this.lastTouchStart < 300) {
                        evt.preventDefault();
                        this.gesture = 3;
                    }
                    this.lastTouchStart = time;
                }
            }
        }
        function moveHandler(evt) {
            var result = 0;
            var node = this.zoomNode;
            var device = this._device();
            if (device.hasTouch) {
                if (evt.targetTouches.length === 2 && this.useZoom) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    this._scaleImage(evt);
                    result = 2;
                }
                else if (evt.targetTouches.length === 1 && this.useZoom && this.currentScale > 1) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    this._moveImage(evt);
                    result = 1;
                }
                this.gesture = result;
                return result;
            }
        }
        function handleDoubleTap(evt) {
            var zoomFactor = this.zoomFactor || 2;
            var node = this.zoomNode;
            var pos = getPosition(node);
            this.currentScale = this.currentScale === 1 ? zoomFactor : 1;
            node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
       
        }
        // 缩放图片
        function scaleImage(evt) {
            var moveTouces = getTouches(evt.targetTouches);
            var scale = calculateScale(this.startTouches, moveTouces);
            // Object.defineProperty(evt,"scale",{"writable":true});
            var tmpscale = evt.scale || scale;
            // evt.scale = evt.scale || scale;
            var node = this.zoomNode;
            scale = this.currentScale * tmpscale < minScale ? minScale : this.currentScale * tmpscale;
            node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
        }
        function endHandler(evt) {
            var result = 0;
            if (this.gesture === 2) {
                // 双手指 todo
                this._resetImage(evt);
                result = 2;
            }
            else if (this.gesture === 1) {
                // 放大拖拽 todo
                this._resetImage(evt);
                result = 1;
            }
            else if (this.gesture === 3) {
                // 双击
                this._handleDoubleTap(evt);
                //this._resetImage(evt);
                result = 3; 
            }
            return result;
        }
        // 拖拽图片
        function moveImage(evt) {
            var node = this.zoomNode;
            var device = this._device();
            var offset = {
                X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
                Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
            };
            this.moveOffset = {
                x: this._startX + offset.X - 0,
                y: this._startY + offset.Y - 0
            };
            node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
        }
        function getPosition(element) {
            var pos = {
                left: 0,
                top: 0
            };
            do {
                pos.top += element.offsetTop || 0;
                pos.left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
            return pos;
        }
        function valueInViewScope(node, value, tag) {
            var min;
            var max;
            var pos = getPosition(node);
            viewScope = {
                start: {
                    left: pos.left,
                    top: pos.top
                },
                end: {
                    left: pos.left + node.clientWidth,
                    top: pos.top + node.clientHeight
                }
            };
            var str = tag === 1 ? 'left' : 'top';
            min = viewScope.start[str];
            max = viewScope.end[str];
            return value >= min && value <= max;
        }
        function overFlow(node, obj1) {
            var result = 0;
            var isX1In = valueInViewScope(node, obj1.start.left, 1);
            var isX2In = valueInViewScope(node, obj1.end.left, 1);
            var isY1In = valueInViewScope(node, obj1.start.top, 0);
            var isY2In = valueInViewScope(node, obj1.end.top, 0);
            if (isX1In !== isX2In && isY1In !== isY2In) {
                if (isX1In && isY2In) {
                    result = 1;
                }
                else if (isX1In && isY1In) {
                    result = 2;
                }
                else if (isX2In && isY2In) {
                    result = 3;
                }
                else {
                    result = 4;
                }
            }
            else if (isX1In === isX2In) {
                if (!isY1In && isY2In) {
                    result = 5;
                }
                else if (!isY2In && isY1In) {
                    result = 6;
                }
            }
            else if (isY1In === isY2In) {
                if (!isX1In && isX2In) {
                    result = 7;
                }
                else if (isX1In && !isX2In) {
                    result = 8;
                }
            }
            else if (isY1In === isY2In === isX1In === isX2In) {
                result = 9;
            }
            return result;
        }
        function resetImage(evt) {
            if (this.currentScale === 1) {
                return;
            }
            // var node = this.zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
            var node = this.zoomNode;
            var left;
            var top;
            var trans;
            var w;
            var h;
            var pos;
            var start;
            var end;
            var parent;
            var flowTag;
            trans = getComputedTranslate(node);
            parent = node.parentNode;
            w = node.clientWidth * trans.scaleX;
            h = node.clientHeight * trans.scaleX;
            pos = getPosition(node);
            start = {
                left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
                top: (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
            };
            end = {
                left: start.left + w,
                top: start.top + h
            };
            left = start.left;
            top = start.top;
            flowTag = overFlow(parent, {
                start: start,
                end: end
            });
            switch (flowTag) {
                case 1:
                    left = viewScope.start.left;
                    top = viewScope.end.top - h;
                    break;
                case 2:
                    left = viewScope.start.left;
                    top = viewScope.start.top;
                    break;
                case 3:
                    left = viewScope.end.left - w;
                    top = viewScope.end.top - h;
                    break;
                case 4:
                    left = viewScope.end.left - w;
                    top = viewScope.start.top;
                    break;
                case 5:
                    top = viewScope.end.top - h;
                    break;
                case 6:
                    top = viewScope.start.top;
                    break;
                case 7:
                    left = viewScope.end.left - w;
                    break;
                case 8:
                    left = viewScope.start.left;
                    break;
            }
            if (w < parent.clientWidth) {
                left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
            }
            if (h < parent.clientHeight) {
                top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
            }
            node.style.webkitTransitionDuration = '100ms';
            node.style.webkitTransform =
            generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top,
            0, trans.scaleX);
        }
        this.extend({
            /**
             * @private
             * @type {Function}
             */
            _initZoom: initZoom,
            /**
             * @private
             * @type {Function}
             */
            _scaleImage: scaleImage,
            /**
             * @private
             * @type {Function}
             */
            _moveImage: moveImage,
            /**
             * @private
             * @type {Function}
             */
            _resetImage: resetImage,
            /**
             * @private
             * @type {Function}
             */
            _handleDoubleTap: handleDoubleTap,
            zoomMoveHandler: moveHandler,
            zoomEndHandler: endHandler,
            zoomStartHandler: startHandler
        });
    }

});
