(function(){

var wrap=document.createElement("div");
wrap.style.position="fixed";
wrap.style.right="22px";
wrap.style.bottom="22px";
wrap.style.zIndex="99999";
wrap.style.display="flex";
wrap.style.flexDirection="column";
wrap.style.alignItems="center";
wrap.style.transition="opacity .3s ease";

document.body.appendChild(wrap);

/* ===== 子選單 ===== */

var menu=document.createElement("div");
menu.style.display="none";
menu.style.flexDirection="column";
menu.style.gap="14px";
menu.style.marginBottom="16px";

function child(link,icon){
var a=document.createElement("a");
a.href=link;
a.target="_blank";
a.style.width="70px";
a.style.height="70px";
a.style.borderRadius="50%";
a.style.display="flex";
a.style.alignItems="center";
a.style.justifyContent="center";
a.style.background=
"radial-gradient(circle at 50% 45%, #1e1e1e 40%, #080808 90%)";
a.style.border="1.5px solid #c9a74e";
a.style.boxShadow=
"0 0 14px rgba(214,180,92,.35), inset 0 0 12px rgba(0,0,0,.85)";
a.style.textDecoration="none";

var img=document.createElement("img");
img.src=icon;
img.style.width="26px";
img.style.height="26px";
img.style.background="#fff";
img.style.padding="6px";
img.style.borderRadius="50%";
img.style.boxShadow="inset 0 0 6px rgba(0,0,0,.4)";
a.appendChild(img);

return a;
}

menu.appendChild(child(
"http://lin.ee/jVmFlGq",
"https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
));

menu.appendChild(child(
"https://t.me/online_999_services",
"https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
));

wrap.appendChild(menu);

/* ===== 主按鈕 ===== */

var main=document.createElement("div");
main.style.width="76px";
main.style.height="76px";
main.style.borderRadius="50%";
main.style.display="flex";
main.style.alignItems="center";
main.style.justifyContent="center";
main.style.cursor="pointer";
main.style.userSelect="none";
main.style.touchAction="none";

/* 高級黑金底 */
main.style.background=
"radial-gradient(circle at 50% 45%, rgba(255,215,120,.06) 0%, #2c2c2c 45%, #151515 75%, #050505 95%)";

/* 皇室細金環 */
main.style.border="1.6px solid #d6b45c";

/* 金屬壓印層次 */
main.style.boxShadow=
"0 0 18px rgba(214,180,92,.45), "+
"inset 0 0 18px rgba(0,0,0,.9), "+
"inset 0 1px 2px rgba(255,235,150,.2), "+
"inset 0 -2px 4px rgba(0,0,0,.6)";

main.style.fontFamily="Arial,Helvetica,sans-serif";
main.style.textAlign="center";
main.style.lineHeight="1.05";

main.innerHTML=
"<div>"+
"<div style='font-size:24px;font-weight:900;letter-spacing:1px;"+
"background:linear-gradient(180deg,#fff9d6 0%,#f6e27a 35%,#e6c65c 65%,#b88922 100%);"+
"-webkit-background-clip:text;-webkit-text-fill-color:transparent;"+
"text-shadow:0 1px 1px rgba(0,0,0,.7),0 0 6px rgba(255,215,120,.35);'>999</div>"+
"<div style='font-size:8px;letter-spacing:1.6px;color:#d6b45c;margin-top:2px;'>ONLINE</div>"+
"</div>";

wrap.appendChild(main);

/* ===== 展開邏輯 ===== */

main.onclick=function(e){
e.stopPropagation();
menu.style.display=(menu.style.display==="flex")?"none":"flex";
};

document.addEventListener("click",function(e){
if(!wrap.contains(e.target)){
menu.style.display="none";
}
});

/* ===== 拖曳（桌機 + 手機） ===== */

var isDown=false;
var moved=false;
var startX=0,startY=0,offsetX=0,offsetY=0;
var threshold=6;

function startDrag(x,y){
isDown=true;
moved=false;
startX=x;
startY=y;
var rect=wrap.getBoundingClientRect();
offsetX=x-rect.left;
offsetY=y-rect.top;
wrap.style.opacity="0.6";
}

function moveDrag(x,y){
if(!isDown) return;
var dx=Math.abs(x-startX);
var dy=Math.abs(y-startY);
if(dx>threshold||dy>threshold){
moved=true;
wrap.style.left=(x-offsetX)+"px";
wrap.style.top=(y-offsetY)+"px";
wrap.style.right="auto";
wrap.style.bottom="auto";
}
}

function endDrag(){
if(!moved){
menu.style.display=(menu.style.display==="flex")?"none":"flex";
}
isDown=false;
wrap.style.opacity="1";
}

/* 桌機 */
main.onmousedown=function(e){
startDrag(e.clientX,e.clientY);
document.onmousemove=function(e2){
moveDrag(e2.clientX,e2.clientY);
};
document.onmouseup=function(){
document.onmousemove=null;
document.onmouseup=null;
endDrag();
};
};

/* 手機 */
main.addEventListener("touchstart",function(e){
var t=e.touches[0];
startDrag(t.clientX,t.clientY);
},{passive:false});

main.addEventListener("touchmove",function(e){
var t=e.touches[0];
moveDrag(t.clientX,t.clientY);
e.preventDefault();
},{passive:false});

main.addEventListener("touchend",function(){
endDrag();
});

/* ===== 閒置淡出 ===== */

var idleTimer;
function resetIdle(){
wrap.style.opacity="1";
clearTimeout(idleTimer);
idleTimer=setTimeout(function(){
wrap.style.opacity="0.5";
},3000);
}

document.addEventListener("mousemove",resetIdle);
document.addEventListener("touchstart",resetIdle);
resetIdle();

})();
