(function(){

var size = 70;
var longPressTime = 350;
var dragMode = false;
var dragging = false;
var moved = false;
var startX = 0;
var startY = 0;
var pressTimer = null;

/* ===== 建立容器 ===== */

var wrap = document.createElement("div");
wrap.style.position = "fixed";
wrap.style.bottom = "24px";
wrap.style.right = "24px";
wrap.style.zIndex = "99999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";
wrap.style.transition = "all .25s ease";

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.marginBottom = "12px";
menu.style.gap = "12px";
menu.style.opacity = "0";
menu.style.transition = "opacity .2s ease";

/* ===== 子按鈕 ===== */

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

/* ===== 主按鈕 ===== */

var main = document.createElement("div");
main.innerHTML =
"<div style='font-size:19px;font-weight:900;color:#fff;'>999</div>"+
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

wrap.appendChild(menu);
wrap.appendChild(main);
document.body.appendChild(wrap);

/* ===== 記憶位置 ===== */

var saved = localStorage.getItem("floatingPos");
if(saved){
var pos = JSON.parse(saved);
wrap.style.bottom = "auto";
wrap.style.right = "auto";
wrap.style.left = pos.x+"px";
wrap.style.top = pos.y+"px";
}

/* ===== 長按進入拖曳模式 ===== */

main.addEventListener("touchstart", function(e){

var t = e.touches[0];
startX = t.clientX;
startY = t.clientY;
dragging = true;
moved = false;
dragMode = false;

pressTimer = setTimeout(function(){
dragMode = true;
wrap.style.opacity = "0.85";
}, longPressTime);

},{passive:false});

main.addEventListener("touchmove", function(e){

if(!dragging || !dragMode) return;

e.preventDefault();  // 🔥 只有長按後才阻止滑動

var t = e.touches[0];
var dx = t.clientX - startX;
var dy = t.clientY - startY;

if(Math.abs(dx)>4 || Math.abs(dy)>4){

moved = true;

if(!wrap.style.left){
var rect = wrap.getBoundingClientRect();
wrap.style.left = rect.left+"px";
wrap.style.top = rect.top+"px";
wrap.style.bottom = "auto";
wrap.style.right = "auto";
}

wrap.style.left = (wrap.offsetLeft + dx)+"px";
wrap.style.top = (wrap.offsetTop + dy)+"px";

startX = t.clientX;
startY = t.clientY;
}

},{passive:false});

main.addEventListener("touchend", function(){

clearTimeout(pressTimer);

if(!dragMode){
toggleMenu();
}else{
snap();
savePosition();
}

dragging = false;
dragMode = false;
wrap.style.opacity = "1";

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

wrap.style.bottom="auto";
wrap.style.right="auto";
wrap.style.left=(wrap.offsetLeft+dx)+"px";
wrap.style.top=(wrap.offsetTop+dy)+"px";

startX=e.clientX;
startY=e.clientY;
};

document.onmouseup = function(){
if(dragMode){
snap();
savePosition();
}
dragging=false;
dragMode=false;
};

/* ===== 吸附邊緣 ===== */

function snap(){
var maxX = window.innerWidth - size;
var current = wrap.offsetLeft;

if(current < maxX/2){
wrap.style.left="0px";
}else{
wrap.style.left=maxX+"px";
}
}

/* ===== 記憶位置 ===== */

function savePosition(){
var rect = wrap.getBoundingClientRect();
localStorage.setItem("floatingPos", JSON.stringify({
x: rect.left,
y: rect.top
}));
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

/* 點外部收起 */

document.addEventListener("click", function(e){
if(!wrap.contains(e.target)){
menu.style.opacity="0";
setTimeout(function(){menu.style.display="none";},200);
}
});

})();
