#盒子布局

##基本使用
给所示容器添加`.blend-flexbox`,子项目添加`.blend-flexbox-item`

- `blend-flexbox` flexbox容器
- `blend-flexbox-item` flexbox子项

<div class="doc-demo">
    <style type="text/css">
        .blend-flexbox{
              -webkit-box-pack: justify;
              background-color: #ccc
        }
        .blend-flexbox div:nth-child(2n){
            padding: 5px;
            background-color: #eee;
        }
        .blend-flexbox div:nth-child(2n+1){
            padding: 5px;
            background-color: #ddd;
        }
    </style>
    <div class="blend-flexbox">
        <div class="blend-flexbox-item">子项1</div>
        <div class="blend-flexbox-item">子项2</div>
        <div class="blend-flexbox-item">子项3</div>
        <div class="blend-flexbox-item">子项4</div>
    </div>
</div>


    <div class="blend-flexbox">
        <div class="blend-flexbox-item">子项1</div>
        <div class="blend-flexbox-item">子项2</div>
        <div class="blend-flexbox-item">子项3</div>
        <div class="blend-flexbox-item">子项4</div>
    </div>



##子项所占比例
添加`.blend-flexbox-ratio{n}` n代表宽度所占比例，默认为1

- `blend-flexbox-ratio` 默认比例
- `blend-flexbox-ratio{2~10}` 占2~10比例


<div class="doc-demo">
    <div class="blend-flexbox">
        <div class="blend-flexbox-item blend-flexbox-ratio">1</div>
        <div class="blend-flexbox-item blend-flexbox-ratio2">2</div>
        <div class="blend-flexbox-item blend-flexbox-ratio3">3</div>
        <div class="blend-flexbox-item blend-flexbox-ratio4">4</div>
        <div class="blend-flexbox-item blend-flexbox-ratio5">5</div>
        <div class="blend-flexbox-item blend-flexbox-ratio6">6</div>
        <div class="blend-flexbox-item blend-flexbox-ratio7">7</div>
        <div class="blend-flexbox-item blend-flexbox-ratio8">8</div>
    </div>
</div>

    <div class="blend-flexbox">
        <div class="blend-flexbox-item blend-flexbox-ratio">1</div>
        <div class="blend-flexbox-item blend-flexbox-ratio2">2</div>
        <div class="blend-flexbox-item blend-flexbox-ratio3">3</div>
        <div class="blend-flexbox-item blend-flexbox-ratio4">4</div>
        <div class="blend-flexbox-item blend-flexbox-ratio5">5</div>
        <div class="blend-flexbox-item blend-flexbox-ratio6">6</div>
        <div class="blend-flexbox-item blend-flexbox-ratio7">7</div>
        <div class="blend-flexbox-item blend-flexbox-ratio8">8</div>
    </div>











