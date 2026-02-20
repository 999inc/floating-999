(function(){

if(window.__vip999Loaded) return;
window.__vip999Loaded = true;

function mount(){

if(document.getElementById("vip999-wrap")) return;
if(!document.body) return;

var size = 78;

var wrap = document.createElement("div");
wrap.id = "vip999-wrap";
wrap.style.position = "fixed";
wrap.style.right = "24px";
wrap.style.bottom = "24px";
wrap.style.zIndex = "999999";
wrap.style.display = "flex";
wrap.style.flexDirection = "column";
wrap.style.alignItems = "center";

var menu = document.createElement("div");
menu.style.display = "none";
menu.style.flexDirection = "column";
menu.style.marginBottom = "14px";
menu.style.gap = "14px";

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

var main = document.createElement("div");
main.style.width = size+"px";
main.style.height = size+"px";
main.style.borderRadius = "50%";
main.style.cursor = "pointer";
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.justifyContent = "center";
main.style.userSelect = "none";
main.style.touchAction = "none";

main.style.background =
"radial-gradient(circle at 30% 30%, #fff7c0 0%, #f2d675 35%, #c9a23a 70%, #8d6b14 100%)";

main.style.boxShadow =
"0 12px 28px rgba(0,0,0,.45),"+
"inset 0 2px 6px rgba(255,255,255,.7),"+
"inset 0 -6px 12px rgba(0,0,0,.4)";

main.style.border = "2px solid rgba(255,215,120,.8)";

main.innerHTML =
"<div style='font-size:22px;font-weight:900;color:#111;'>999</div>"+
"<div style='font-size:11px;color:#4a3900;'>ONLINE</div>";

wrap.appendChild(menu);
wrap.appendChild(main);
document.body.appendChild(wrap);

main.onclick = function(){
menu.style.display =
menu.style.display==="flex"?"none":"flex";
};

}

/* 🔥 監聽 DOM 變化（SPA 專用） */

var observer = new MutationObserver(function(){
mount();
});

observer.observe(document.documentElement,{
childList:true,
subtree:true
});

mount();

})();
