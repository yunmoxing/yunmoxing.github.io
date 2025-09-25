(() => {
  // <stdin>
  function showWechatQR() {
    const overlay = document.createElement("div");
    overlay.id = "wechat-qr-overlay";
    overlay.style.cssText = `
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
    `;
    const modal = document.createElement("div");
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
        max-width: 90%;
        max-height: 90%;
    `;
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "\xD7";
    closeBtn.style.cssText = `
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
    `;
    const title = document.createElement("h3");
    title.textContent = "\u5FAE\u4FE1\u4E8C\u7EF4\u7801";
    title.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-size: 18px;
        font-weight: 600;
    `;
    const qrImg = document.createElement("img");
    qrImg.src = "/img/yunxiran.png";
    qrImg.alt = "\u5FAE\u4FE1\u4E8C\u7EF4\u7801";
    qrImg.style.cssText = `
        max-width: 200px;
        max-height: 200px;
        width: auto;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;
    const tip = document.createElement("p");
    tip.textContent = "\u626B\u63CF\u4E8C\u7EF4\u7801\u6DFB\u52A0\u5FAE\u4FE1";
    tip.style.cssText = `
        margin: 15px 0 0 0;
        color: #666;
        font-size: 14px;
    `;
    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(qrImg);
    modal.appendChild(tip);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      modal.style.transform = "scale(1)";
    });
    function closeModal() {
      overlay.style.opacity = "0";
      modal.style.transform = "scale(0.8)";
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    }
    closeBtn.onclick = closeModal;
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }
  window.showWechatQR = showWechatQR;
})();
