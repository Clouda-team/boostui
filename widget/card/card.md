#推送消息

##基本使用
在要添加推送消息的容器元素上添加`.blend-push`，有`居左` `居中` `居右` 三种形式，分别需要添加样式：`.blend-link-left`、`.blend-link-center`、`.blend-link-right`。

推送头条消息分为两种样式：有配图、无配图。有配图的情况需要在配图、标题区块外层元素加`.blend-push-wrap`。

无配图：

<div class="doc-demo">
	<div style="width:500px;">
		<div class="blend-push">
	        <div class="blend-push-box">
	            <a href="" title="">
	                <h2 class="blend-push-title">标题文字最多16个字符</h2>
	                <p class="blend-push-assist blend-push-border">辅助信息</p>
	                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
	                <p class="blend-push-link">阅读全文</p>
	            </a>
	        </div>
	        <p class="blend-push-time">3小时前</p>
	    </div>
	</div>
</div>

	<div class="blend-push">
        <div class="blend-push-box">
            <a href="" title="">
                <h2 class="blend-push-title">标题文字最多16个字符</h2>
                <p class="blend-push-assist blend-push-border">辅助信息</p>
                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
                <p class="blend-push-link">阅读全文</p>
            </a>
        </div>
        <p class="blend-push-time">3小时前</p>
    </div>

有配图：
<div class="doc-demo">
	<div style="width:500px;">
	    <div class="blend-push">
	        <div class="blend-push-box">
	            <a href="" title="">
	                <div class="blend-push-wrap">
	                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/2.jpg" alt="">
	                    <div class="blend-push-mask">
	                        <h2 class="blend-push-title">标题文字最多16个字符</h2>
	                        <p class="blend-push-assist">辅助信息</p>
	                    </div>
	                </div>
	                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
	                <p class="blend-push-link">阅读全文</p>
	            </a>
	        </div>
	        <p class="blend-push-time">3小时前</p>
	    </div>
	</div>
</div>

	<div class="blend-push">
        <div class="blend-push-box">
            <a href="" title="">
                <div class="blend-push-wrap">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/2.jpg" alt="">
                    <div class="blend-push-mask">
                        <h2 class="blend-push-title">标题文字最多16个字符</h2>
                        <p class="blend-push-assist">辅助信息</p>
                    </div>
                </div>
                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
                <p class="blend-push-link">阅读全文</p>
            </a>
        </div>
        <p class="blend-push-time">3小时前</p>
    </div>

有文章列表时，需要在非头条文章的容器上添加`.blend-push-theme`，文字描述容器添加`.blend-push-descbox`，图片容器添加`.blend-push-img`：
<div class="doc-demo">
	<div style="width:500px;">
	    <div class="blend-push">
	        <div class="blend-push-box">
	            <a href="" title="">
	                <div class="blend-push-wrap">
	                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/2.jpg" alt="">
	                    <div class="blend-push-mask">
	                        <h2 class="blend-push-title">标题文字最多16个字符</h2>
	                        <p class="blend-push-assist">辅助信息</p>
	                    </div>
	                </div>
	                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
	            </a>
	
	            <a href="" title="" class="blend-push-theme blend-push-border">
	                <div class="blend-push-descbox">
	                    <p class="blend-push-desc">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
	                    <p class="blend-push-assist">辅助信息</p>
	                </div>
	                <img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" alt="" class="blend-push-img">
	            </a>
	
	            <a href="" title="" class="blend-push-theme blend-push-border">
	                <div class="blend-push-descbox">
	                    <p class="blend-push-desc">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
	                    <p class="blend-push-assist">辅助信息</p>
	                </div>
	                <img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" alt="" class="blend-push-img">
	            </a>
	        </div>
	        <p class="blend-push-time">3小时前</p>
	    </div>
	</div>
</div>


    <div class="blend-push">
        <div class="blend-push-box">
            <a href="" title="">
                <div class="blend-push-wrap">
                    <img src="http://clouda.baidu.com/assets/blend2/images/demo/2.jpg" alt="">
                    <div class="blend-push-mask">
                        <h2 class="blend-push-title">标题文字最多16个字符</h2>
                        <p class="blend-push-assist">辅助信息</p>
                    </div>
                </div>
                <p class="blend-push-desc blend-push-border">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
            </a>

            <a href="" title="" class="blend-push-theme blend-push-border">
                <div class="blend-push-descbox">
                    <p class="blend-push-desc">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
                    <p class="blend-push-assist">辅助信息</p>
                </div>
                <img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" alt="" class="blend-push-img">
            </a>

            <a href="" title="" class="blend-push-theme blend-push-border">
                <div class="blend-push-descbox">
                    <p class="blend-push-desc">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字</p>
                    <p class="blend-push-assist">辅助信息</p>
                </div>
                <img src="http://c.hiphotos.baidu.com/image/pic/item/4034970a304e251f17a2e38ba486c9177f3e536f.jpg" alt="" class="blend-push-img">
            </a>
        </div>
        <p class="blend-push-time">3小时前</p>
    </div>












