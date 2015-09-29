#搜索框

## 1. 使用演示
<div class="doc-demo">
	<div id="validate" class="blend-suggest">
	    <div class="blend-suggest-input">
	        <span class="blend-suggest-ico"></span>
	        <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	        <a href="javascript:;" class="blend-suggest-delete"></a>
	    </div>
	    <ul class="blend-suggest-list">
	    </ul>
	</div>
	<div class="blend-suggest-wrap" id="inputGray">
	    <div class="blend-suggest">
	       <div class="blend-suggest-input-gray">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap2 mar-t-10" id="inputGray2">
	    <div class="blend-suggest">
	        <span class="blend-suggest-arrow"></span>
	       <div class="blend-suggest-input-gray">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap mar-t-10" id="inputBlue">
	    <div class="blend-suggest">
	       <div class="blend-suggest-input-blue">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap2 mar-t-10" id="inputRed">
	    <div class="blend-suggest">
	        <span class="blend-suggest-arrow"></span>
	       <div class="blend-suggest-input-red">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
</div>

<script type="text/javascript">
	(!window.baidu) && (window.baidu = {});

	baidu.sug = function (rs){
	var sugList = [];
	boost.each(rs.s, function (index, item){
	var itemArr = item.split("{#S+_}");
	sugList.push({"name": itemArr[0]});
	});
	
	var string = "";
	boost.each(sugList, function (index, value){
	string += "<li><p>" + value["name"] + "</p><p>" + value["name"] + "</p></li>";
	});
	boost(".blend-suggest-list").html("");
	boost(".blend-suggest-list").append(string);
	boost(".blend-suggest-list").show();
	};
	
	boost('.blend-suggest').suggest({
	"url": "http://nssug.baidu.com/su?prod=zhidacenter&json=1",
	"wd": "wd",
	"callback": "callback",
	"success": baidu.sug
	});

	$("#inputBlue").suggest({});
    $("#inputRed").suggest({});
    $("#inputGray").suggest({});
    $("#inputGray2").suggest({});

</script>

## 2. 使用方式

### HTML结构
	<div class="blend-suggest">
	    <div class="blend-suggest-input">
	        <span class="blend-suggest-ico"></span>
	        <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	        <a href="javascript:;" class="blend-suggest-delete"></a>
	    </div>
	    <ul class="blend-suggest-list">
	    </ul>
	</div>
	<div class="blend-suggest-wrap" id="inputGray">
	    <div class="blend-suggest">
	       <div class="blend-suggest-input-gray">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap2 mar-t-10" id="inputGray2">
	    <div class="blend-suggest">
	        <span class="blend-suggest-arrow"></span>
	       <div class="blend-suggest-input-gray">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap mar-t-10" id="inputBlue">
	    <div class="blend-suggest">
	       <div class="blend-suggest-input-blue">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>
	<div class="blend-suggest-wrap2 mar-t-10" id="inputRed">
	    <div class="blend-suggest">
	        <span class="blend-suggest-arrow"></span>
	       <div class="blend-suggest-input-red">
	           <input class="blend-suggest-wd" type="search" placeholder="搜索您想要的直达号">
	           <a href="javascript:;" class="blend-suggest-delete"></a>
	           <span class="blend-suggest-ico"></span>
	       </div>
	    </div>
	</div>

### 初始化

样式说明：

- `blend-suggest` 默认样式
- `blend-suggest-wrap` 有搜索按钮
- `blend-suggest-wrap2` 有搜索按钮，且有向左箭头

搜索框颜色：

- `blend-suggest-input-gray` 灰色
- `blend-suggest-input-blue` 蓝色
- `blend-suggest-input-red` 红色

使用JS来初始化suggest组件

	boost('.blend-suggest').suggest({
        "url": "",
        "wd": "wd",
        "callback": "callback",
        "success": successFn
    });
	$("#inputBlue").suggest({});
    $("#inputRed").suggest({});
    $("#inputGray").suggest({});
    $("#inputGray2").suggest({});

### JS初始化参数说明

	{
        url: "", // 下拉提示接口url
        wd: "wd", // 接口中搜索词的变量名
        callback: "callback", // 接口中的回调函数变量名
        success: function (){}, // 接口成功回调
	}