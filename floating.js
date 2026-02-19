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
a.style.background = "#000";
a.style.display = "flex";
a.style.alignItems = "center";
a.style.justifyContent = "center";

var img = document.createElement("img");
img.src = icon;
img.style.width = "20px";
img.style.height = "20px";

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

var main = document.createElement("div");
main.innerHTML =
"<div style='font-size:20px;font-weight:900;color:#fff;'>999</div>"+
"<div style='font-size:11px;color:#C8A84A;'>ONLINE</div>";

main.style.width = size+"px";
main.style.height = size+"px";
main.style.borderRadius = "50%";
main.style.background = "#111";
main.style.border = "2px solid #F0CF74";
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

/* ===== 更新位置（GPU） ===== */

function updatePosition(){
wrap.style.transform =
"translate3d("+currentX+"px,"+currentY+"px,0)";
}

/* ===== 長按拖曳（手機） ===== */

main.addEventListener("touchstart", function(e){

var t = e.touches[0];
startX = t.clientX;
startY = t.clientY;

dragging = true;
dragMode = false;

pressTimer = setTimeout(function(){
dragMode = true;
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
JSON.stringify({
x: currentX,
y: currentY
}));
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
