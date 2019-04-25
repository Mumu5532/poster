/*! @overbool/poster v1.0.1 | (c) 2018 Overbool | https://github.com/overbool/poster */
"use strict";

// post class
var poster = function () {
  
  var DEBUG = false;
  var WIDTH = 750;
  var HEIGHT = 1334;
  var initconfig;
  var imgArr = [];
  var logoimg,image,codeimg;

  function init(config){
    let pr =[],arr=[];
    arr = [config.contimg,config.codeimg,config.banner];
    arr.forEach(url=>{
      let p = loadimg(url)
      .then(img => imgArr.push(img))
      .catch(err => console.log(err))
      pr.push(p)
    });
    //图片全部加载完
    Promise.all(pr)
    .then(()=>{
    initconfig = config;
    logoimg = new Image();
    image = new Image(),
    codeimg = new Image();
    logoimg.setAttribute("crossOrigin",'anonymous');
    codeimg.setAttribute("crossOrigin",'anonymous');
    image.setAttribute("crossOrigin",'anonymous');
    logoimg.src = config.contimg;
    codeimg.src = config.codeimg;

    
    var $container = document.querySelector(config.selector);
    var $wrapper = createDom('div', 'id', 'wrapper');
    var $canvas = createDom('canvas', 'id', 'canvas', 'block');
    var $person = createDom('canvas', 'id', 'person');
    var $date = createDom('canvas', 'id', 'date');
    var $title = createDom('canvas', 'id', 'title');
    var $content = createDom('canvas', 'id', 'content');
    var $scenetitle = createDom('canvas', 'id', 'scenetitle');
    var $scenedesc = createDom('canvas', 'id', 'scenedesc');
    var $logo = createDom('canvas', 'id', 'logo');
    var $lone = createDom('canvas', 'id', 'lone');
    var $ltwo = createDom('canvas', 'id', 'ltwo');
    var $description = createDom('canvas', 'id', 'description');
    appendChilds($wrapper, $canvas, $person, $date, $title, $content,$scenetitle,$scenedesc, $logo, $lone,$ltwo,$description);
    $container.appendChild($wrapper);
    var date = new Date(); // day

    var dayStyle = {
      font: 'italic bold 70px Arial',
      color: 'red',
      position: 'left'
    };
    drawOneline($person, dayStyle, ''); // date

    var dateStyle = {
      font: 'italic 30px Arial',
      color: 'rgba(255, 255, 255, 1)',
      position: 'right'
    };
    drawOneline($date, dateStyle, date.getFullYear() + ' / ' + (date.getMonth() + 1)); // title canvas

    var titleStyle = {
      font: '32px Arial',
      color: '#282828',
      position: 'left'
    };
    titleStyle.font = config.titleStyle && config.titleStyle.font || titleStyle.font;
    titleStyle.color = config.titleStyle && config.titleStyle.color || titleStyle.color;
    titleStyle.position = config.titleStyle && config.titleStyle.position || titleStyle.position;
    drawOneline($title, titleStyle, config.title); // content canvas

    var contentStyle = {
      font: '24px Arial',
      lineHeight: 1.5,
      position: 'left',
      color: 'rgba(88, 88, 88, 1)'
    };
    if(config.content == ''){
      drawOneline($content, contentStyle, config.content);
    }else{
      contentStyle.font = config.contentStyle && config.contentStyle.font || contentStyle.font;
      contentStyle.color = config.contentStyle && config.contentStyle.color || contentStyle.color;
      contentStyle.lineHeight = config.contentStyle && config.contentStyle.lineHeight || contentStyle.lineHeight;
      contentStyle.position = config.contentStyle && config.contentStyle.position || contentStyle.position;
      drawMoreLines($content, contentStyle, config.content); // logo
    }

    var sentStyle = {
      font: 'bold 36px Arial',
      color: '#282828',
      position: 'left',
    };
    drawOneline($scenetitle, sentStyle, config.scenetitle); // date
    var sendStyle = {
      font: '26px Arial',
      color: '#686868',
      position: 'left',
      lineHeight:'1.3'
    };
    drawMoreLines($scenedesc, sendStyle, config.scenedesc); // date

    var logoStyle = {
      font: '30px Arial',
      position: 'left',
      color: '#282828'
    };
    logoStyle.color = config.logoStyle && config.logoStyle.color || logoStyle.color;
    drawOneline($logo, logoStyle, config.logo); // description

    var loneStyle = {
      font: '24px Arial',
      position: 'left',
      color: '#686868'
    };
    drawOneline($lone, loneStyle, config.lone); // description

    var ltwoStyle = {
      font: '24px Arial',
      position: 'left',
      color: '#686868'
    };
    drawOneline($ltwo, ltwoStyle, config.ltwo); // description

    var descriptionStyle = {
      font: '24px Arial',
      color: 'rgba(180, 180, 180, 1)',
      lineHeight: 1.1,
      position: 'center'
    };
    drawMoreLines($description, descriptionStyle, config.description); // background image

    
    var onload = function onload() {
      // console.log('iscode',iscode)
      $canvas.width = WIDTH;
      $canvas.height = HEIGHT;
      image.src = config.banner;
      $($canvas).css('display','block')
      
      //定义了各个元素的高度
      image.onload = function () {
        var ctx = $canvas.getContext('2d');
        // perctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
        ctx.drawImage(image, 0, 0, $canvas.width, $canvas.width);
        ctx.drawImage($person, 68, $canvas.height - $canvas.width+200);
        // ctx.drawImage(logoimg,68,$canvas.height - $canvas.width+210, 110 , 110);
        // ctx.drawImage($date, 0, $canvas.height / 2-50);
        ctx.drawImage($title, $person.width + 38, $canvas.height / 2 + 130);
        ctx.drawImage($content, $person.width + 38, $canvas.height / 2 + 190);
        ctx.drawImage($scenetitle, 0, $canvas.height / 2 + 290 );
        ctx.drawImage($scenedesc, 0, $canvas.height / 2 + 346);
        ctx.drawImage($logo, 0, $canvas.height - $logo.height - 120);
        ctx.drawImage($lone, 0, $canvas.height - $logo.height - 70);
        ctx.drawImage($ltwo, 0, $canvas.height - $logo.height - 20);
        ctx.drawImage(codeimg, $canvas.width - 245, $canvas.height - 218,175,175);
        ctx.strokeStyle = 'rgba(122, 122, 122, 0.5)';
        ctx.setLineDash([5, 6]);
        ctx.moveTo(0, $canvas.height / 2 + 260);
        ctx.lineTo(750, $canvas.height / 2 + 260);
        ctx.stroke();
        var img = new Image();
        img.src = $canvas.toDataURL('image/png');
        var radio = config.radio || 0.7;
        img.width = WIDTH * radio;
        img.height = HEIGHT * radio;
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        $canvas.style.display = 'none';
        $container.appendChild(img);
        $container.removeChild($wrapper);
        if (config.callback) {
          config.callback($container);
        }
      };
    };
    onload();
    })
  }

  // 预加载图片
  function loadimg(url){
    return new Promise ((resolve,reject) => {
      let img = new Image();
      img.onload = ()=> resolve(img);
      img.onerror = reject;
      img.setAttribute("crossOrigin",'anonymous');
      img.src = url;
    })
  }

  function createDom(name, key, value) {
    //修改block为none
    var display = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'block';
    var $dom = document.createElement(name);
    $dom.setAttribute(key, value);
    $dom.style.display = display;
    $dom.width = WIDTH;
    return $dom;
  }

  function appendChilds(parent) {
    for (var _len = arguments.length, doms = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      doms[_key - 1] = arguments[_key];
    }

    doms.forEach(function (dom) {
      parent.appendChild(dom);
    });
  }
  
  function drawOneline(canvas, style, content) {
    var idName = $(canvas).attr('id');
    var ctx = canvas.getContext('2d');
    if(idName == 'person'){
      canvas.width = 110;
      canvas.height = 110;
      //获取图片宽高的最小值
      logoimg.onload = function () {
        // 通过arc来绘制一个圆形区域
        ctx.arc(55, 55, 55, 0, 2 * Math.PI)
        ctx.clip()
        // ctx.drawImage(logoimg, 0, 0, 0, 0);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.height, canvas.height);
        ctx.drawImage(logoimg,0,0, 110, 110);
        // ctx.stroke();
      }
    }else if(idName == 'scenetitle'){
      canvas.height = parseInt(style.font.match(/\d+/), 10) + 20;
      ctx.font = style.font;
      ctx.fillStyle = style.color;
      ctx.textBaseline = 'top';
    }
    else{
      canvas.height = parseInt(style.font.match(/\d+/), 10) + 20;
      ctx.font = style.font;
      ctx.fillStyle = style.color;
      ctx.textBaseline = 'top';
    }


    var lineWidth = 0;
    var idx = 0;
    var truncated = false;

    for (var i = 0; i < content.length; i++) {
      lineWidth += ctx.measureText(content[i]).width;

      if (lineWidth > canvas.width - 60) {
        truncated = true;
        idx = i;
        break;
      }
    }

    var padding = 30;

    if (truncated) {
      content = content.substring(0, idx);
      padding = canvas.width / 2 - lineWidth / 2;
    }

    if (DEBUG) {
      ctx.strokeStyle = "#6fda92";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    if (style.position === 'center') {
      ctx.textAlign = 'center';
      ctx.fillText(content, canvas.width / 2, 0);
    } else if (style.position === 'left') {
      ctx.fillText(content, 56, 0);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(content, canvas.width - padding, 0);
    }
  }

  function drawMoreLines(canvas, style, content) {
    var idName = $(canvas).attr('id');
    var ctx = canvas.getContext('2d');
    var fontHeight = parseInt(style.font.match(/\d+/), 10);
    if (DEBUG) {
      ctx.strokeStyle = "#6fda92";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
    if(idName == 'content'){
      canvas.width = 430;
    }
    ctx.font = style.font;
    ctx.fillStyle = style.color;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    var alignX = 0;

    if (style.position === 'center') {
      alignX = canvas.width / 2;
    } else if (style.position === 'left') {
      ctx.textAlign = 'left';
      alignX = 56;
    } else {
      ctx.textAlign = 'right';
      alignX = canvas.width - 56;
    }

    var lineWidth = 0;
    var lastSubStrIndex = 0;
    var offsetY = 0;
    if(idName == 'scenedesc'){
      if(content.length > 72){
        content = content.substring(0, 72) + '...'
      }
    }

    for (var i = 0; i < content.length; i++) {
      lineWidth += ctx.measureText(content[i]).width;

      if (lineWidth > canvas.width - 120) {
        ctx.fillText(content.substring(lastSubStrIndex, i), alignX, offsetY);
        offsetY += fontHeight * style.lineHeight;
        lineWidth = 0;
        lastSubStrIndex = i;
      }

      if (i === content.length - 1) {
        ctx.fillText(content.substring(lastSubStrIndex, i + 1), alignX, offsetY);
      }
    }
  }

  return {
    init: init
  };

}();