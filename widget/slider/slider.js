/**
 *
 * Slider  组件
 * Created by dingquan on 15-2-3.
 */

'use strict';

$.widget("blend.slider",{
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        autoSwipe:true,         //自动滚动,默认开启
        continuousScroll:true,  //连续滚动
        axisX:true,             //滚动方向,默认x轴滚动
        transitionType : 'ease',//过渡类型
        duration:0.6,
        speed:2000,             //切换的时间间隔
        theme:"default",
        needDirection:false,    //是否需要左右切换的按钮
        ratio:"100%"
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

        $('.'+NAMESPACE+'slider:after').css('padding-top',options.ratio);

        this.$container = $el;
        this.$ul = $el.find('.'+NAMESPACE+'slides');     
        this.$li = $el.find('.'+NAMESPACE+'slides li');

        this.liWidth = this.$li.width();
        this.liHeight = this.$li.height();
        this.liLength = this.$li.length;

        this.autoScroll = null;     //自动播放interval对象
        this._index = 0;            //当前幻灯片位置


        
        if(typeof options.theme !== 'string'){
            options.theme = 'default';
        }

        this._addComponents(options.theme);
        
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {

        var opts = this.options;
        var that = this;
        var $ul = this.$ul,
            $li = this.$li;

        // 连续滚动，需要复制dom
        if(opts.continuousScroll){
            $ul.prepend($li.last().clone()).append($li.first().clone());
            if(opts.axisX){
                that._fnTranslate($ul.children().first(),that.liWidth*-1);
                that._fnTranslate($ul.children().last(),that.liWidth*that.liLength);
            }else{
                that._fnTranslate($ul.children().first(),that.liHeight*-1);
                that._fnTranslate($ul.children().last(),that.liHeight*that.liLength);
            }
        }

        // 给初始图片定位
        if(opts.axisX){
            $li.each(function(i){
                that._fnTranslate($(this),that.liWidth*i);
            });
        }else{
            $li.each(function(i){
                that._fnTranslate($(this),that.liHeight*i);
            });
        }

        that._fnAutoSwipe()

        this._initEvent();
        //this._initView();
    },
    _initEvent:function(){
        var that = this;

        // 绑定触摸
        
        var hammer = new Hammer(this.$container[0]);

        hammer.on('panstart',function(e){
            console.log('begin');
            console.log(e.center);
            

            that.start_x = e.center.x;
            that.start_y = e.center.y;
        });


        hammer.on('panmove',function(e){


            if(that.options.autoSwipe){
                clearInterval(that.autoScroll);
            }

            var cur_x = that.cur_x = e.center.x;
            var cur_y = that.cur_y = e.center.y;

            that.move_x = that.cur_x - that.start_x;
            that.move_y = that.cur_y - that.start_y;

            that._fnTransition(that.$ul,0);

            if(that.options.axisX){
                console.log(-(that.liWidth * (parseInt(that._index)) - that.move_x));
                that._fnTranslate(that.$ul,-(that.liWidth * (parseInt(that._index)) - that.move_x));  
            }

        });

        hammer.on('panend',function(e){
             
            var opts = that.options;
            var _touchDistance = 50;

            if(opts.axisX){
                that.moveDistance = that.move_x;
            }else{
                that.moveDistance = that.move_y;
            }

            // 距离小
            if(Math.abs(that.moveDistance) <= _touchDistance){
                that._fnScroll(.3);
            // 距离大
            }else{
                // 手指触摸上一屏滚动
                if(that.moveDistance > _touchDistance){
                    that._fnMovePrev();
                    that._fnAutoSwipe();
                // 手指触摸下一屏滚动
                }else if(that.moveDistance < -_touchDistance){
                    that._fnMoveNext();
                    that._fnAutoSwipe();
                }
            }

            that.move_x = 0;
            that.move_y = 0;
            
        });
       
    },
    _addComponents:function(theme){
        var $el = this.$container;

        if(theme == "a1"){
            $el.addClass(NAMESPACE+"slider-a1");

            this._initControl();
        }

        if(theme == "a2"){
            $el.addClass(NAMESPACE+"slider-a2");

            this._initControl();
        }

        if(theme == "d1"){
            $el.addClass(NAMESPACE+"slider-title");
        }

        if(theme == "d2"){
            $el.addClass(NAMESPACE+"slider-title");
            this._initControl();

        }


    },
    _initControl:function(){
        var $el = this.$container;
        var liLength = this.liLength;

        var html = "";
        for(var i=0;i<liLength;i++){
            html += (i==0)?"<li><a class='"+NAMESPACE+"slider-active'></a></li>":"<li><a></a></li>";
        }

        var $ol = $("<ol class='"+NAMESPACE+"slider-control-nav'>"+html+"</ol>");

        $el.append($ol);

        this.$controlOl = $ol;

    },
    _initTitle:function(){
        // var $el = this.$container;
    },
    /*
     *  css 过渡
     */
    _fnTransition:function(dom,num){
        var opts = this.options;

        dom.css({
            '-webkit-transition':'all '+num+'s '+opts.transitionType,
            'transition':'all '+num+'s '+opts.transitionType
        });
    },
    /**
     * css 滚动
     * @param  {[type]} dom    [description]
     * @param  {[type]} result [description]
     * @return null
     * 
     */
    _fnTranslate:function(dom,result){

        var opts = this.options;
        // console.log(dom);
        // console.log(+new Date());

        if(opts.axisX){
            dom.css({
                '-webkit-transform':'translate3d(' + result + 'px,0,0)',
                'transform':'translate3d(' + result + 'px,0,0)'
            });
        }else{
            dom.css({
                '-webkit-transform':'translate3d(0,' + result + 'px,0)',
                'transform':'translate3d(0,' + result + 'px,0)'
            });
        }
    },
    // 下一屏滚动
    _fnMoveNext:function(){
        
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
    // 上一屏滚动
    _fnMovePrev:function(){
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
    _fnAutoSwipe:function(){
        var that = this;
        var opts = this.options;

        if(opts.autoSwipe){
            this.autoScroll = setInterval(function(){
                that._fnMoveNext();
            },opts.speed);
        }
    },
    _fnMove:function(){
        var that = this;
        var opts = this.options;
        var _vars = this._vars;
        var _liLength = this.liLength;

        if(opts.continuousScroll){
            if(that._index >= that.liLength){
                console.log("333");
                that._fnScroll(.3);
                that._index = 0;
                setTimeout(function(){
                    that._fnScroll(0);
                },300);
            }else if(that._index < 0){
                that._fnScroll(.3);
                that._index = that.liLength-1;
                setTimeout(function(){
                    that._fnScroll(0);
                },300);
            }else{
                that._fnScroll(.3);
            }
        }else{
            if(that._index >= that.liLength){
                that._index = 0;
            }else if(that._index < 0){
                that._index = that.liLength-1;
            }
            that._fnScroll(.3);
        }

        that._setDotActive();   

        //callback(_index);
    },
    _fnScroll:function(num){
        var $ul = this.$ul;
        var _index = this._index;
        var _liWidth = this.liWidth;
        var _liHeight = this.liHeight;
        var opts = this.options;

        this._fnTransition($ul,num);
        if(opts.axisX){
            this._fnTranslate($ul,-_index*_liWidth);
        }else{
            this._fnTranslate($ul,-_index*_liHeight);
        }
    },
    _setDotActive:function(){
        this.$controlOl.find('li a').removeClass(NAMESPACE+'slider-active');
        this.$controlOl.find('li').eq(this._index).find('a').addClass(NAMESPACE+'slider-active');
    },
    //下一张幻灯片
    next:function(){
        this._fnMoveNext();
    },
    //上一张幻灯片
    prev:function(){
        this._fnMovePrev();
    },

    paused:function(){
        clearInterval(this.autoScroll);
    }
    

});