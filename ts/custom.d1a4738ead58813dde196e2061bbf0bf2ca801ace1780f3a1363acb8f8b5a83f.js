(()=>{function d(){let e=document.createElement("div");e.id="wechat-qr-overlay",e.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;let t=document.createElement("div");t.style.cssText=`
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
        max-width: 90%;
        max-height: 90%;
    `;let n=document.createElement("button");n.innerHTML="\xD7",n.style.cssText=`
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        color: #999;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;let i=document.createElement("h3");i.textContent="\u5FAE\u4FE1\u4E8C\u7EF4\u7801",i.style.cssText=`
        margin: 0 0 15px 0;
        color: #333;
        font-size: 18px;
        font-weight: 600;
    `;let o=document.createElement("img");o.src="/img/yunxiran.png",o.alt="\u5FAE\u4FE1\u4E8C\u7EF4\u7801",o.style.cssText=`
        max-width: 200px;
        max-height: 200px;
        width: auto;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;let a=document.createElement("p");a.textContent="\u626B\u63CF\u4E8C\u7EF4\u7801\u6DFB\u52A0\u5FAE\u4FE1",a.style.cssText=`
        margin: 15px 0 0 0;
        color: #666;
        font-size: 14px;
    `,t.appendChild(n),t.appendChild(i),t.appendChild(o),t.appendChild(a),e.appendChild(t),document.body.appendChild(e),requestAnimationFrame(()=>{e.style.opacity="1",t.style.transform="scale(1)"});function s(){e.style.opacity="0",t.style.transform="scale(0.8)",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)}n.onclick=s,e.onclick=c=>{c.target===e&&s()};let r=c=>{c.key==="Escape"&&(s(),document.removeEventListener("keydown",r))};document.addEventListener("keydown",r)}window.showWechatQR=d;})();
