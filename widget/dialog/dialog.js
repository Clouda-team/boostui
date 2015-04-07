/**
     * @function dialog
     * @name dialog
     * @author wangzhonghua
     * @date 2015.02.05
     * @memberof $.fn or $.blend
     * @grammar  $('.test').dialog().show(),$.blend.dialog().show()
     * @desc 页面级dialog
     * @param {Object} options 组件配置（以下参数为配置项）
     * @param {String} options.id (可选, 默认值: 随机数) dialog id
     * @param {Interval} options.top (可选, 默认值: null) dialog 自定义top值
     * @param {String} options.addCssClass (可选, 默认值: \'\') dialog最外层自定义class
     * @param {String} options.title (可选, 默认值: 标题) dialog 标题
     * @param {String} options.message (可选, 默认值: \'\') dialog 内容
     * @param {String} options.cancelText (可选, 默认值: 取消) dialog 取消按钮的文案
     * @param {String} options.cancelClass (可选, 默认值: \'\') dialog 取消按钮的自定义class
     * @param {String} options.doneText (可选, 默认值: 确认) dialog 确认按钮的文案
     * @param {String} options.doneClass (可选, 默认值: \'\') dialog 确认按钮的自定义class
     * @param {String} options.cancelOnly (可选, 默认值: false) dialog 只显示一个按钮
     * @param {String} options.autoCloseDone (可选, 默认值: true) dialog按钮点击后是否关闭dialog
     * @param {String} options.maskTapClose (可选, 默认值: false) mask被点击后是否关闭dialog
     * 
     *
     * @example 
     * 	1、$('.dialog').dialog(), $('.dialog')为dialog自定义节点,并不是dialog的容器,切记
     * 	2、var dialog = $.blend.dialog({
     * 						title: 'my title',
     * 						message: 'my message',
     * 					}); 
     * 		  dialog.show();
     */
    
'use strict';
$.widget("blend.dialog", {
    /*配置项*/
    options: {
    	id: null,
    	top: undefined,         // 自定义dialog距离顶部距离
        addCssClass: null,
        title: "标题",          // dialog标题
        content: "",            // dialog内容
        cancelText: "取消",     // 取消按钮自定义文案
        cancelClass: "",        
        confirmText: "确认",    // 确认按钮自定义文案
        confirmClass: "",
        cancelOnly: false,      // 是否只有一个cancel按钮
        autoCloseDone: true,
        maskTapClose: false,    // 点击mask，关闭dialog
        useCustom:false,        // 使用自定义
        renderType:0            // 渲染方式，0 是DOM渲染，1是js渲染
    },
    
    /* _create 创建组件时调用一次*/
    _create: function () {
    	var options = this.options;
    	
		this.$body = $('body');
		this.id = options.id || 'dialog-' + (((1+Math.random())*0x1000)|0).toString(16),
        this.addCssClass = options.addCssClass ? options.addCssClass : "";

        this.title = options.title;
        this.content = options.content;
        this.cancelText = options.cancelText ;
        this.cancelClass = options.cancelClass;
        this.confirmText = options.confirmText ;
        this.confirmClass = options.confirmClass;
        this.cancelOnly = options.cancelOnly;
        this.autoCloseDone = options.autoCloseDone? options.autoCloseDone : true;
		this.maskTapClose = options.maskTapClose;
		this.top = options.top;
        this.useCustom = options.useCustom;
        this.renderType = options.renderType;


        this.$el = this.element;
        
    },
    
    /*初始化*/
    _init: function(){
    	
        /**
         * UIX 环境的初始化
         */
        if(IS_UIX){

            // todo
            return;
        }

        /**
         * 使用提供的默认方式
         */
        if(!this.useCustom){
            this.$el = this._createDialog();
            this._bindEvent();
        }
    },
    _createDialog:function(){

        //已经创建过dialog
        if(this.jsRendered){ 
            return this.$el;
        }
        
        //根据传递的参数
        var outerEle,curEle;
        if(this.renderType == 0){
            curEle = this.$el;
            curEle.find("."+NAMESPACE+"dialog-footer a").addClass(NAMESPACE+"dialog-btn").addClass(NAMESPACE + 'button');
            outerEle = curEle;
        }else{
            outerEle = this.getDialogHtml()
        }

        this.jsRendered = true;
        return outerEle; 
    },
    /*事件绑定*/
    _bindEvent: function(){
   		var self = this;
   		$(window).on("orientationchange resize", function () {
            self.setPosition();
        });
        this.$el.on("tap", "." + (this.cancelClass || NAMESPACE + 'dialog-cancel'), function(){
        	self._trigger('cancel');
        	self.autoCloseDone && self.hide();
        }).on("tap", "." + (this.doneClass || NAMESPACE + 'dialog-done'), function(){
        	self._trigger('done');
        	self.autoCloseDone && self.hide();
        }).on("dialog.close", function(){
        	self.hide();
        });	
    },
    
    /*定义事件派发*/
    _trigger: function(event){
    	this.$el.trigger('dialog:' + event);
    },
    
    /*生成dialog html片段*/
    getDialogHtml: function(){

        var dom = '<div class="'+ NAMESPACE + 'dialog-header">' + this.title + '</div>'
                      + '<div class="'+ NAMESPACE + 'dialog-body">' + this.content + '</div>'
                      + '<div class="'+ NAMESPACE + 'dialog-footer">'
                         +  '<a href="javascript:void(0);" class="' + this.cancelClass + ' '+ NAMESPACE + 'dialog-cancel '+ NAMESPACE + 'button">' + this.cancelText + '</a>'
                         +  (this.cancelOnly? '': '<a href="javascript:void(0);" class="' + this.confirmClass + '  '+ NAMESPACE + 'dialog-done '+ NAMESPACE + 'button '+ NAMESPACE+'dialog-btn">' + this.confirmText + '</a>')
                      + '</div>';
        this.$el.append(dom);

        return this.$el;

    },
    
    /*显示dialog*/
    show: function(){

    	var self = this;
    	if(this.lock){
    		return this.$el;
    	}
    	

        if(!this.hasRendered){
            this.$el.appendTo(this.$body);
            this.hasRendered = true;        //标记已经渲染
        }

    	this.setPosition();
    	this.mask(0.5);
    	window.setTimeout(function(){
    		self.$el.addClass(NAMESPACE + 'dialog-show');
    		self._trigger('show');
    		self.lock = false;
    	}, 50);
    	this.lock = true;
    	return this.$el;
    },
    
    /*关闭dialog*/
    hide: function () {
    	var self = this;
    	if(this.lock){
    		return this.$el;
    	}
        window.setTimeout(function(){
    		self.unmask();
    		self.lock = false;
    	}, 150);
    	this._trigger('hide');
    	this.lock = true;
        return this.$el.removeClass(NAMESPACE + 'dialog-show');
    },
    /*销毁dialog*/
    destroy: function(){
    	this.unmask();
    	if(this.$el){
    		this.$el.remove();
    		this.$el = [];
    	}
    	return this.$el;
    },
    
    /*显示mask*/
    mask: function (opacity) {
    	var self = this;
        opacity = opacity ? " style='opacity:" + opacity + ";'" : "";
        (this.maskDom = $('<div class="'+ NAMESPACE + 'dialog-mask"' + opacity + '></div>')).prependTo(this.$body);
        this.maskDom.on('tap', function(e){
        	e.preventDefault();
        	self.maskTapClose && self.hide();
        }).on('touchmove', function(e){
        	e.preventDefault();
        });
    },
    
    /*关闭mask*/
	unmask: function (){
		this.maskDom.off('touchstart touchmove').remove();
	},
	
	/*设置dialog位置*/
	setPosition: function () {
        var top = typeof this.top == 'undefined'?((window.innerHeight / 2) + window.pageYOffset) - (this.$el[0].clientHeight / 2): parseInt(this.top);
        var left = (window.innerWidth / 2) - (this.$el[0].clientWidth / 2);
        return this.$el.css({
        	top: top + "px",
        	left: left + "px"
        });
   }
});
