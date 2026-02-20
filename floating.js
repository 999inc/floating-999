(function(){

/* ===== 防止重複載入 ===== */
if(window.__VIP999__) return;
window.__VIP999__ = true;

/* ===== 等待 body ===== */
function waitBody(cb){
  if(document.body) cb();
  else setTimeout(function(){ waitBody(cb); },50);
}

waitBody(function(){

var sizeMain = 60;
var sizeChild = 44;

var wrap = document.createElement("div");
wrap.style.position = "fixed";
wrap.style.right = "18px";
wrap.style.bottom = "18px";
wrap.style.zIndex = "999999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";
wrap.style.transform = "translate3d(0,0,0)";
wrap.style.willChange = "transform";
document.body.appendChild(wrap);

/* ===== 子按鈕區 ===== */

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.gap = "10px";
menu.style.marginBottom = "8px";
menu.style.opacity = "0";
menu.style.transition = "opacity .2s ease";
wrap.appendChild(menu);

function createBtn(link, icon){
  var a = document.createElement("a");
  a.href = link;
  a.target = "_blank";
  a.style.width = sizeChild+"px";
  a.style.height = sizeChild+"px";
  a.style.borderRadius = "50%";
  a.style.overflow = "hidden";
  a.style.display = "flex";
  a.style.alignItems = "center";
  a.style.justifyContent = "center";
  a.style.boxShadow = "0 6px 14px rgba(0,0,0,.6)";

  var img = document.createElement("img");
  img.src = icon;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

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
main.style.width = sizeMain+"px";
main.style.height = sizeMain+"px";
main.style.borderRadius = "50%";
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.justifyContent = "center";
main.style.cursor = "pointer";
main.style.touchAction = "none";
main.style.userSelect = "none";

/* 黑金球體感 */
main.style.background =
"radial-gradient(circle at 30% 25%, #3a3a3a 0%, #1a1a1a 45%, #000 75%)";

main.style.boxShadow =
"0 8px 20px rgba(0,0,0,.8),"+
"inset 0 3px 6px rgba(255,255,255,.12),"+
"inset 0 -8px 14px rgba(0,0,0,.9)";

main.style.border = "1.5px solid rgba(212,175,55,.9)";

main.innerHTML =
"<div style='font-size:16px;font-weight:900;color:#d4af37;text-shadow:0 1px 1px rgba(255,255,255,.2),0 -1px 2px rgba(0,0,0,.9);'>999</div>"+
"<div style='font-size:8px;color:#bfa03a;letter-spacing:1px;'>ONLINE</div>";

wrap.appendChild(main);

/* ===== 記憶位置 ===== */

var saved = localStorage.getItem("vip999pos");
var currentX = 0;
var currentY = 0;

if(saved){
  try{
    var pos = JSON.parse(saved);
    currentX = pos.x || 0;
    currentY = pos.y || 0;
    wrap.style.transform =
      "translate3d("+currentX+"px,"+currentY+"px,0)";
  }catch(e){}
}

/* ===== 拖曳控制 ===== */

var dragging = false;
var moved = false;
var startX = 0;
var startY = 0;

main.addEventListener("pointerdown", function(e){
  dragging = true;
  moved = false;
  startX = e.clientX;
  startY = e.clientY;
  main.setPointerCapture(e.pointerId);
});

main.addEventListener("pointermove", function(e){
  if(!dragging) return;
  e.preventDefault();
  moved = true;
  currentX += e.clientX - startX;
  currentY += e.clientY - startY;
  wrap.style.transform =
    "translate3d("+currentX+"px,"+currentY+"px,0)";
  startX = e.clientX;
  startY = e.clientY;
});

main.addEventListener("pointerup", function(e){
  dragging = false;
  main.releasePointerCapture(e.pointerId);

  if(!moved){
    toggleMenu();
  }else{
    localStorage.setItem("vip999pos",
      JSON.stringify({x:currentX,y:currentY})
    );
  }
});

/* 防止手機滑動 */
document.addEventListener("touchmove", function(e){
  if(dragging) e.preventDefault();
},{passive:false});

/* ===== 展開收起 ===== */

function toggleMenu(){
  if(menu.style.display === "flex"){
    menu.style.opacity = "0";
    setTimeout(function(){ menu.style.display = "none"; },200);
  }else{
    menu.style.display = "flex";
    setTimeout(function(){ menu.style.opacity = "1"; },10);
  }
}

/* 點外部收起 */
document.addEventListener("click", function(e){
  if(!wrap.contains(e.target)){
    menu.style.opacity = "0";
    setTimeout(function(){ menu.style.display = "none"; },200);
  }
});

});

})();
