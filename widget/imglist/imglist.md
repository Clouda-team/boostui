#图片列表

##基本使用
图片列表是规范的图片列容器组件，统一图片数据展示

- `blend-imglist` 总容器
- `blend-imglist-title` 容器标题
- `blend-imglist-wrapper` 序列容器
- `blend-imglist-column-{2~4}` 图片列数
- `blend-imglist-item` 图片容器

##使用演示

###不限制图片等高

<div class="doc-demo">
    <div  class="blend-imglist ">
		<div class='blend-imglist-title'>全景图 (3张)</div>
		<ul class='blend-imglist-wrapper blend-imglist-column-3'>
			<li class='blend-imglist-item'>
				<img src="http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg" />
			</li>
			<li class='blend-imglist-item'>
				<img src="http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg" />
			</li>
			<li class='blend-imglist-item'>
				<img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" />
			</li>
		</ul>
	</div>
</div>

    <div  class="blend-imglist ">
		<div class='blend-imglist-title'>全景图 (3张)</div>
		<ul class='blend-imglist-wrapper blend-imglist-column-3'>
			<li class='blend-imglist-item'>
				<img src="http://a.hiphotos.baidu.com/image/pic/item/4b90f603738da977a9aac626b251f8198618e332.jpg" />
			</li>
			<li class='blend-imglist-item'>
				<img src="http://b.hiphotos.baidu.com/image/pic/item/b8389b504fc2d5627c886ee4e51190ef76c66c33.jpg" />
			</li>
			<li class='blend-imglist-item'>
				<img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" />
			</li>
		</ul>
	</div>

###限制图片等高

<div class="doc-demo">
    <div  class="blend-imglist" id="imglist1">
        <div class='blend-imglist-title'>全景图</div>
        <ul class='blend-imglist-wrapper'>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
        </ul>
    </div>
</div>

<script>
    ;(function(){
        boost("#imglist1").imglist({"ratio": "small"});
    })();
</script>

###HTML结构

	<div class="blend-imglist">
        <div class='blend-imglist-title'>全景图</div>
        <ul class='blend-imglist-wrapper'>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
            <li class='blend-imglist-item'>
                <a href="http://www.baidu.com">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg" />
                </a>
            </li>
        </ul>
    </div>

###初始化

	<script>
	    ;(function(){
	        boost(".blend-imglist").imglist({"ratio": "small"});
	    })();
	</script>

###初始化参数说明

	options: {
        ratio: '' // 可以选择的值：normal/wide/square/small/middle/full，默认为“”，不与“blend-imglist-column-{2~4}”同时使用
    }





