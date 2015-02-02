/**
     * @function toast(alert)
     * @name toast
     * @memberof $.fn or $.boost
     * @grammar  $('.test').toast().show('xxx'),$.boost.toast().show('xxx')
     * @desc 页面级toast(alert)
     * @param {Object} opts 组件配置（以下参数为配置项）
     * @param {String} opts.toastClass (可选, 默认值:\'\') toast节点的className
     * @param {String} opts.toastTpl (可选, 默认值:\'\') toast模板
     * @param {Interval} opts.delay (可选, 默认值:2500) 延时消失的时间,单位ms
     *
     * @example 
     * 	1、$('.test').toast().show('hello world', 2000), $('.test')为toast自定义节点,并不是容器,切记
     * 	2、var toast = $.boost.toast({
     * 						toastClass: 'my_define',
     * 						delay: 5000
     * 					}); 
     * 		  toast.show('hello world');
     *  3、var toast = $.boost.toast({
     * 						toastTpl: '<div class="my_define">{%content%}</div>'
     * 					});
     * 		  toast.show('hello world');
     */
    
'use strict';
$.widget("boost.toast", {
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
		this.toastTpl = options.toastTpl || '<div data-boost-widget="toast" class="' + (options.toastClass|| '') + ' boost-toast">{%content%}</div>';
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
    
    /*移除toast*/
    remove: function(){
    	this.$el.remove();
    	return this.$el = [];
    }
});