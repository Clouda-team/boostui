/**
     * @function dialog
     * @name dialog
     * @memberof $.fn or $.blend
     * @grammar  $('.test').dialog().show(),$.boost.dialog().show()
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
     * 	1、$('.dialog').dialog().show(), $('.dialog')为dialog自定义节点,并不是dialog的容器,切记
     * 	2、var dialog = $.boost.dialog({
     * 						title: 'my title',
     * 						message: 'my message',
     * 					}); 
     * 		  dialog.show();
     */
    
'use strict';
$.widget("boost.dialog", {
    /*配置项*/
    options: {
    	id: null,
    	top: null,
        addCssClass: null,
        title: null,
        message: null,
        cancelText: null,
        cancelClass: null,
        doneText: null,
        doneClass: null,
        cancelOnly: false,
        autoCloseDone: true,
        maskTapClose: false,
    },
    
    /* _create 创建组件时调用一次*/
    _create: function () {
    	var options = this.options;
    	this.$el = this.element;
		this.$body = $('body');
		this.id = options.id || (((1+Math.random())*0x1000)|0).toString(16),
        this.addCssClass = options.addCssClass ? options.addCssClass : "";
        this.title = options.title || "标题";
        this.message = options.message || "";
        this.cancelText = options.cancelText || "取消";
        this.cancelClass = options.cancelClass || "";
        this.doneText = options.doneText || "确认";
        this.doneClass = options.doneClass || "";
        this.cancelOnly = options.cancelOnly || false;
        this.autoCloseDone = options.autoCloseDone !== undefined ? options.autoCloseDone : true;
		this.maskTapClose = options.maskTapClose || false;
		this.top = options.top;
		this.defaultDialogHtml = this.$el.length? '': this.getDefaultDialogHtml();
    },
    
    /*初始化*/
    _init: function(){
    	this.$el.length && this._bindEvent();
    },
    
    /*事件绑定*/
    _bindEvent: function(){
   		var self = this;
   		$(window).on("orientationchange resize", function () {
            self.setPosition();
        });
        this.$el.on("tap", "." + (this.cancelClass || 'blend-dialog-cancel'), function(){
        	self.$el.trigger('dialog.cancel');
        	self.autoCloseDone && self.hide();
        }).on("tap", "." + (this.doneClass || 'blend-dialog-done'), function(){
        	self.$el.trigger('dialog.done');
        	self.autoCloseDone && self.hide();
        }).on("dialog.close", function(){
        	self.hide();
        });	
    },
    
    /*生成dialog html片段*/
    getDefaultDialogHtml: function(){
	    return '<div data-blend-widget="dialog" id="' + this.id + '" class="blend-dialog blend-dialog-hidden'+ this.addCssClass + '">'
	                  + '<div class="blend-dialog-header">' + this.title + '</div>'
	                  + '<div class="blend-dialog-body">' + this.message + '</div>'
	                  + '<div class="blend-dialog-footer">'
	                     +  '<a href="javascript:void(0);" class="' + this.cancelClass + ' blend-dialog-cancel">' + this.cancelText + '</a>'
	                     +  (this.cancelOnly? '': '<a href="javascript:void(0);" class="' + this.doneClass + '  blend-dialog-done">' + this.doneText + '</a>')
	                  + '</div>'
	             +'</div>';
    },
    
    /*显示dialog*/
    show: function(){
    	var self = this;
    	if(!this.$el.length){
    		(this.$el = $(this.defaultDialogHtml)).appendTo(this.$body);
    		this._bindEvent();
    	}
    	this.setPosition();
    	this.mask(0.5);
    	window.setTimeout(function(){
    		self.$el.removeClass('blend-dialog-hidden').trigger('dialog.show');
    	}, 50);
    	return this.$el;
    },
    
    /*关闭dialog*/
    hide: function () {
    	var self = this;
        window.setTimeout(function(){
    		self.unmask();
    	}, 200);
        return this.$el.addClass('blend-dialog-hidden').trigger('dialog.hide');
    },
    
    /*移除dialog*/
    remove: function(){
    	this.$el.remove();
    	this.unmask();
    	return this.$el = [];
    },
    
    /*显示mask*/
    mask: function (opacity) {
    	var self = this;
        opacity = opacity ? " style='opacity:" + opacity + ";'" : "";
        (this.maskDom = $("<div class='blend-mask'" + opacity + "></div>")).prependTo(this.$body);
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
        var top = typeof this.top == 'undefined'?((window.innerHeight / 2.5) + window.pageYOffset) - (popup[0].clientHeight / 2): parseInt(this.top);
        var left = (window.innerWidth / 2) - (this.$el[0].clientWidth / 2);
        return this.$el.css({
        	top: top + "px",
        	left: left + "px"
        });
   }
});
