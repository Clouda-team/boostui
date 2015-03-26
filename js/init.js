;(function($){
    //TODO 判断UA环境,给body增加class
    $(function(){
        $("[data-blend-widget]").each(function(i, elem){
            var $elem = $(elem);
            var widgetAttr = $elem.data("blend-widget");
            var widgetNames = widgetAttr.split(",");
            var widgetNameLen = widgetNames.length;
            var index;
            var name;
            for(index = 0; index < widgetNameLen; index++){
                var name = widgetNames[index];
                if($.widget.has(name)){
                    $elem[name]();
                }else{
                    throw new Error("Unknow blend widget \"" + name + "\"");
                }
            }
        });
    });
})(Zepto)
