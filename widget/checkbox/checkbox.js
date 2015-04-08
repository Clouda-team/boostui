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
        itemLabel:'label',
        type:'group',
        itemSelected:NAMESPACE + 'checkbox-checked',
        itemSelectAll:NAMESPACE + 'checkbox-all',
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
        this.$label = $this.find(options.itemLabel);
        this.$container = $this;
        
        console.log(options.datas);
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        this._initEvent();
    },
    _checkGroup:function (curElem){

        var that = this;
        var EventSelected = that.$container.find("." + that.options.itemSelected),
            EventSelector = that.$container.find(that.options.itemSelector);

        var eventData = {
                checked: 1
            };
            
        if (that.options.type=="radio") {
            EventSelected.removeClass(that.options.itemSelected);
            curElem.addClass(that.options.itemSelected);
        }
        else {
            if (curElem.hasClass(that.options.itemSelectAll)) {
                var checkedNum = 0;
                //判断有无已勾选
                EventSelector.each(function () {
                    checkedNum = $(this).hasClass(that.options.itemSelected) ? ++checkedNum : checkedNum;
                })
                if (checkedNum < EventSelector.length) {
                    EventSelector.each(function () {
                        $(this).addClass(that.options.itemSelected);
                    })
                }
                else {
                    EventSelected.removeClass(that.options.itemSelected);
                }
            }
            else {
                if (curElem.hasClass(that.options.itemSelected)) {
                    curElem.removeClass(that.options.itemSelected);
                    eventData.checked = 0;
                }
                else {
                    curElem.addClass(that.options.itemSelected);
                }
            }
        }
        that._trigger("checked", null, eventData);
    },
    _initEvent:function(){

        var that = this;

        if(this.options.type=="radio"){
            // radio box
            console.log(this.options);
            this.$group.on("tap", function () {
                if (that._trigger("beforechecked", null, {})) {
                    var curElem = $(this);
                    that._checkGroup(curElem)
                }
            });
            this.$label.on("tap", function () {
                if (that._trigger("beforechecked", null, {})) {
                    var curElem = that.$group.eq([that.$label.index($(this))]);
                    that._checkGroup(curElem)
                }
            });
        }else{
            this.$group.on("tap", function () {
                if (that._trigger("beforechecked", null, {})) {
                    var curElem = $(this);
                    that._checkGroup(curElem)
                    
                }
            });
            this.$label.on("tap", function () {
                if (that._trigger("beforechecked", null, {})) {
                    var curElem = that.$group.eq([that.$label.index($(this))]);
                    that._checkGroup(curElem)
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
            if($this.hasClass(NAMESPACE+"checkbox-checked") && !$this.hasClass(NAMESPACE+"checkbox-all")){
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