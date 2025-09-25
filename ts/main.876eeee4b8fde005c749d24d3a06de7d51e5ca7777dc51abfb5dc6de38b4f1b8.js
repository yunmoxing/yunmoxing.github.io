(() => {
  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\themes\hugo-theme-stack-3.30.0\assets\ts\gallery.ts
  var StackGallery = class _StackGallery {
    galleryUID;
    items = [];
    constructor(container, galleryUID = 1) {
      if (window.PhotoSwipe == void 0 || window.PhotoSwipeUI_Default == void 0) {
        console.error("PhotoSwipe lib not loaded.");
        return;
      }
      this.galleryUID = galleryUID;
      _StackGallery.createGallery(container);
      this.loadItems(container);
      this.bindClick();
    }
    loadItems(container) {
      this.items = [];
      const figures = container.querySelectorAll("figure.gallery-image");
      for (const el of figures) {
        const figcaption = el.querySelector("figcaption"), img = el.querySelector("img");
        let aux = {
          w: parseInt(img.getAttribute("width")),
          h: parseInt(img.getAttribute("height")),
          src: img.src,
          msrc: img.getAttribute("data-thumb") || img.src,
          el
        };
        if (figcaption) {
          aux.title = figcaption.innerHTML;
        }
        this.items.push(aux);
      }
    }
    static createGallery(container) {
      const images = container.querySelectorAll("img.gallery-image");
      for (const img of Array.from(images)) {
        const paragraph = img.closest("p");
        if (!paragraph || !container.contains(paragraph)) continue;
        if (paragraph.textContent.trim() == "") {
          paragraph.classList.add("no-text");
        }
        let isNewLineImage = paragraph.classList.contains("no-text");
        if (!isNewLineImage) continue;
        const hasLink = img.parentElement.tagName == "A";
        let el = img;
        const figure = document.createElement("figure");
        figure.style.setProperty("flex-grow", img.getAttribute("data-flex-grow") || "1");
        figure.style.setProperty("flex-basis", img.getAttribute("data-flex-basis") || "0");
        if (hasLink) {
          el = img.parentElement;
        }
        el.parentElement.insertBefore(figure, el);
        figure.appendChild(el);
        if (img.hasAttribute("alt")) {
          const figcaption = document.createElement("figcaption");
          figcaption.innerText = img.getAttribute("alt");
          figure.appendChild(figcaption);
        }
        if (!hasLink) {
          figure.className = "gallery-image";
          const a = document.createElement("a");
          a.href = img.src;
          a.setAttribute("target", "_blank");
          img.parentNode.insertBefore(a, img);
          a.appendChild(img);
        }
      }
      const figuresEl = container.querySelectorAll("figure.gallery-image");
      let currentGallery = [];
      for (const figure of figuresEl) {
        if (!currentGallery.length) {
          currentGallery = [figure];
        } else if (figure.previousElementSibling === currentGallery[currentGallery.length - 1]) {
          currentGallery.push(figure);
        } else if (currentGallery.length) {
          _StackGallery.wrap(currentGallery);
          currentGallery = [figure];
        }
      }
      if (currentGallery.length > 0) {
        _StackGallery.wrap(currentGallery);
      }
    }
    /**
     * Wrap adjacent figure tags with div.gallery
     * @param figures 
     */
    static wrap(figures) {
      const galleryContainer = document.createElement("div");
      galleryContainer.className = "gallery";
      const parentNode = figures[0].parentNode, first = figures[0];
      parentNode.insertBefore(galleryContainer, first);
      for (const figure of figures) {
        galleryContainer.appendChild(figure);
      }
    }
    open(index) {
      const pswp = document.querySelector(".pswp");
      const ps = new window.PhotoSwipe(pswp, window.PhotoSwipeUI_Default, this.items, {
        index,
        galleryUID: this.galleryUID,
        getThumbBoundsFn: (index2) => {
          const thumbnail = this.items[index2].el.getElementsByTagName("img")[0], pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      });
      ps.init();
    }
    bindClick() {
      for (const [index, item] of this.items.entries()) {
        const a = item.el.querySelector("a");
        a.addEventListener("click", (e) => {
          e.preventDefault();
          this.open(index);
        });
      }
    }
  };
  var gallery_default = StackGallery;

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\themes\hugo-theme-stack-3.30.0\assets\ts\menu.ts
  var slideUp = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    window.setTimeout(() => {
      target.classList.remove("show");
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideDown = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.removeProperty("display");
    target.classList.add("show");
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  };
  function menu_default() {
    const toggleMenu = document.getElementById("toggle-menu");
    if (toggleMenu) {
      toggleMenu.addEventListener("click", () => {
        if (document.getElementById("main-menu").classList.contains("transiting")) return;
        document.body.classList.toggle("show-menu");
        slideToggle(document.getElementById("main-menu"), 300);
        toggleMenu.classList.toggle("is-active");
      });
    }
  }

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\themes\hugo-theme-stack-3.30.0\assets\ts\colorScheme.ts
  var StackColorScheme = class {
    localStorageKey = "StackColorScheme";
    currentScheme;
    systemPreferScheme;
    constructor(toggleEl) {
      this.bindMatchMedia();
      this.currentScheme = this.getSavedScheme();
      if (window.matchMedia("(prefers-color-scheme: dark)").matches === true)
        this.systemPreferScheme = "dark";
      else
        this.systemPreferScheme = "light";
      this.dispatchEvent(document.documentElement.dataset.scheme);
      if (toggleEl)
        this.bindClick(toggleEl);
      if (document.body.style.transition == "")
        document.body.style.setProperty("transition", "background-color .3s ease");
    }
    saveScheme() {
      localStorage.setItem(this.localStorageKey, this.currentScheme);
    }
    bindClick(toggleEl) {
      toggleEl.addEventListener("click", (e) => {
        if (this.isDark()) {
          this.currentScheme = "light";
        } else {
          this.currentScheme = "dark";
        }
        this.setBodyClass();
        if (this.currentScheme == this.systemPreferScheme) {
          this.currentScheme = "auto";
        }
        this.saveScheme();
      });
    }
    isDark() {
      return this.currentScheme == "dark" || this.currentScheme == "auto" && this.systemPreferScheme == "dark";
    }
    dispatchEvent(colorScheme) {
      const event = new CustomEvent("onColorSchemeChange", {
        detail: colorScheme
      });
      window.dispatchEvent(event);
    }
    setBodyClass() {
      if (this.isDark()) {
        document.documentElement.dataset.scheme = "dark";
      } else {
        document.documentElement.dataset.scheme = "light";
      }
      this.dispatchEvent(document.documentElement.dataset.scheme);
    }
    getSavedScheme() {
      const savedScheme = localStorage.getItem(this.localStorageKey);
      if (savedScheme == "light" || savedScheme == "dark" || savedScheme == "auto") return savedScheme;
      else return "auto";
    }
    bindMatchMedia() {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) {
          this.systemPreferScheme = "dark";
        } else {
          this.systemPreferScheme = "light";
        }
        this.setBodyClass();
      });
    }
  };
  var colorScheme_default = StackColorScheme;

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\themes\hugo-theme-stack-3.30.0\assets\ts\scrollspy.ts
  function debounced(func) {
    let timeout;
    return () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(() => func());
    };
  }
  var headersQuery = ".article-content h1[id], .article-content h2[id], .article-content h3[id], .article-content h4[id], .article-content h5[id], .article-content h6[id]";
  var tocQuery = "#TableOfContents";
  var navigationQuery = "#TableOfContents li";
  var activeClass = "active-class";
  function scrollToTocElement(tocElement, scrollableNavigation) {
    let textHeight = tocElement.querySelector("a").offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
  }
  function buildIdToNavigationElementMap(navigation) {
    const sectionLinkRef = {};
    navigation.forEach((navigationElement) => {
      const link = navigationElement.querySelector("a");
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        sectionLinkRef[href.slice(1)] = navigationElement;
      }
    });
    return sectionLinkRef;
  }
  function computeOffsets(headers) {
    let sectionsOffsets = [];
    headers.forEach((header) => {
      sectionsOffsets.push({ id: header.id, offset: header.offsetTop });
    });
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    return sectionsOffsets;
  }
  function setupScrollspy() {
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
      console.warn("No header matched query", headers);
      return;
    }
    let scrollableNavigation = document.querySelector(tocQuery);
    if (!scrollableNavigation) {
      console.warn("No toc matched query", tocQuery);
      return;
    }
    let navigation = document.querySelectorAll(navigationQuery);
    if (!navigation) {
      console.warn("No navigation matched query", navigationQuery);
      return;
    }
    let sectionsOffsets = computeOffsets(headers);
    let tocHovered = false;
    scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
    scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));
    let activeSectionLink;
    let idToNavigationElement = buildIdToNavigationElementMap(navigation);
    function scrollHandler() {
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      let newActiveSection;
      sectionsOffsets.forEach((section) => {
        if (scrollPosition >= section.offset - 20) {
          newActiveSection = document.getElementById(section.id);
        }
      });
      let newActiveSectionLink;
      if (newActiveSection) {
        newActiveSectionLink = idToNavigationElement[newActiveSection.id];
      }
      if (newActiveSection && !newActiveSectionLink) {
        console.debug("No link found for section", newActiveSection);
      } else if (newActiveSectionLink !== activeSectionLink) {
        if (activeSectionLink)
          activeSectionLink.classList.remove(activeClass);
        if (newActiveSectionLink) {
          newActiveSectionLink.classList.add(activeClass);
          if (!tocHovered) {
            scrollToTocElement(newActiveSectionLink, scrollableNavigation);
          }
        }
        activeSectionLink = newActiveSectionLink;
      }
    }
    window.addEventListener("scroll", debounced(scrollHandler));
    function resizeHandler() {
      sectionsOffsets = computeOffsets(headers);
      scrollHandler();
    }
    window.addEventListener("resize", debounced(resizeHandler));
  }

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\themes\hugo-theme-stack-3.30.0\assets\ts\smoothAnchors.ts
  var anchorLinksQuery = "a[href]";
  function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach((aElement) => {
      let href = aElement.getAttribute("href");
      if (!href.startsWith("#")) {
        return;
      }
      aElement.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        const targetId = decodeURI(aElement.getAttribute("href").substring(1)), target = document.getElementById(targetId), offset = target.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
        window.history.pushState({}, "", aElement.getAttribute("href"));
        scrollTo({
          top: offset,
          behavior: "smooth"
        });
      });
    });
  }

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\assets\ts\daily-quote.ts
  var DailyQuote = class {
    config;
    isTyping = false;
    constructor() {
      this.config = {
        apiUrl: "https://cdn.jsdelivr.net/gh/hitokoto-osc/sentences-bundle@latest/sentences/a.json",
        cacheKey: "daily_quote_cache",
        cacheExpiry: 24 * 60 * 60 * 1e3,
        // 24小时
        typingSpeed: 100,
        // 100ms per character
        pauseTime: 2e3
        // 2秒停顿
      };
    }
    /**
     * 获取缓存的每日一言
     */
    getCachedQuote() {
      try {
        const cached = localStorage.getItem(this.config.cacheKey);
        if (!cached) return null;
        const data = JSON.parse(cached);
        const now = Date.now();
        if (now - data.timestamp > this.config.cacheExpiry) {
          localStorage.removeItem(this.config.cacheKey);
          return null;
        }
        return data.quote;
      } catch (e) {
        console.warn("\u65E0\u6CD5\u8BFB\u53D6\u7F13\u5B58:", e);
        return null;
      }
    }
    /**
     * 缓存每日一言
     */
    cacheQuote(quote) {
      try {
        const data = {
          quote,
          timestamp: Date.now()
        };
        localStorage.setItem(this.config.cacheKey, JSON.stringify(data));
      } catch (e) {
        console.warn("\u65E0\u6CD5\u4FDD\u5B58\u7F13\u5B58:", e);
      }
    }
    /**
     * 从API获取每日一言
     */
    async fetchQuote() {
      try {
        const response = await fetch("https://v1.hitokoto.cn/?c=a&encode=json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
          hitokoto: data.hitokoto,
          from: data.from || "\u672A\u77E5",
          from_who: data.from_who,
          type: data.type || "a"
        };
      } catch (e) {
        console.error("\u83B7\u53D6\u4E00\u8A00\u5931\u8D25:", e);
        return null;
      }
    }
    /**
     * 打字机效果
     */
    async typeText(element, text) {
      this.isTyping = true;
      element.textContent = "";
      for (let i = 0; i < text.length; i++) {
        if (!this.isTyping) break;
        element.textContent += text[i];
        await this.delay(this.config.typingSpeed);
      }
      this.isTyping = false;
    }
    /**
     * 延迟函数
     */
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * 更新每日一言显示
     */
    async updateDisplay(quote) {
      const quoteElement = document.getElementById("daily-quote");
      const authorElement = document.getElementById("quote-author");
      if (!quoteElement) {
        console.error("\u627E\u4E0D\u5230\u6BCF\u65E5\u4E00\u8A00\u5143\u7D20");
        return;
      }
      const cursor = quoteElement.querySelector(".typing-cursor");
      if (cursor) {
        cursor.remove();
      }
      await this.typeText(quoteElement, quote.hitokoto);
      const cursorSpan = document.createElement("span");
      cursorSpan.className = "typing-cursor";
      cursorSpan.textContent = "|";
      quoteElement.appendChild(cursorSpan);
      if (authorElement) {
        await this.delay(this.config.pauseTime);
        const authorText = quote.from_who ? `${quote.from_who} \xB7 ${quote.from}` : quote.from;
        await this.typeText(authorElement, `\u2014\u2014 ${authorText}`);
      }
    }
    /**
     * 显示默认句子（降级方案）
     */
    async showFallbackQuote() {
      const fallbackQuotes = [
        { hitokoto: "\u751F\u6D3B\u5C31\u50CF\u4E00\u76D2\u5DE7\u514B\u529B\uFF0C\u4F60\u6C38\u8FDC\u4E0D\u77E5\u9053\u4E0B\u4E00\u9897\u662F\u4EC0\u4E48\u5473\u9053\u3002", from: "\u963F\u7518\u6B63\u4F20", from_who: "Forrest Gump" },
        { hitokoto: "\u4EBA\u751F\u82E6\u77ED\uFF0C\u6211\u7528Python\u3002", from: "\u7A0B\u5E8F\u5458", from_who: "Tim Peters" },
        { hitokoto: "Stay hungry, stay foolish.", from: "\u65AF\u5766\u798F\u5927\u5B66", from_who: "Steve Jobs" },
        { hitokoto: "\u4EE3\u7801\u662F\u5199\u7ED9\u4EBA\u770B\u7684\uFF0C\u53EA\u662F\u6070\u597D\u80FD\u5728\u673A\u5668\u4E0A\u8FD0\u884C\u3002", from: "\u7A0B\u5E8F\u5458", from_who: "Harold Abelson" },
        { hitokoto: "\u4ECA\u5929\u4E5F\u8981\u52A0\u6CB9\u54E6\uFF01", from: "\u65E5\u5E38", from_who: "\u81EA\u5DF1" }
      ];
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      await this.updateDisplay(randomQuote);
    }
    /**
     * 初始化每日一言
     */
    async init() {
      const quoteBanner = document.querySelector(".daily-quote-banner");
      if (!quoteBanner) {
        return;
      }
      console.log("\u521D\u59CB\u5316\u6BCF\u65E5\u4E00\u8A00...");
      let quote = this.getCachedQuote();
      if (!quote) {
        quote = await this.fetchQuote();
        if (quote) {
          this.cacheQuote(quote);
        }
      }
      if (quote) {
        await this.updateDisplay(quote);
      } else {
        console.warn("\u4F7F\u7528\u964D\u7EA7\u65B9\u6848\u663E\u793A\u9ED8\u8BA4\u53E5\u5B50");
        await this.showFallbackQuote();
      }
      console.log("\u6BCF\u65E5\u4E00\u8A00\u521D\u59CB\u5316\u5B8C\u6210");
    }
    /**
     * 重新加载每日一言（手动刷新）
     */
    async reload() {
      localStorage.removeItem(this.config.cacheKey);
      await this.init();
    }
  };
  var dailyQuote = new DailyQuote();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => dailyQuote.init());
  } else {
    dailyQuote.init();
  }
  window.reloadDailyQuote = () => dailyQuote.reload();

  // ns-hugo-imp:D:\daimacang\website_blog\hugo-test\assets\ts\pageviews.ts
  var PageViewsCounter = class {
    config;
    constructor() {
      this.config = {
        storageKey: "site_pageviews",
        // 与hugo.yaml中的配置对应
        resetKey: "pageviews_reset_date",
        localhostPatterns: [
          "localhost",
          "127.0.0.1",
          "0.0.0.0",
          "::1"
        ]
      };
    }
    /**
     * 检查是否为本地调试环境
     */
    isLocalhost() {
      const hostname = window.location.hostname;
      const port = window.location.port;
      for (const pattern of this.config.localhostPatterns) {
        if (hostname.includes(pattern)) {
          return true;
        }
      }
      if (port === "1313" || port === "8080" || port === "3000") {
        return true;
      }
      return false;
    }
    /**
     * 获取当前访问量
     */
    getPageViews() {
      try {
        const stored = localStorage.getItem(this.config.storageKey);
        return stored ? parseInt(stored, 10) : 0;
      } catch (e) {
        console.warn("\u65E0\u6CD5\u8BBF\u95EElocalStorage:", e);
        return 0;
      }
    }
    /**
     * 保存访问量
     */
    savePageViews(count) {
      try {
        localStorage.setItem(this.config.storageKey, count.toString());
      } catch (e) {
        console.warn("\u65E0\u6CD5\u4FDD\u5B58\u5230localStorage:", e);
      }
    }
    /**
     * 增加访问量
     */
    incrementPageViews() {
      if (this.isLocalhost()) {
        console.log("\u672C\u5730\u8C03\u8BD5\u73AF\u5883\uFF0C\u4E0D\u8BA1\u5165\u8BBF\u95EE\u91CF\u7EDF\u8BA1");
        return;
      }
      const currentViews = this.getPageViews();
      const newViews = currentViews + 1;
      this.savePageViews(newViews);
      this.updatePageViewsDisplay(newViews);
    }
    /**
     * 更新访问量显示
     */
    updatePageViewsDisplay(count) {
      const countElement = document.getElementById("pageviews-count");
      if (countElement) {
        countElement.textContent = count.toLocaleString();
      }
    }
    /**
     * 重置访问量（可选功能）
     */
    resetPageViews() {
      if (confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u8BBF\u95EE\u91CF\u7EDF\u8BA1\u5417\uFF1F")) {
        this.savePageViews(0);
        this.updatePageViewsDisplay(0);
        console.log("\u8BBF\u95EE\u91CF\u5DF2\u91CD\u7F6E");
      }
    }
    /**
     * 初始化
     */
    init() {
      const currentViews = this.getPageViews();
      this.updatePageViewsDisplay(currentViews);
      if (!this.isLocalhost()) {
        this.incrementPageViews();
      }
      window.resetPageViews = () => this.resetPageViews();
      console.log("\u8BBF\u95EE\u91CF\u7EDF\u8BA1\u7CFB\u7EDF\u5DF2\u521D\u59CB\u5316");
      console.log("\u5F53\u524D\u73AF\u5883:", this.isLocalhost() ? "\u672C\u5730\u8C03\u8BD5" : "\u751F\u4EA7\u73AF\u5883");
      console.log("\u5F53\u524D\u8BBF\u95EE\u91CF:", this.getPageViews());
    }
  };
  var pageViewsCounter = new PageViewsCounter();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => pageViewsCounter.init());
  } else {
    pageViewsCounter.init();
  }

  // <stdin>
  var Stack = {
    init: () => {
      menu_default();
      const articleContent = document.querySelector(".article-content");
      if (articleContent) {
        new gallery_default(articleContent);
        setupSmoothAnchors();
        setupScrollspy();
      }
      const colorSchemeToggle = document.getElementById("dark-mode-toggle");
      if (colorSchemeToggle) {
        new colorScheme_default(colorSchemeToggle);
      }
      const highlights = document.querySelectorAll(".article-content div.highlight");
      const copyText = `\u{1F4C4}\u62F7\u8D1D`, copiedText = `\u5DF2\u62F7\u8D1D!`;
      highlights.forEach((highlight) => {
        const copyButton = document.createElement("button");
        copyButton.innerHTML = copyText;
        copyButton.classList.add("copyCodeButton");
        highlight.appendChild(copyButton);
        const codeBlock = highlight.querySelector("code[data-lang]");
        const lang = codeBlock?.getAttribute("data-lang");
        if (!codeBlock) return;
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.textContent || "").then(() => {
            copyButton.textContent = copiedText;
            setTimeout(() => {
              copyButton.textContent = copyText;
            }, 1e3);
          }).catch((err) => {
            alert(err);
            console.log("Something went wrong", err);
          });
        });
        if (lang) {
          const languageButton = document.createElement("button");
          languageButton.innerHTML = lang.toUpperCase() + "&nbsp;&nbsp;";
          languageButton.classList.add("languageCodeButton");
          highlight.appendChild(languageButton);
        }
      });
      const dailyQuote2 = new DailyQuote();
      dailyQuote2.init();
      const pageViewsCounter2 = new PageViewsCounter();
      pageViewsCounter2.init();
      console.log("Hugo Theme Stack - Custom Main initialized");
    }
  };
  document.addEventListener("DOMContentLoaded", Stack.init);
})();
/*!
*   Hugo Theme Stack - Custom Main
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
