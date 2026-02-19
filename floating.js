(function(){

var size = 72;
var idleTimer;

/* ===== 建立容器 ===== */

var wrap = document.createElement("div");
wrap.style.position = "fixed";
wrap.style.bottom = "26px";
wrap.style.right = "26px";
wrap.style.zIndex = "99999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";
wrap.style.transition = "all 0.3s ease";

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.marginBottom = "14px";
menu.style.gap = "14px";
menu.style.opacity = "0";
menu.style.transition = "opacity 0.25s ease";

/* ===== 子按鈕 ===== */

function createBtn(link, icon){
var btn = document.createElement("a");
btn.href = link;
btn.target = "_blank";
btn.style.width = "60px";
btn.style.height = "60px";
btn.style.borderRadius = "50%";
btn.style.background = "radial-gradient(circle at 30% 30%,#1c1c1c,#000)";
btn.style.display = "flex";
btn.style.alignItems = "center";
btn.style.justifyContent = "center";

var inner = document.createElement("div");
inner.style.width = "34px";
inner.style.height = "34px";
inner.style.borderRadius = "50%";
inner.style.background = "#fff";
inner.style.display = "flex";
inner.style.alignItems = "center";
inner.style.justifyContent = "center";

var img = document.createElement("img");
img.src = icon;
img.style.width = "18px";
img.style.height = "18px";

inner.appendChild(img);
btn.appendChild(inner);
return btn;
}

menu.appendChild(createBtn("http://lin.ee/jVmFlGq","https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"));
menu.appendChild(createBtn("https://t.me/online_999_services","https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"));

/* ===== 主按鈕 ===== */

var mainBtn = document.createElement("div");

mainBtn.innerHTML =
"<span style='font-size:18px;color:#FFF7D6;line-height:16px;'>999</span>" +
"<span style='font-size:11px;color:#C8A84A;line-height:12px;'>ONLINE</span>";

mainBtn.style.width = size + "px";
mainBtn.style.height = size + "px";
mainBtn.style.borderRadius = "50%";
mainBtn.style.background = "radial-gradient(circle at 40% 22%,#555,#000)";
mainBtn.style.border = "2px solid #F0CF74";
mainBtn.style.display = "flex";
mainBtn.style.flexDirection = "column";
mainBtn.style.alignItems = "center";
mainBtn.style.justifyContent = "center";
mainBtn.style.cursor = "pointer";
mainBtn.style.fontWeight = "900";

wrap.appendChild(menu);
wrap.appendChild(mainBtn);
document.body.appendChild(wrap);

/* ===== 記憶位置 ===== */

var saved = localStorage.getItem("floatingPos");
if(saved){
var pos = JSON.parse(saved);
wrap.style.bottom = "auto";
wrap.style.right = "auto";
wrap.style.left = pos.x + "px";
wrap.style.top = pos.y + "px";
}

/* ===== 拖曳（強制非 passive） ===== */

var dragging = false;
var moved = false;
var startX = 0;
var startY = 0;

mainBtn.addEventListener("touchstart", function(e){

var t = e.touches[0];
dragging = true;
moved = false;
startX = t.clientX;
startY = t.clientY;
wrap.style.opacity = "0.85";
clearTimeout(idleTimer);

}, { passive:false });


mainBtn.addEventListener("touchmove", function(e){

if(!dragging) return;

e.preventDefault();   // 🔥 關鍵阻止滑動

var t = e.touches[0];
var dx = t.clientX - startX;
var dy = t.clientY - startY;

if(Math.abs(dx)>4 || Math.abs(dy)>4){

moved = true;

wrap.style.bottom = "auto";
wrap.style.right = "auto";

var maxX = window.innerWidth - size;
var maxY = window.innerHeight - size;

var newX = (parseInt(wrap.style.left)|| (window.innerWidth-size-26)) + dx;
var newY = (parseInt(wrap.style.top)|| (window.innerHeight-size-26)) + dy;

if(newX<0)newX=0;
if(newY<0)newY=0;
if(newX>maxX)newX=maxX;
if(newY>maxY)newY=maxY;

wrap.style.left = newX + "px";
wrap.style.top = newY + "px";

startX = t.clientX;
startY = t.clientY;
}

}, { passive:false });


mainBtn.addEventListener("touchend", function(){

if(moved){
snap();
save();
}else{
toggle();
}

wrap.style.opacity="1";
dragging=false;

}, { passive:false });

/* ===== 吸附與特效 ===== */

function snap(){
var maxX = window.innerWidth - size;
var current = parseInt(wrap.style.left)||0;

if(current < maxX/2){
wrap.style.left = "0px";
}else{
wrap.style.left = maxX + "px";
}

wrap.style.transform="scale(0.85)";
wrap.style.opacity="0.6";

idleTimer=setTimeout(function(){
wrap.style.opacity="0.4";
},3000);
}

function save(){
var rect = wrap.getBoundingClientRect();
localStorage.setItem("floatingPos", JSON.stringify({
x: rect.left,
y: rect.top
}));
}

function toggle(){
if(menu.style.display==="flex"){
menu.style.opacity="0";
setTimeout(function(){menu.style.display="none";},200);
}else{
menu.style.display="flex";
setTimeout(function(){menu.style.opacity="1";},10);
}
}

})();
