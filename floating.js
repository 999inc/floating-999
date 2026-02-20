if (!window.__floating999__) {

window.__floating999__ = true;

document.addEventListener("DOMContentLoaded", function(){

if(document.getElementById("floating999-wrap")) return;

var wrap=document.createElement("div");
wrap.id="floating999-wrap";
wrap.style.position="fixed";
wrap.style.right="22px";
wrap.style.bottom="22px";
wrap.style.zIndex="99999";
wrap.style.display="flex";
wrap.style.flexDirection="column";
wrap.style.alignItems="center";

document.body.appendChild(wrap);

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
a.style.background="#111";
a.style.border="1.5px solid #c9a74e";

var img=document.createElement("img");
img.src=icon;
img.style.width="26px";
img.style.height="26px";
img.style.background="#fff";
img.style.padding="6px";
img.style.borderRadius="50%";

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

var main=document.createElement("div");
main.style.width="76px";
main.style.height="76px";
main.style.borderRadius="50%";
main.style.display="flex";
main.style.alignItems="center";
main.style.justifyContent="center";
main.style.cursor="pointer";
main.style.background="#111";
main.style.border="1.6px solid #d6b45c";
main.style.color="#f6e27a";
main.style.fontWeight="900";
main.style.fontSize="22px";
main.innerHTML="999<br><span style='font-size:8px;letter-spacing:1.6px;'>ONLINE</span>";

wrap.appendChild(main);

main.onclick=function(e){
e.stopPropagation();
menu.style.display=(menu.style.display==="flex")?"none":"flex";
};

document.addEventListener("click",function(e){
if(!wrap.contains(e.target)){
menu.style.display="none";
}
});

});

}
