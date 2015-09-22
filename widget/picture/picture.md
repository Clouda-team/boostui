#图片

##基本使用
在要应用图片样式的外层元素上添加样式`blend-picture`，再设置相应的宽度和标题样式。

##图片宽度

- `blend-picture-default` 左右分别是10px的边距
- `blend-picture-full` 宽度为100%

##图片圆角样式

- `blend-picture-radius` 图片是圆角

##标题样式

- `blend-picture-title-default` 标题在图片下边
- `blend-picture-title-cover` 标题覆盖在图片底部

##使用演示

<div class="doc-demo" style="width:500px;">
    <figure class="blend-picture blend-picture-default blend-picture-radius">
       <a calss="picture-link" href="http://www.baidu.com" target="_blank">
       		<img src="/assets/blend2/images/demo/2.jpg"> 
       </a>
       <figcaption class="blend-picture-title blend-picture-title-default">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-full ">
       <img src="/assets/blend2/images/demo/2.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-default">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-full">
       <img src="/assets/blend2/images/demo/2.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-cover">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-default">
        <a calss="blend-picture-link" href="http://www.baidu.com" target="_blank">
        	<img src="/assets/blend2/images/demo/2.jpg"> 
        </a>
        <figcaption class="blend-picture-title blend-picture-title-cover">这里是图片说明</figcaption>
    </figure>
</div>

##HTML结构

    <figure class="blend-picture blend-picture-default blend-picture-radius">
       <a calss="picture-link" href="http://www.baidu.com" target="_blank">
          <img src="/assets/blend2/images/demo/2.jpg"> 
       </a>
       <figcaption class="blend-picture-title blend-picture-title-default">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-full ">
       <img src="/assets/blend2/images/demo/2.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-default">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-full">
       <img src="/assets/blend2/images/demo/2.jpg"> 
       <figcaption class="blend-picture-title blend-picture-title-cover">这里是图片说明</figcaption>
    </figure>
    <figure class="blend-picture blend-picture-default">
        <a calss="blend-picture-link" href="http://www.baidu.com" target="_blank">
          <img src="/assets/blend2/images/demo/2.jpg"> 
        </a>
        <figcaption class="blend-picture-title blend-picture-title-cover">这里是图片说明</figcaption>
    </figure>