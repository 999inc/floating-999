(function(){

/* ===== 防止重複載入 ===== */
if(window.__vip999Loaded) return;
window.__vip999Loaded = true;

function init(){

var size = 78;
var dragging = false;
var startX = 0;
var startY = 0;
var currentX = 0;
var currentY = 0;

/* ===== 建立容器 ===== */

var wrap = document.createElement("div");
wrap.style.position = "fixed";
wrap.style.right = "24px";
wrap.style.bottom = "24px";
wrap.style.zIndex = "999999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";
wrap.style.willChange = "transform";
wrap.style.transform = "translate3d(0,0,0)";
wrap.style.transition = "opacity .3s ease";
wrap.id = "vip999-wrap";

/* ===== 子按鈕區 ===== */

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.marginBottom = "14px";
menu.style.gap = "14px";
menu.style.opacity = "0";
menu.style.transition = "opacity .2s ease";

/* 子按鈕樣式 */

function createBtn(link, icon, bg){
var a = document.createElement("a");
a.href = link;
a.target = "_blank";
a.style.width = "58px";
a.style.height = "58px";
a.style.borderRadius = "50%";
a.style.background = bg;
a.style.display = "flex";
a.style.alignItems = "center";
a.style.justifyContent = "center";
a.style.boxShadow = "0 6px 18px rgba(0,0,0,.35)";

var img = document.createElement("img");
img.src = icon;
img.style.width = "24px";
img.style.height = "24px";

a.appendChild(img);
return a;
}

menu.appendChild(createBtn(
"https://lin.ee/jVmFlGq",
"https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg",
"#00c300"
));

menu.appendChild(createBtn(
"https://t.me/online_999_services",
"https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
"#229ED9"
));

/* ===== 主按鈕 ===== */

var main = document.createElement("div");
main.style.width = size+"px";
main.style.height = size+"px";
main.style.borderRadius = "50%";
main.style.cursor = "pointer";
main.style.userSelect = "none";
main.style.touchAction = "none";
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.justifyContent = "center";

/* 皇室浮雕質感 */

main.style.background =
"radial-gradient(circle at 30% 30%, #fff7c0 0%, #f2d675 35%, #c9a23a 70%, #8d6b14 100%)";

main.style.boxShadow =
"0 12px 28px rgba(0,0,0,.45),"+
"inset 0 2px 6px rgba(255,255,255,.7),"+
"inset 0 -6px 12px rgba(0,0,0,.4)";

main.style.border = "2px solid rgba(255,215,120,.8)";

main.innerHTML =
"<div style='font-size:22px;font-weight:900;color:#111;text-shadow:0 1px 2px rgba(255,255,255,.6),0 -1px 2px rgba(0,0,0,.4);'>999</div>"+
"<div style='font-size:11px;font-weight:600;color:#4a3900;'>ONLINE</div>";

wrap.appendChild(menu);
wrap.appendChild(main);
document.body.appendChild(wrap);

/* ===== 記憶位置 ===== */

var saved = localStorage.getItem("vip999pos");
if(saved){
var pos = JSON.parse(saved);
currentX = pos.x;
currentY = pos.y;
updatePosition();
}

/* ===== 更新位置 ===== */

function updatePosition(){
wrap.style.transform =
"translate3d("+currentX+"px,"+currentY+"px,0)";
}

/* ===== 拖曳（手機 + 桌機共用）===== */

main.addEventListener("pointerdown", function(e){

dragging = true;
startX = e.clientX;
startY = e.clientY;

main.setPointerCapture(e.pointerId);

/* 鎖滾動 */
document.body.style.overflow = "hidden";

});

main.addEventListener("pointermove", function(e){

if(!dragging) return;

e.preventDefault();

var dx = e.clientX - startX;
var dy = e.clientY - startY;

currentX += dx;
currentY += dy;

updatePosition();

startX = e.clientX;
startY = e.clientY;

});

main.addEventListener("pointerup", function(e){

if(dragging){
snapToEdge();
savePosition();
}

dragging = false;
document.body.style.overflow = "";
main.releasePointerCapture(e.pointerId);

});

/* ===== 吸附邊緣 ===== */

function snapToEdge(){

var rect = wrap.getBoundingClientRect();
var mid = window.innerWidth / 2;

if(rect.left < mid){
currentX = -rect.left + 20;
}else{
currentX = window.innerWidth - rect.right - 20;
}

updatePosition();
}

/* ===== 記憶 ===== */

function savePosition(){
localStorage.setItem("vip999pos",
JSON.stringify({x: currentX,y: currentY})
);
}

/* ===== 展開收起 ===== */

function toggleMenu(){
if(menu.style.display==="flex"){
menu.style.opacity="0";
setTimeout(function(){menu.style.display="none";},200);
}else{
menu.style.display="flex";
setTimeout(function(){menu.style.opacity="1";},10);
}
}

main.addEventListener("click", function(e){
if(dragging) return;
toggleMenu();
});

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
