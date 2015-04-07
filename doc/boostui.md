##页面标记

对页面主题和内容的性质进行标记的引用

###源码

####html

	<div>
	    <span class="blend-badge">default</span>
	    <span class="blend-badge blend-badge-primary">primary</span>
	    <span class="blend-badge blend-badge-secondary">secondary</span>
	    <span class="blend-badge blend-badge-success">success</span>
	    <span class="blend-badge blend-badge-info">info</span>
	    <span class="blend-badge blend-badge-warning">warning</span>
	    <span class="blend-badge blend-badge-danger">danger</span>
	    <hr />
	    <span class="blend-badge">在线支付</span>
	    <span class="blend-badge blend-badge-empty">随订随用</span>
	    <span class="blend-badge blend-badge-empty">有效期内可退</span>
	</div>

###效果示例

![](images/badge.png)

##按钮

页面中使用的所有按钮样式

###源码

####html

	<div>
	    <button class="blend-button">default</button>
	    <button class="blend-button blend-button-primary">primary</button>
	    <button class="blend-button blend-button-secondary">secondary</button>
	    <button class="blend-button blend-button-success">success</button>
	    <button class="blend-button blend-button-info">info</button>
	    <button class="blend-button blend-button-warning">warning</button>
	    <button class="blend-button blend-button-danger">danger</button>
	    <br />
	    <a href="http://www.baidu.com" class="blend-button">在线支付</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-primary">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-secondary">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-success">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-info">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-warning">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-danger">购买</a>
	    <a href="http://www.baidu.com" class="blend-button blend-button-link">购买</a>
	    <a href="http://www.baidu.com">购买</a>
	</div>

###效果示例

![](images/button.png)

##选择框

页面中的选择框

###源码

####html

	    <div id="check1" data-blend-widget="checkbox" data-blend-checkbox= '{"type":"group","values":["1","22","333"]}'>
	        <br><br>
	        <span class="blend-checkbox blend-checkbox-default blend-checkbox-checked"></span>
	        <span class="blend-checkbox blend-checkbox-default"></span>
	        <span class="blend-checkbox blend-checkbox-default"></span>
	        <br><br>
	
	    </div>
	
	    <div id="check2" data-blend-widget="checkbox" >
	        <br><br>
	        <span class="item blend-checkbox blend-checkbox-square blend-checkbox-checked"></span>
	        <span class="item blend-checkbox blend-checkbox-square"></span>
	    </div>
	
	     <div id="check3" data-blend-widget="checkbox" data-blend-checkbox='{"type":"radio","values":["radio1","radio2","radio3"]}'>
	        <br><br>
	        <span class="blend-checkbox blend-checkbox-default"></span>
	        <span class="blend-checkbox blend-checkbox-default"></span>
	    </div>
	<br><br>
	    <button id="getData1" >获取第一组值</button>
	    <button id="getData2" >获取第二组值</button>
	    <button id="getData3" >获取第三组值</button>
	    <br>
	    <textarea id="rs"></textarea>

####Javascript

    <script>
        $(function () {
            // 选择元素
            $('#check1').checkbox();

            $('#check2').checkbox({
                "itemSelector":".item",
                "type":"radio",
                "values":["aa","b","ccc"] 
            });


            $('#check3').checkbox();



            /*$('[data-blend-widget="checkbox"]').on("checkbox:statusChange",function(data){
                console.log(data);
            });*/

            $("#getData1").on('click',function(s){
                var a = $('#check1').checkbox("getValues");
                $("#rs").val(JSON.stringify(a));

            });

            $("#getData2").on('click',function(s){
                var a = $('#check2').checkbox("getValues");
                $("#rs").val(a);

            });


            $("#getData3").on('click',function(s){
                var a = $('#check3').checkbox("getValues");
                $("#rs").val(JSON.stringify(a));

            });

        });
    </script>



###效果示例

![](images/checkbox.png)

##计数器

计数器，用作数量的加减

###源码

####html

    <div data-blend-widget="counter" data-blend-counter='{"step":2,"maxValue":10}' class="blend-counter">
        <div class="blend-counter-minus">-</div>
        <input class="blend-counter-input" type="text">
        <div class="blend-counter-plus">+</div>
    </div>

    <div data-blend-widget="counter" data-blend-counter='{"step":2,"maxValue":10}' class="blend-counter">
        <div class="blend-counter-minus">-</div>
        <input class="blend-counter-input" type="text">
        <div class="blend-counter-plus">+</div>
    </div>


####Javascript

	<script>
		// var $ = $.;
        $(function () {
            // 选择元素
            var $counter = $('[data-blend-widget="counter"]')

            // 初始化, 已经由默认初始化
            //.counter({
            //    step: 2
            //})

            //监听事件
            .on("counter:update", function (e) {
                console.log(arguments);
            })

            // 函数调用
            .counter("value", 100);

            var options = $counter.counter("option");
            console.log(options);

			console.log($counter);
            setTimeout(function () {
                $counter.counter("destroy");
                console.log("destroyed");
            }, 5000);
        });
    </script>



###效果示例

![](images/counter.png)

##对话框

用作提示的对话框

###源码

####html

	<button onclick="dialog2.show()">两个按钮dialog</button>
	<br/><br/><br/><br/><br/><br/>
	<button onclick="dialog1.show()">一个按钮dialog</button>
	
    <div data-blend-widget="dialog" class="blend-dialog blend-dialog-hidden j_test_dialog">
         <div class="blend-dialog-header"> 标题 </div>
      	 <div class="blend-dialog-body"> 内容 </div>
      	 <div class="blend-dialog-footer">
         	<a href="javascript:void(0);" class="blend-dialog-cancel">取消</a>
        	<a href="javascript:void(0);" class="blend-dialog-done">确认</a>
      	 </div>
     </div>
    </div>


####Javascript

    <script>
        var dialog1 = $.blend.dialog({
        	message: "hello world!!!",
        	cancelOnly: 1,
        	cancelText: '确定'
        });
        var dialog2 = $.blend.dialog({
        	message: "hello world!!!",
        	maskTapClose: true
        });
        $('.j_test_dialog').dialog().on('dialog:show', function(){
        	alert('show')
        }); 
    </script>




###效果示例

![](images/dialog.png)

##固定页眉页脚

可拉长的页眉页脚

###源码

####html

	<div data-blend-widget="fixedBar" class="blend-fixedBar blend-fixedBar-top">
		我是头部固定人
    </div>
    <div data-blend-widget="fixedBar" class="blend-fixedBar blend-fixedBar-bottom">
		我是尾部固定人
    </div>



####Javascript

    <script>
    	$.blend.fixedBar();
    </script>



###效果示例

![](images/fixedBar.png)


##图片集

可以滑动展示的图片集

###源码

####html

	<div id="gallery_wrapper"  class="blend-gallery" data-blend-gallery=''>
    <div id="gallery_wrapper1"  class="blend-gallery" data-blend-gallery=''>

        
    </div>

    <button id="show" class="show">click to show</button>
    <button id="show1" class="show">click to show1</button>



####Javascript

    <script type="text/javascript">

    	// var $ = blend;
        
        ;(function(){
        

            require.config({
                baseUrl: "../../../BlendUI2/src/",
                urlArgs: "_=" + +new Date()
            });


        var list = [{
            // height: 414,
            // width: 300,
            image: "http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg",
            description:"这是第1张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg",
            description:"这是第2张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg",
            description:"这是第3张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://t12.baidu.com/it/u=4224136820,222817142&fm=32&s=CE73A55661C252F05E652DCE010070E2&w=623&h=799&img.JPEG",
            description:"这是第4张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://d.hiphotos.baidu.com/image/pic/item/00e93901213fb80e80d7d65437d12f2eb938942b.jpg",
            description:"这是第5张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://h.hiphotos.baidu.com/image/pic/item/d439b6003af33a87069d591bc45c10385343b53b.jpg",
            description:"超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！",
            title:"图片集"
        }];


        var wrapper = boost("#gallery_wrapper").gallery({
            data:list,
            duration:2000,
            isLooping:true,
            useZoom:true,
            isAutoplay:false //是否自动播放
        });




        boost("#show").on("click",function(){
            wrapper.gallery("show");
            
        });


        var list1 = [{
            // height: 414,
            // width: 300,
            image: "http://be-fe.github.io/iSlider/demo/picture/imgs/long/4.jpg",
            description:"这是第4张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://be-fe.github.io/iSlider/demo/picture/imgs/long/5.jpg",
            description:"这是第5张图片啊！！！！！",
            title:"图片集"
        },{
            // height: 414,
            // width: 300,
            image: "http://be-fe.github.io/iSlider/demo/picture/imgs/long/6.jpg",
            description:"这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！",
            title:"图片集"
        }];


        /*var wrapper1 = boost("#gallery_wrapper1").gallery({
            data:list1,
            // isDebug:true,
            duration:2000,
            isLooping:true,
            useZoom:true,
            isAutoplay:false //是否自动播放
        });


        boost("#show1").on("click",function(){
            wrapper1.gallery("show");
            
        });*/

        



        /*var wrapper2 = boost(".show").gallery({
            data:list1,
            // isDebug:true,
            duration:2000,
            isLooping:true,
            useZoom:true,
            isAutoplay:false //是否自动播放
        });




        boost(".show").on("click",function(){
            console.log(boost(this));
             boost(this).gallery("show");
            // setTimeout(function(){
            //     alert("show time is up!");
            //     wrapper.gallery("hide");
            // },10000);
        });*/

            document.addEventListener("click",function(){
                console.log(121212);
            });
        })(); 

        

    </script>





###效果示例

![](images/gallery.png)

##页头

页头的样式

###源码

####html

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-action-back" href="javascript:history.back();">返回</a>
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">第二个页面</span>
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item" href="http://www.google.com">Google</a>
            <a class="blend-header-item blend-button blend-button-info" href="header.test.html">测试1</a>
        </span>
    </header>

    <a class="blend-header-item blend-button blend-button-info" href="header.test.html">测试1</a>



####Javascript

    <script>
        require.config({
            baseUrl: "../../../BlendUI2/src/",
            urlArgs: "_=" + +new Date()
        });

        //require(['blend'], function (blend) {
        //    var header = blend.create("title", {
        //        text:"header"
        //    });

        //    header.setStyle({
        //        backgroundColor:"#ff0000",
        //        color:"#cccccc"
        //    });

        //    header.addLeftItem({
        //        text: "返回",
        //        action: {
        //            operator: 'back'
        //        }
        //    });

        //    header.addRightItem({
        //        text:"菜单",
        //        action:{
        //            url: "http://www.baidu.com"
        //        }
        //    });
        //});
    </script>



###效果示例

![](images/header.png)

##列表

页面中用来展示数据的列表

###源码

####html

    <section data-blend-widget="list" class="blend-list">
        <div class="blend-list-item">
            <div class="blend-list-item-content">123</div>
            <span class="blend-list-item-delete">删除</span>
        </div>
        <div class="blend-list-item">
            <div class="blend-list-item-content">1323423</div>
            <span class="blend-list-item-delete">删除</span>
        </div>
        <div class="blend-list-item">
            <div class="blend-list-item-content">12432343</div>
            <span class="blend-list-item-delete">删除</span>
        </div>
    </section>

    <button id="revert">revert</button><br>
    <button id="add">add</button><br>
    <button id="refresh">refresh</button><br>
    <button id="destroy">destroy</button><br>
    <button id="create">create</button><br>



####Javascript

    <script>
        var $blendList = $('.blend-list').eq(0);
        $blendList.list();//.list('destroy');
        $('#revert').click(function() {
            $blendList.list('revert');
        });
        $('#add').click(function() {
            $blendList.append([
                '<div class="blend-list-item">',
                    '<div class="blend-list-item-content">12432343</div>',
                    '<span class="blend-list-item-delete">删除</span>',
                '</div>'
            ].join(''));
            $blendList.list('refresh');
        });
        $('#refresh').click(function() {
            $blendList.list('refresh');
        });
        $('#destroy').click(function() {
            $blendList.list('destroy');
        });
        $('#create').click(function() {
            $blendList.list();
        });
    </script>





###效果示例

![](images/list.png)

##加载界面

加载内容过程中的等待界面

###源码

####html

    <button onclick="triggerLoading()">打开loading</button>
    <br/><br/>
    <button onclick="closeLoading()">关闭loading</button>
    <div class="j_test_loading" style="display:none">loading</div>



####Javascript

    <script>
    	var loading = $.blend.loading();
    	function triggerLoading(){
        	loading.show();
    	}
    	function closeLoading(){
        	loading.hide();
    	}
        $('.j_test_loading').loading();
    </script>





###效果示例

![](images/loading.png)

##对话框

用作提示的对话框

###源码

####html

	<button onclick="dialog2.show()">两个按钮dialog</button>
	<br/><br/><br/><br/><br/><br/>
	<button onclick="dialog1.show()">一个按钮dialog</button>
	
    <div data-blend-widget="dialog" class="blend-dialog blend-dialog-hidden j_test_dialog">
         <div class="blend-dialog-header"> 标题 </div>
      	 <div class="blend-dialog-body"> 内容 </div>
      	 <div class="blend-dialog-footer">
         	<a href="javascript:void(0);" class="blend-dialog-cancel">取消</a>
        	<a href="javascript:void(0);" class="blend-dialog-done">确认</a>
      	 </div>
     </div>
    </div>


####Javascript

    <script>
        var dialog1 = $.blend.dialog({
        	message: "hello world!!!",
        	cancelOnly: 1,
        	cancelText: '确定'
        });
        var dialog2 = $.blend.dialog({
        	message: "hello world!!!",
        	maskTapClose: true
        });
        $('.j_test_dialog').dialog().on('dialog:show', function(){
        	alert('show')
        }); 
    </script>




###效果示例

![](images/dialog.png)

##内容面板

展示内容的面板

###源码

####html

	<div data-blend-widget="panel" class="blend-panel">
		<div class="blend-panel-header blend-panel-left">
			长途汽车:
		</div>
		<div class="blend-panel-body">
			成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
			旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
			<br/>【有效期】 2015.03.15
			<br/>【退票规则】 使用前均可提前退票
		</div>
		<div class="blend-panel-footer blend-panel-center">
			加载更多
		</div>
	</div>







###效果示例

![](images/panel.png)

##图片样式

不同的图片展示样式

###源码

####html

    <figure data-widget="picture" class="blend-picture blend-picture-default blend-picture-radius" data-picture="{}">
       <a calss="picture-link" href="http://www.baidu.com" target="_blank">
       <img src="http://c.hiphotos.baidu.com/image/pic/item/91ef76c6a7efce1b1769fdd6ac51f3deb48f656f.jpg"> 
       </a>
       <figcaption class="blend-picture-title blend-picture-title-default">bottom,带链接，default图片</figcaption>
    </figure>
    <figure data-widget="picture" class="blend-picture blend-picture-full " data-picture="{}">
       <img src="http://img5.imgtn.bdimg.com/it/u=2144620322,1877482059&fm=23&gp=0.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-default">bottom,不带链接，full图片</figcaption>
    </figure>
    <figure data-widget="picture" class="blend-picture blend-picture-full" data-picture="{}">
       <img src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-cover">黑底，不带链接，full图片</figcaption>
    </figure>
    <figure data-widget="blend-picture" class="blend-picture blend-picture-default" data-picture="{}">
        <a calss="blend-picture-link" href="http://www.baidu.com" target="_blank">
            <img src="http://c.hiphotos.baidu.com/image/pic/item/91ef76c6a7efce1b1769fdd6ac51f3deb48f656f.jpg"> 
        </a>
        <figcaption class="blend-picture-title blend-picture-title-cover">黑底，不带链接，default图片</figcaption>
    </figure>




###效果示例

![](images/picture1.png)
![](images/picture2.png)
![](images/picture3.png)

##滑动图片展示框

用作展示图片的滑动窗口

###源码

####html

    <div id="slider1" data-blend-widget="slider" class="blend-slider" data-blend-slider='{"theme":"d2"}'>
        <ul class="blend-slides">
            <li>
        	    <img src="http://img5.imgtn.bdimg.com/it/u=2144620322,1877482059&fm=23&gp=0.jpg"/>
                <div class="blend-slider-title">这是图片1的标题</div>
        	</li>
            <li>
                <img src="http://b.hiphotos.baidu.com/image/pic/item/95eef01f3a292df5b933a51fbe315c6035a873c3.jpg"/>
                <div class="blend-slider-title">这是图片2的标题</div>
            </li>
            <li>
                <a href="http://www.baidu.com" target="_blank">
                    <img src="http://a.hiphotos.baidu.com/image/pic/item/c83d70cf3bc79f3dc8225e37b8a1cd11738b29f1.jpg"/>
                </a>
                <div class="blend-slider-title">这是图片3的标题</div>  
            </li>
            <li>
                <a href="http://www.baidu.com" target="_blank">
                    <img src="http://g.hiphotos.baidu.com/image/pic/item/50da81cb39dbb6fd2ca88b260b24ab18972b373a.jpg"/>
                </a>
                <div class="blend-slider-title">这是图片4的标题</div>   
            </li>
         
        </ul>
  </div>

  <button id="prev">上一张</button>

  <button id="paused">暂停</button>

  <button id="next">下一张</button>


####Javascript

    <script>

    ;(function(){
        $("#slider1").slider();
        
        $("#next").on('click',function(){
            $("#slider1").slider('next');
        });

        $("#paused").on('click',function(){
            $("#slider1").slider('paused');
        });

        $("#prev").on('click',function(){
            $("#slider1").slider('prev');
        });

    

    })();
            
    </script>





###效果示例

![](images/slider.png)

##标签

切换容器内容的标签

###源码

####html

    <section class="blend-tab">
        <div class="blend-tab-header">
            <div class="blend-tab-header-item">我的</div>
            <div class="blend-tab-header-item">你的</div>
            <div class="blend-tab-header-active"></div>
        </div>
        <div class="blend-tab-content">
            <div class="blend-tab-content-item">我的</div>
            <div class="blend-tab-content-item">你的</div>
        </div>
    </section>

    <button id="active">active</button><br>
    <button id="destroy">destroy</button><br>
    <button id="create">create</button><br>



####Javascript

    <script>
        $('.blend-tab').tab();
        $('#active').click(function() {
            $('.blend-tab').tab('active', 1);
        });
        $('#destroy').click(function() {
            $('.blend-tab').tab('destroy');
        });
        $('#create').click(function() {
            $('.blend-tab').tab();
        });
    </script>





###效果示例

![](images/tab.png)

##导航标签

页面导航位置上，可以切换内容的标签

###源码

####html

    <nav data-blend-widget="tabnav" class="blend-tabnav blend-tabnav-dash" style="margin-bottom: 20px;">

        <a class="blend-tabnav-item blend-tabnav-item-active" href="#">
            <span class="blend-tabnav-item-text">NIHAO</span>
        </a>
        <a class="blend-tabnav-item" href="#">
            <span class="blend-tabnav-item-text">GEREN</span>
        </a>

    </nav>


    <nav data-blend-widget="tabnav" class="blend-tabnav">

        <a class="blend-tabnav-item blend-tabnav-item-active" href="#">
            <span class="blend-tabnav-item-text">NIHAO</span>
        </a>
        <a class="blend-tabnav-item" href="#">
            <span class="blend-tabnav-item-text">GEREN</span>
        </a>
        <a class="blend-tabnav-item" href="#">
            <span class="blend-tabnav-item-text">NIHAO</span>
        </a>
        <a class="blend-tabnav-item" href="#">
            <span class="blend-tabnav-item-text">GEREN</span>
        </a>

    </nav>








###效果示例

![](images/tabnav.png)

##闪现的提示内容

在页面上淡出的提示内容

###源码

####html

	<div class="j_test_toast">{%content%}</div>
	<button onclick="triggerToast()">点我，点我</button>


####Javascript

    <script>
    	function triggerToast(){
    		var toast = $.blend.toast();
        	toast.show('test', 3000);
    	}
        $('.j_test_toast').toast().toast('show', 'hello', 2000);
    </script>





###效果示例

![](images/toast.png)