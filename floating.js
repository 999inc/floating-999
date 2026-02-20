(function(){

function init(){

var size = 70;
var longPressTime = 350;

var dragMode = false;
var dragging = false;
var pressTimer = null;

var startX = 0;
var startY = 0;

var currentX = 0;
var currentY = 0;

var scrollY = 0;

/* ===== 建立容器 ===== */

var wrap = document.createElement("div");
wrap.style.position = "fixed";
wrap.style.right = "24px";
wrap.style.bottom = "24px";
wrap.style.zIndex = "99999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";
wrap.style.willChange = "transform";
wrap.style.transform = "translate3d(0,0,0)";
wrap.style.touchAction = "none";

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.marginBottom = "12px";
menu.style.gap = "12px";
menu.style.opacity = "0";
menu.style.transition = "opacity .2s ease";

function createBtn(link, icon){
var a = document.createElement("a");
a.href = link;
a.target = "_blank";
a.style.width = "56px";
a.style.height = "56px";
a.style.borderRadius = "50%";
a.style.background = "#111";
a.style.border = "1px solid #C8A84A";
a.style.display = "flex";
a.style.alignItems = "center";
a.style.justifyContent = "center";
a.style.boxShadow = "0 0 10px rgba(240,207,116,.25)";

var img = document.createElement("img");
img.src = icon;
img.style.width = "22px";
img.style.height = "22px";
img.style.background = "#fff";
img.style.borderRadius = "50%";
img.style.padding = "4px";

a.appendChild(img);
return a;
}

menu.appendChild(createBtn(
"http://lin.ee/jVmFlGq",
"https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
));

menu.appendChild(createBtn(
"https://t.me/online_999_services",
"https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
));

/* ===== 主按鈕 ===== */

var main = document.createElement("div");

main.innerHTML =
"<div style='font-size:22px;font-weight:900;"+
"background:linear-gradient(180deg,#ffffff 0%,#fff3b0 30%,#e6c76d 60%,#b88922 100%);"+
"-webkit-background-clip:text;-webkit-text-fill-color:transparent;"+
"text-shadow:0 2px 2px rgba(0,0,0,.45),0 0 6px rgba(255,215,120,.6);"+
"letter-spacing:1px;'>999</div>"+
"<div style='font-size:10px;color:#C8A84A;margin-top:2px;letter-spacing:1.5px;'>ONLINE</div>";

main.style.width = size+"px";
main.style.height = size+"px";
main.style.borderRadius = "50%";
main.style.background =
"radial-gradient(circle at 35% 30%, #fff8cc 0%, #e6c76d 40%, #caa73c 70%, #8d6b17 100%)";
main.style.border = "2px solid #F0CF74";
main.style.boxShadow =
"0 0 16px rgba(255,215,100,.35),"+
"inset 0 0 10px rgba(255,255,255,.4),"+
"inset 0 -6px 10px rgba(0,0,0,.35)";
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.justifyContent = "center";
main.style.cursor = "pointer";
main.style.userSelect = "none";
main.style.touchAction = "none";

wrap.appendChild(menu);
wrap.appendChild(main);
document.body.appendChild(wrap);

/* ===== 讀取記憶位置 ===== */

var saved = localStorage.getItem("floatingPos");
if(saved){
var pos = JSON.parse(saved);
currentX = pos.x;
currentY = pos.y;
updatePosition();
}

function updatePosition(){
wrap.style.transform =
"translate3d("+currentX+"px,"+currentY+"px,0)";
}

/* ===== 手機長按拖曳 ===== */

main.addEventListener("touchstart", function(e){

var t = e.touches[0];
startX = t.clientX;
startY = t.clientY;

dragging = true;
dragMode = false;

pressTimer = setTimeout(function(){
dragMode = true;

/* 🔥 更穩定滾動鎖 */
scrollY = window.scrollY;
document.body.style.position = "fixed";
document.body.style.top = -scrollY + "px";

}, longPressTime);

},{passive:false});

main.addEventListener("touchmove", function(e){

if(!dragging || !dragMode) return;

e.preventDefault();

var t = e.touches[0];
var dx = t.clientX - startX;
var dy = t.clientY - startY;

currentX += dx;
currentY += dy;

updatePosition();

startX = t.clientX;
startY = t.clientY;

},{passive:false});

main.addEventListener("touchend", function(){

clearTimeout(pressTimer);

if(!dragMode){
toggleMenu();
}else{
snapToEdge();
savePosition();
}

/* 🔥 解鎖 */
document.body.style.position = "";
document.body.style.top = "";
window.scrollTo(0, scrollY);

dragging = false;
dragMode = false;

});

/* ===== 桌機拖曳 ===== */

main.onmousedown = function(e){
dragMode = true;
dragging = true;
startX = e.clientX;
startY = e.clientY;
};

document.onmousemove = function(e){
if(!dragging || !dragMode) return;

var dx = e.clientX - startX;
var dy = e.clientY - startY;

currentX += dx;
currentY += dy;

updatePosition();

startX = e.clientX;
startY = e.clientY;
};

document.onmouseup = function(){
if(dragMode){
snapToEdge();
savePosition();
}
dragging = false;
dragMode = false;
};

/* ===== 吸附邊緣 ===== */

function snapToEdge(){
var half = window.innerWidth / 2;
if(currentX < -half){
currentX = -window.innerWidth + size + 10;
}else if(currentX > half){
currentX = 0;
}
updatePosition();
}

/* ===== 記憶 ===== */

function savePosition(){
localStorage.setItem("floatingPos",
JSON.stringify({x: currentX,y: currentY}));
}

/* ===== 開關選單 ===== */

function toggleMenu(){
if(menu.style.display==="flex"){
menu.style.opacity="0";
setTimeout(function(){menu.style.display="none";},200);
}else{
menu.style.display="flex";
setTimeout(function(){menu.style.opacity="1";},10);
}
}

/* 點外部收起 */

document.addEventListener("click", function(e){
if(!wrap.contains(e.target)){
menu.style.opacity="0";
setTimeout(function(){menu.style.display="none";},200);
}
});

}

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded", init);
}else{
init();
}

})();
