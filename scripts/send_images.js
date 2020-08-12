(function () {
  /* globals chrome */
  'use strict';



  // function loadJS(url, success) {
  //           var domScript = document.createElement('script');
  //           domScript.src = url;
  //           success = success || function () {};
  //           domScript.onload = domScript.onreadystatechange = function () {
  //               if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
  //                   success();
  //                   this.onload = this.onreadystatechange = null;
  //                   this.parentNode.removeChild(this);
  //               }
  //           }
  //           document.getElementsByTagName('head')[0].appendChild(domScript);
  //       }
  // loadJS("/lib/zepto.js");

    // <script src="/lib/zepto.js"></script>
    // <script src="/lib/jquery.nouislider/jquery.nouislider.js"></script>
    // <script src="/lib/jss.js"></script>

    // <script src="/scripts/defaults.js"></script>
    // <script src="/scripts/popup.js"></script>
    // 
    // 

setTimeout(init,100);

function init(){
  var video1 =document.getElementsByClassName('video-stream')[0]
  if(video1){
    console.log("extension init")
    realInit()
  }else{
     console.log("waiting document loading")
    setTimeout(init,100)
  }
}

function realInit(){

var video =document.getElementsByClassName('video-stream')[0]
var buttonContainer=document.getElementsByClassName("ytp-chrome-controls")[0];
var leftContainer=document.getElementsByClassName("ytp-left-controls")[0];


var temp = document.createElement("div")
temp.innerHTML="<button id='ytb-btn' class='ytp-button' style='text-align: center;width:120px;background: transparent;border-style: none;display: inline-block;vertical-align: top;padding: 0 5px; white-space: nowrap;line-height: 35px;'  >Portrait</button>"
var btn1 =temp.firstElementChild
temp.innerHTML="<button id='loop-btn' class='ytp-button' style='text-align: center;width:120px;background: transparent;border-style: none;display: inline-block;vertical-align: top;padding: 0 5px; white-space: nowrap;line-height: 35px;'  >Loop</button>"
var btn2 =temp.firstElementChild
buttonContainer.insertBefore(btn1,leftContainer)
buttonContainer.insertBefore(btn2,leftContainer)

video.addEventListener('play',function(){
            console.log("开始播放");
                toogle();
                console.log(video.src)
          
        });

video.addEventListener('ended', function () {
           console.log('结束播放');
       });

video.addEventListener('timeupdate', function (e) {
           // console.log('timeupdate');
           // video.currentTime=10;
           var length =video.duration;
           var current =video.currentTime;
           // console.log(length)
           // console.log(e)
           if(Math.abs(length-current)<8&&loop){
              video.currentTime=0.1;
           }
       });

document.getElementById('ytb-btn').addEventListener('click',showMsg,false)
document.getElementById('loop-btn').addEventListener('click',loops,false)


window.addEventListener('resize',onResize,false)

console.log("extension load success")
}



// buttonContainer.innerHTML=buttonContainer.innerHTML+
// var button ="<button class="ytp-play-button ytp-button" aria-label="暂停 (k)" title="暂停 (k)"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-210"></use><path class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="ytp-id-210"></path></svg></button>"

  var containerStyle='transform-origin: 540px 960px;transform: rotate(90deg)';
  var fullVideoStyle='width: 1920px;height: 1080px;left: -420px;top: 420px;';

var enable=false;


// var normalVieoStyle=video.attributes.style.value;
var flag =false
var loop =false
function toNormal(){
  document.getElementById('ytb-btn').innerText="Portrait"
   document.getElementsByClassName('html5-video-container')[0].removeAttribute('style',containerStyle)
  // document.getElementsByClassName('video-stream')[0].setAttribute('style',normalVieoStyle)
}

function fullscreen() {
  document.getElementById('ytb-btn').innerText="Landscape "
  document.getElementsByClassName('html5-video-container')[0].setAttribute('style',containerStyle)
  document.getElementsByClassName('video-stream')[0].setAttribute('style',fullVideoStyle)
}


function toogle(){
  if(!enable) return
    if(flag){
      fullscreen()
    }else{
      toNormal()
    }
}





document.onkeydown=function(e){
  console.log(e.keyCode)
  if(e.keyCode==82){
      flag=!flag
      toogle()
  }

}

function showMsg(){
  flag=!flag
  toogle()
}

function loops(){
    loop=!loop
    if(loop){
      document.getElementById('loop-btn').innerText="SINGLE"
    }else{
     document.getElementById('loop-btn').innerText="LOOP"
    }
}


function onResize(){
  var width =window.innerWidth;
  var height =window.innerHeight;
  if(height>width){
    enable =true;
  }else{
    enable=false;
  }
  console.log('resize')
}

function onLoad(){
  console.log('onLoad')
}



 
  // console.log(document.getElementsByClassName('html5-video-container'))
}());
