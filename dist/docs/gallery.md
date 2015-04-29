# 图集(Gallery)

图集(Gallery)主要负责一系列图片的全屏浏览，支持缩放，循环浏览等功能。对于页面小图展示形式暂不考虑，通过js触发全屏浏览。

## 1. 使用演示

<style type="text/css">
	.doc-demo .blend-imglist-item img{
		width:100px;
		height:100px;
	}
</style>

<div class="doc-demo">
	<div id="gallery-wrapper1" class="blend-gallery"></div>
	<div id="gallery-wrapper2" class="blend-gallery"></div>
	<button id="gallery-btn" class="blend-button blend-button-secondary">点击展示Gallery</button>
	<hr>
	<div  class="blend-imglist" style="width:360px;">
		<div class='blend-imglist-title'>点击查看大图 (3张)</div>
		<ul class='blend-imglist-wrapper blend-imglist-column-3'>
			<li class='blend-imglist-item' data-index="0">
					<img src="http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg" />
			</li>
			<li class='blend-imglist-item' data-index="1">
					<img src="http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg" />
			</li>
			<li class='blend-imglist-item' data-index="2">
					<img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" />
			</li>
		</ul>
	</div>
</div>

<script type="text/javascript">
	;(function(){

		var list = [{
            image: "http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg",
            description:"这是第1张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg",
            description:"这是第2张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg",
            description:"这是第3张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://t12.baidu.com/it/u=4224136820,222817142&fm=32&s=CE73A55661C252F05E652DCE010070E2&w=623&h=799&img.JPEG",
            description:"这是第4张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://d.hiphotos.baidu.com/image/pic/item/00e93901213fb80e80d7d65437d12f2eb938942b.jpg",
            description:"这是第5张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://h.hiphotos.baidu.com/image/pic/item/d439b6003af33a87069d591bc45c10385343b53b.jpg",
            description:"超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！这是第6张图片啊！！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！超长的描述！！！！",
            title:"图片集"
        }];

        var list1 = [{
            image: "http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg",
            description:"这是第1张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg",
            description:"这是第2张图片啊！！！！！",
            title:"图片集"
        },{
            image: "http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg",
            description:"这是第3张图片啊！！！！！",
            title:"图片集"
        }];

        var wrapper1 = boost("#gallery-wrapper1").gallery({
            data:list,
            isLooping:true,
            initIndex:0,
        });

        var wrapper2 = boost("#gallery-wrapper2").gallery({
            data:list1,
            isLooping:true,
            infoType:1
        });

        boost("#gallery-btn").on("click",function(){
            wrapper1.gallery("show");  
        });

        boost(".blend-imglist-item").on("click",function(e){
        	var index = boost(this).data('index');
        	wrapper2.gallery('show', index);
        });

	})()
</script>

## 2. 使用方式

### HTML结构

所需要的DOM元素仅为一个空的父层节点，加上对应的class `blend-gallery`。如果需要特定的展现形式，可以自行实现。

	<div id="gallery-wrapper" class="blend-gallery"></div>


### 初始化
	
	<script type="text/javascript">
		boost("#gallery-wrapper").gallery({
			data:list,
			isLooping:false,
			...
		});
	</script>

### 初始化参数说明

	{
		data:list,				// list 为需要展示的图片信息数组，具体格式见下面说明
		isLooping: false,		// 是否能循环浏览，默认为true
		initIndex: 0,			// 初始化展示的图片索引，默认为0，第一张图片
		infoType: 1,			// 底部展示信息样式，0或者1
		useZoom: true			// 是否使用图片缩放功能，默认为false
	}

	/**
	 * 以下为list的格式
	 */
	[{
        image: "http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg",
        description:"这是第1张图片啊！！！！！",		// 图片描述
        title:"图片集"						 	// 顶部标题
    },{
        image: "http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg",
        description:"这是第2张图片啊！！！！！",
        title:"图片集"
    },
    ...
    ]

### 方法说明

-	`gallery('show',index)` 显示全屏图集，index可选，指定显示第几张图片，从0开始。


	boost("#gallery-wrapper").gallery('show',4); // 显示gallery, 并展示第五张图片

-	`gallery('hide')` 隐藏图集


	boost("#gallery-wrapper").gallery('hide');




