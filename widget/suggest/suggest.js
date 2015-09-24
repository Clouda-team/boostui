/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file suggest 组件
 */

$.widget('blend.suggest', {
    /**
     * 组件的默认选项
     */
    options: {
        inputClass: NAMESPACE + 'suggest-wd',
        delBtnClass: NAMESPACE + 'suggest-delete',
        listClass: NAMESPACE + 'suggest-list',
        // 下拉提示接口url
        url: "",
        // 接口中搜索词的变量名
        wd: "wd",
        // 接口中的回调函数变量名
        callback: "callback",
        // 接口成功回调
        success: function (){},
        // 接口失败回调
        errorFn: function (){}

    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var _suggest = this;
        _suggest._initEvent();
    },
    /**
     * 初始化事件
     * @private
     */
    _initEvent: function () {
        var _suggest = this;
        var $el = _suggest.element;
        var options = _suggest.options;
        _suggest.$input = $el.find('.' + options.inputClass);
        options.url && (_suggest.$list = $el.find('.' + options.listClass));
        _suggest.$del = $el.find('.' + options.delBtnClass);
        
        //输入内容时显示提示list
        _suggest.$input.on("input", function (){
            var txt = this.value;
            if (txt === ""){
                _suggest.$del.hide();
                options.url && _suggest.$list.hide();
            }else{
                _suggest.$del.show();
                options.url && _suggest.renderSuggest(txt);
            }
        });
        
        //点击叉，删除搜索词
        _suggest.$del.on("click", function (){
            _suggest.$input.val("");
            $(this).hide();
            options.url && _suggest.$list.hide();
        });
    },
    /**
     * 渲染提示list
     * @private
     */
    renderSuggest: function (txt) {
        //this.element.find('.' + this.options.listClass).show();

        // 接口要求:url是接口url, 参数：wd=输入的文字, callback=回调
        var _url = this.options.url;
        var _wd = this.options.wd;
        var _callback = this.options.callback;
        var _success = this.options.success;
        var _error = this.options.errorFn;
        _url += _url.indexOf("?") > -1 ? "&" + _callback + "=?" : "?" + _callback + "=?";
        var json = {};
        json[_wd] = encodeURIComponent(txt);
        $.ajax({
            url: _url,
            data: json,
            dataType: 'jsonp',
            success: function(data, status, xhr) {
                _success(data, status, xhr);
            },
            error: function(xhr, type) {
                _error(xhr, type);
            }
        });
    }

});
