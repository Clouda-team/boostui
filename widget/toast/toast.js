/**
     * @function toast(alert)
     * @name toast
     * @author wangzhonghua
     * @date 2015.02.05
     * @memberof $.fn or $.blend
     * @grammar  $('.test').toast().show('xxx'),$.blend.toast().show('xxx')
     * @desc 页面级toast(alert)
     * @param {Object} opts 组件配置（以下参数为配置项）
     * @param {String} opts.toastClass (可选, 默认值:\'\') toast节点的className
     * @param {String} opts.toastTpl (可选, 默认值:\'\') toast模板
     * @param {Interval} opts.delay (可选, 默认值:2500) 延时消失的时间,单位ms
     *
     * @example 
     * 	1、$('.j_test_toast').toast().toast('show', 'hello', 2000), $('.j_test_toast')为toast自定义节点,并不是容器,切记
     * 	2、var toast = $.blend.toast({
     * 						toastClass: 'my_define',
     * 						delay: 5000
     * 					}); 
     * 		  toast.show('hello world');
     *  3、var toast = $.blend.toast({
     * 						toastTpl: '<div class="my_define">{%content%}</div>'
     * 					});
     * 		  toast.show('hello world');
     */
    
'use strict';
$.widget("blend.toast", {
    /*配置项*/
    options: {
        toastClass: "",
        toastTpl: "",
        delay: 2500
    },
    
    /* _create 创建组件时调用一次*/
    _create: function () {
    	var options = this.options;
    	this.$el = this.element;
		this.$body = $('body');
		this.toastTpl = options.toastTpl || '<div data-' + NAMESPACE + 'widget="toast" class="' + (options.toastClass|| '') + ' ' + NAMESPACE + 'toast">{%content%}</div>';
    },
    
    /*初始化*/
    _init: function(){
    	!this.$el.length && (this.defaultSegment = true);	
    },
    /*设置延时消失*/
    _setDelay: function(delay){
    	var self = this;
    	delay = parseInt(delay, 10) || this.options.delay;
    	clearTimeout(this.timeout);
    	this.timeOut = window.setTimeout(function(){
    		self.hide();
    	}, delay);
    },
    
    /*显示toast*/
    show: function(content, delay){
    	if(!content){
    		return false;
    	}
    	if(!this.$el.length){
    		(this.$el = $(this.toastTpl.replace(/{%content%}/g, content))).appendTo(this.$body);
    	}else{
    		this.$el.html(content);
    	}
    	this._setDelay(delay);
    	return this.$el.show();
    },
    
    /*关闭toast*/
    hide: function(){
    	return this.$el.hide();
    },
    
    /*销毁toast*/
    destroy: function(){
    	if(this.defaultSegment){
    		this.$el.remove();
    		this.$el = [];
    	}
    	return this.$el;
    }
});