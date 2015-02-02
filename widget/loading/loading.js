/**
     * @function loading
     * @name loading
     * @memberof $.fn or $.boost
     * @grammar  $('.test').loading().show(),$.boost.loading().show()
     * @desc 页面级loading
     * @param {Object} opts 组件配置（以下参数为配置项）
     * @param {String} opts.loadingClass (可选, 默认值:\'\') loading节点的className
     * @param {String} opts.loadingHtml (可选, 默认值:\'\') loading节点
     *
     * @example 
     * 	1、$('.test').loading().show(), $('.test')为loading自定义节点,并不是容器,切记
     * 	2、var loading = $.boost.loading({
     * 						loadingClass: 'my_define'
     * 					});
     * 		  loading.show();
     *  3、var loading = $.boost.loading({
     * 						loadingHtml: '<div class="my_define">loading...</div>'
     * 					});
     * 		  loading.show();
     */
    
'use strict';
$.widget("boost.loading", {
	/*配置项*/
    options: {
        loadingClass: "",
        loadingHtml: ""
    },
    
    /* _create 创建组件时调用一次*/
    _create: function () {
    	var options = this.options;
    	this.$el = this.element;
		this.$body = $('body');
		this.loadingHtml = options.loadingHtml || '<div data-boost-widget="loading" class="' + (options.loadingClass|| '') + ' boost-loading"></div>';
    },
    
    /*显示loading*/
    show: function(){
    	if(!this.$el.length){
    		(this.$el = $(this.loadingHtml)).appendTo(this.$body);
    	}
    	return this.$el.show();
    },
    
    /*关闭loading*/
    hide: function(){
    	return this.$el.hide();
    },
    
    /*移除loading*/
    remove: function(){
    	this.$el.remove();
    	return this.$el = [];
    }
});