if (window.__vip999__) return;
window.__vip999__ = true;

(function(){

var wrap=document.createElement("div");
wrap.id="vip999-wrap";
wrap.style.position="fixed";
wrap.style.right="22px";
wrap.style.bottom="22px";
wrap.style.zIndex="99999";
wrap.style.display="flex";
wrap.style.flexDirection="column";
wrap.style.alignItems="center";

document.body.appendChild(wrap);

/* ===== 主按鈕（極簡測試版）===== */

var main=document.createElement("div");
main.style.width="70px";
main.style.height="70px";
main.style.borderRadius="50%";
main.style.display="flex";
main.style.alignItems="center";
main.style.justifyContent="center";
main.style.background="#111";
main.style.border="2px solid gold";
main.style.color="gold";
main.style.fontWeight="900";
main.innerHTML="999";

wrap.appendChild(main);

})();
