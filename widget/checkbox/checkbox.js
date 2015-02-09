/**
 * checkbox  组件
 * Created by dingquan on 15-2-1.
 */

'use strict';

$.widget("blend.checkbox",{
	/**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
		itemSelector:'.'+ NAMESPACE +'checkbox',
        type:'group',
    },
    _create:function(){

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $this = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;


        this.$group = $this.find(options.itemSelector); //
        this.$container = $this;
        
        console.log(options.datas);
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        this._initEvent();
    },
    _initEvent:function(){

        var that = this;
        if(this.options.type=="radio"){
            // radio box
            console.log(this.options);
            this.$group.on("tap", function () {
                var curElem = $(this);
                that.$container.find("."+ NAMESPACE +"checkbox-checked").removeClass(NAMESPACE+"checkbox-checked");
                curElem.addClass(NAMESPACE+"checkbox-checked");              
            });
        }else{
            this.$group.on("tap", function () {
                var curElem = $(this);
                if(curElem.hasClass(NAMESPACE+"checkbox-checked")){
                    curElem.removeClass(NAMESPACE+"checkbox-checked");
                }else{
                    curElem.addClass(NAMESPACE+"checkbox-checked");              
                }
            });
        }
    },
    /**
     *	
     * 	
     */
    getValues:function(){
        var $this, valArr = [],val;
        var elems = this.$group;
        for(var i=0;i<elems.length;i++){
            $this = $(elems[i]);
            if($this.hasClass(NAMESPACE+"checkbox-checked")){
                val = this.options.values[i];
                valArr.push(this.options.values[i]);
            }
        }
        if(this.options.type=="radio"){
            return val; 
        }else {
            return valArr;  
        }
    }

});