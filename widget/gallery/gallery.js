/**
 *
 * gallery 组件
 * Created by dingquan on 15-3-24.
 */

'use strict';
// var NAMESPACE = "blend-";
$.widget("blend.gallery",{
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
       
    },
    _create:function(){
        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $el = this.element;
        /**
         * 经过继承的 options
         */
        var options = this.options;
        
        if(!options.data || !options.data.length){
            throw new Error("data can not be empty");
        } 
        
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
      
      this._createMask();   //创建遮罩mask
        
      this._setting();  // 设置相关内部属性
      
      this._renderHTML();
      this._bindHandler();
        
    },
    _createMask:function(){

      if(this.mask){
        //已经初始化过mask
        return;
      }

      var mask = document.createElement("div");
      mask.classList.add(NAMESPACE+"gallery-mask");
      document.querySelector("body").appendChild(this.mask = mask);

    },
    /**
     * 根据传入options 设置内部变量
     * 
     * @return {[type]} [description]
     */
    _setting:function(){

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

        this.width = this.wrap.clientWidth;
        this.height = this.wrap.clientHeight;
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

        this.offset = this.offset || {
          X: 0,
          Y: 0
        };
        this.useZoom = opts.useZoom || false;
        // looping logic adjust
        if (this.data.length < 2) {
          this.isLooping = false;
          this.isAutoPlay = false;
        } else {
          this.isLooping = opts.isLooping || false;
          this.isAutoplay = opts.isAutoplay || false;
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
          this._initZoom(opts);
        }
        // debug mode
        this.log = opts.isDebug ? function (str) {
          window.console.log(str);
        } : function () {
        };
        // set Damping function
        this._setUpDamping();
        // stop autoplay when window blur
    //    this._setPlayWhenFocus();
        // set animate Function
        this._animateFunc = opts.animateType in this._animateFuncs ? this._animateFuncs[opts.animateType] : this._animateFuncs['default'];
       
    },
    _animateFuncs : {
        'default': function (dom, axis, scale, i, offset) {
            dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
        }
    },
    _setUpDamping:function(){
      var oneIn2 = this.scale >> 1;
      var oneIn4 = oneIn2 >> 1;
      var oneIn16 = oneIn4 >> 2;
      this._damping = function (distance) {
        var dis = Math.abs(distance);
        var result;
        if (dis < oneIn2) {
          result = dis >> 1;
        } else if (dis < oneIn2 + oneIn4) {
          result = oneIn4 + (dis - oneIn2 >> 2);
        } else {
          result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
        }
        return distance > 0 ? result : -result;
      };
    },
    /**
    * render single item html by idx
    * @param {element} el ..
    * @param {number}  i  ..
    */
    _renderItem :function (el, i) {
      var item;
      var html;
      var len = this.data.length;
      // get the right item of data
      if (!this.isLooping) {
        item = this.data[i] || { empty: true };
      } else {
        if (i < 0) {
          item = this.data[len + i];
        } else if (i > len - 1) {
          item = this.data[i - len];
        } else {
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
          html = item.height / item.width > this.ratio ? '<img  height="' + this.height + '" src="' + item.image + '">' : '<img width="' + this.width + '" src="' + item.image + '">';
        } else {
          el.style.background = 'url(' + item.image + ') 50% 50% no-repeat';
          el.style.backgroundSize = 'cover';
        }
      } else if (this.type === 'dom') {
        html = item.image;
      }
      html && (el.innerHTML = html);
    },
    /**
     * render list html
     */
    _renderHTML : function () {

      this.outer && (this.outer.innerHTML = '');
      // initail ul element
      var outer = this.outer || document.createElement('ul');
      outer.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';
      // storage li elements, only store 3 elements to reduce memory usage
      this.els = [];
      for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        li.className = this.type === 'dom' ? NAMESPACE+'gallery-dom' : NAMESPACE+'gallery-pic';
        li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
        this.els.push(li);
        // prepare style animation
        this._animateFunc(li, this.axis, this.scale, i, 0);

        if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
          this._renderItem(li, 1 - i + this.slideIndex);
        } else {
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

      if(!this.topMenu){
        this._renderTopAndBottom();
      }
      
    },
    _renderTopAndBottom:function(){

      var device = this._device();

      var topMenu = this.topMenu || document.createElement('div');
      var bottomMenu = this.bottomMenu || document.createElement('div');

      topMenu.classList.add(NAMESPACE+"gallery-top");
      bottomMenu.classList.add(NAMESPACE+"gallery-bottom");



      var topBack = this.topBack || document.createElement('span');
      topBack.classList.add(NAMESPACE+"gallery-top-back");
      topMenu.appendChild(topBack);

      topBack.addEventListener("click",(function(val){
        var that = val;

        return function (e) {
          e.preventDefault();
          that.outer.innerHTML = "";
          that.mask.style.visibility = "hidden";
        }
      })(this));


      //底部内容展示
      var bottomTitle = this.bottomTitle || document.createElement("div");
      bottomTitle.classList.add(NAMESPACE+"gallery-bottom-title");
      bottomMenu.appendChild(this.bottomTitle = bottomTitle);

      var bottomInfoWrap = this.bottomInfoWrap || document.createElement("div");
      bottomInfoWrap.classList.add(NAMESPACE+"gallery-bottom-info-wrap");


      var bottomInfo = this.bottomInfo || document.createElement("div");
      bottomInfo.classList.add(NAMESPACE+"gallery-bottom-info");


      var bottomPage = this.bottomPage || document.createElement("span");
      bottomPage.classList.add(NAMESPACE+"gallery-bottom-page");

      bottomMenu.appendChild(this.bottomPage = bottomPage);


      bottomInfoWrap.appendChild(this.bottomInfo = bottomInfo);

      bottomMenu.appendChild(bottomInfoWrap);

      this.wrap.appendChild(this.topMenu = topMenu);
      this.wrap.appendChild(this.bottomMenu = bottomMenu);

    },
    /**
     *  preload img when slideChange
     *  @param {number} dataIndex means which image will be load
     */
    _preloadImg : function (dataIndex) {
      var len = this.data.length;
      var idx = dataIndex;
      var self = this;
      var loadImg = function (index) {
        if (!self.data[index].loaded) {
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
     */
    _initLoadImg :function () {
      var data = this.data;
      var len = data.length;
      var idx = this.initIndex;
      var self = this;
      if (this.type !== 'dom' && len > 3) {
        var nextIndex = idx + 1 > len ? (idx + 1) % len : idx + 1;
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
    _play:function(){
      var self = this;
      var duration = this.duration;
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = setInterval(function () {
        self._slideTo(self.slideIndex + 1);
      }, duration);
    },
    _slideTo:function (dataIndex) {

      


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
      } else {
        if (this.isLooping) {
          this.slideIndex = n > 0 ? 0 : data.length - 1;
        } else {
          this.slideIndex = this.slideIndex;
          n = 0;
        }
      }

      console.log(this.data[this.slideIndex].description);
      this.log('pic idx:' + this.slideIndex);

      this.bottomTitle.innerText = this.data[this.slideIndex].title;
      this.bottomInfo.innerText = this.data[this.slideIndex].description;
      this.bottomPage.innerText = (this.slideIndex+1)+"/"+this.data.length;

      // keep the right order of items
      var sEle;
      if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
        if (n > 0) {
          sEle = els.pop();
          els.unshift(sEle);
        } else if (n < 0) {
          sEle = els.shift();
          els.push(sEle);
        }
      } else {
        if (n > 0) {
          sEle = els.shift();
          els.push(sEle);
        } else if (n < 0) {
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
        } else if (Math.abs(n) === 1) {
          this._renderItem(sEle, idx + n);
        }
        /*sEle.style.webkitTransition = 'none';
        sEle.style.visibility = 'hidden';
        setTimeout(function () {
          sEle.style.visibility = 'visible';
        }, 200);*/
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
    _pause:function(){
      clearInterval(this.autoPlayTimer); 
    },
    /**
     * judge the device 
     * @return {object} 时间
     */
    _device:function () {
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
    _bindHandler:function () {
      var that = this;
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
      console.log(this);

      outer.addEventListener(device.startEvt, this);
      outer.addEventListener(device.moveEvt, this);
      outer.addEventListener(device.endEvt, this);
      window.addEventListener('orientationchange', this);
    },
    handleEvent:function (evt) {
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
    _startHandler : function (evt) {
      if (this.fixPage) {
        evt.preventDefault();
      }

      var device = this._device();
      console.log(device);
      this.isMoving = true;
      this._pause();
      // this.onslidestart && this.onslidestart();
      this.log('Event: beforeslide');
      this.startTime = new Date().getTime();
      this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
      this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
      // this._startHandler && this._startHandler(evt);
    },
    _moveHandler:function (evt) {
      
      if(this.isMoving) {

        var device = this._device();
        var len = this.data.length;
        var axis = this.axis;
        var reverseAxis = this.reverseAxis;
        var offset = {
          X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
          Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
        };
        // var res = this._moveHandler ? this._moveHandler(evt) : false;
        var res = false;
        if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
          evt.preventDefault();
          this.onslide && this.onslide(offset[axis]);
          this.log('Event: onslide');
          if (!this.isLooping) {
            //未开启循环
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
    _endHandler:function (evt) {
      this.isMoving = false;
      var offset = this.offset;
      var axis = this.axis;
      var boundary = this.scale / 2;
      var endTime = new Date().getTime();
      // a quick slide time must under 300ms
      // a quick slide should also slide at least 14 px
      console.log("time:"+ (endTime - this.startTime));
      console.log("X:"+offset[axis]);
      boundary = endTime - this.startTime > 300 ? boundary : 14;
      // var res = this._endHandler ? this._endHandler(evt) : false;
      var res = false;
      var absOffset = Math.abs(offset[axis]);
      var absReverseOffset = Math.abs(offset[this.reverseAxis]);
      if (!res && offset[axis] >= boundary && absReverseOffset < absOffset) {
        this._slideTo(this.slideIndex - 1);
      } else if (!res && offset[axis] < -boundary && absReverseOffset < absOffset) {
        this._slideTo(this.slideIndex + 1);
      } else if (!res) {
        this._slideTo(this.slideIndex);
        if(this.isMenuShow){
          this._hideMenu();
        }else{
          this._showMenu();
        }
        
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
    _destroy:function () {
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
    _showMenu:function(){ 
      this.topMenu.style.webkitTransform = "translate3d(0, 0, 0)";
      this.bottomMenu.style.webkitTransform ="translate3d(0, 0, 0)";
      this.isMenuShow = true;

    },
    _hideMenu:function(){

      this.topMenu.style.webkitTransform = "translate3d(0, -40px, 0)";
      this.bottomMenu.style.webkitTransform ="translate3d(0, 100px, 0)";
      this.isMenuShow = false;
    },
    show:function(){

      //this._slideTo(val);

      this.mask.style.visibility = "visible";

      if(!this.outer.innerHTML){
        this._renderHTML();
      }

    },
    hide:function(){
      /*var $mask = $(this.wrap);
      $mask.css({visibility:"hidden"});
      $mask.find("*").css({visibility:"hidden"});*/
      //this._destroy();
      this.mask.style.visibility = "hidden";
    }
      


   
});