/* globals NAMESPACE */
/**
 * @function suspend
 * @name suspend
 * @param {Object} options 组件配置（以下参数为配置项）
 * @param {String} options.addCSSClass (可选, 默认值: \'\') dialog最外层自定义class
 * @param {String} options.maskTapClose (可选, 默认值: false) mask被点击后是否关闭dialog
 * @example
 *  1、$('.suspend').suspend(), $('.suspend')为dialog自定义节点,并不是dialog的容器,切记
 *  2、var suspend = $.blend.suspend({
 *                      addCSSClass: '',
 *                      maskTapClose: true,
 *                  });
 *        suspend.show();
 */
'use strict';
$.widget('blend.suspend', {
    /*配置项*/
    options: {
        maskTapClose: true,    // 点击mask，关闭suspend
        bodyNoScroll: true
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;

        this.addCSSClass = options.addCSSClass ? options.addCSSClass : '';
        this.maskTapClose = options.maskTapClose;
        this.bodyNoScroll = options.bodyNoScroll;
        this._maskDom = $('.' + NAMESPACE + 'suspend-mask');
        this.$el = this.element;
    },
    /**
     * 初始化
     * @private
     */
    _init: function () {
        this._bindEvent();

        this.bodyNoScroll && this._handleScroll();
    },
    /**
     * 为suspend相关元素添加事件
     * @private
     */
    _bindEvent: function () {
        var self = this;
        this.$el.on('click', '.' + NAMESPACE + 'suspend-close', function () {
            self.hide();
        });

        this._maskDom.on('click', function (e) {
            e.preventDefault();
            self.maskTapClose && self.hide();
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
    },
    /**
     * 定义事件派发
     * @param {Object} event 事件对象
     * @private
     */
    _trigger: function (eventName) {
        this.$el.trigger('suspend:' + eventName);
    },
    _preventDefault: function (e) {
        e = e || window.event;
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
    },
    _stopPropagation: function (e) {
        e = e || window.event;
        e.stopPropagation && e.stopPropagation();
        e.returnValue = false;
    },
    _disableScroll: function () {
        var _preventDefault = this._preventDefault;
        document.addEventListener('mousewheel', _preventDefault);
        document.addEventListener('touchmove', _preventDefault);
    },
    _enableScroll: function () {
        var _preventDefault = this._preventDefault;
        document.removeEventListener('mousewheel', _preventDefault);
        document.removeEventListener('touchmove', _preventDefault);
    },
    _handleScroll: function () {
        var startX, startY;
        var ele = this.$el.find('.' + NAMESPACE + 'suspend-body')[0];

        if (!ele) {
            this.bodyNoScroll = false;
            return;
        }

        ele.addEventListener('touchstart',function(e){

            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });


        ele.addEventListener('touchmove',function(e){


            e.stopPropagation();

            var deltaX = e.touches[0].pageX - startX;
            var deltaY = e.touches[0].pageY - startY;


            if(Math.abs(deltaY) < Math.abs(deltaX)){
                e.preventDefault();
                return false;
            }

            //console.log(ele.clientHeight + '+' + ele.scrollTop + ':' +ele.scrollHeight);
            if (ele.clientHeight + ele.scrollTop >= ele.scrollHeight) {

                if(deltaY < 0) {
                    e.preventDefault();
                    return false;
                }                

            }else if(ele.scrollTop <= 0) {
                if(deltaY > 0) {
                    e.preventDefault();
                    return false;
                }
            }
        });
    },
    /**
     * 显示suspend
     * @param {string} content 指定show方法要展示的body内容
     * @return {Object}
     */
    show: function () {
        var self = this;

        this.bodyNoScroll && this._disableScroll();

        this.mask();
        self.$el.show();
        window.setTimeout(function () {

            self.$el.addClass(NAMESPACE + 'suspend-show');
            self._trigger('show');
            
        },50);

        return this.$el;
    },
    /**
     * 关闭dialog
     * @return {Object}
     */
    hide: function () {
        var self = this;

        this.bodyNoScroll && this._enableScroll();

        self.unmask();
        self.$el.hide();
        window.setTimeout(function () {
            self.$el.removeClass(NAMESPACE + 'suspend-show');
            self._trigger('hide');
        }, 0);

	    
        return this.$el;
    },
    /**
     * 销毁dialog
     * @return {Object}
     */
    destroy: function () {
        this.unmask();
        if (this.$el) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    },
    /**
     * 显示mask
     * @param {number} opacity 透明度
     */
    mask: function () {
        var self = this;
        this._maskDom.show();
    },
    /**
     * 关闭mask
     */
    unmask: function () {
        this._maskDom.hide();
        // this._maskDom.off('touchmove click').hide();
    }
});
