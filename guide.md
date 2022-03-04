# Vue 3 + Typescript + Vite 实现的 Chrome 扩展

## 核心文件

### manifest.json

Chrome 插件最重要也是必不可少的文件，用来配置所有和插件相关的配置，必须放在根目录

```json
{
  // 清单文件的版本，必填，最新的为3（也可以填2,但是2即将淘汰）
  "manifest_version": 3,
  // 插件的名称
  "name": "Extension-name",
  // 插件的版本
  "version": "1.0.0",
  // 插件描述
  "description": "一个帅气的扩展~",
  // 图标(您应该始终提供 128x128 图标,图标通常应为 PNG 格式，因为 PNG 对透明度的支持最好)
  "icons": {
    //用于扩展页面的图标
    "16": "./public/logo.png",
    //用于扩展程序管理页面 (chrome://extensions)
    "48": "./public/logo.png",
    //用于安装期间和 Chrome 网上应用店中使用
    "128": "./public/logo.png"
  },
  //====================================
  "author": "荣顶",
  "action": {
    "default_icon": {
      "16": "./public/logo.png",
      "24": "./public/logo.png",
      "32": "./public/logo.png"
    },
    "default_title": "Click Me",
    "default_popup": "popup.html"
  },
  "default_locale": "en",
  //====================================
  // 会一直常驻的后台JS或后台页面
  "background": {
    // 2种指定方式，
    "page": "background.html"
    // or👇 如果指定JS，那么会自动生成一个背景页
    // "scripts": ["js/background.js"]
  },
  // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
  "browser_action": {
    "default_icon": "./public/logo.png",
    // 图标悬停时的标题，可选
    "default_title": "帅气的扩展！",
    "default_popup": "./pages/popup/index.html"
  },
  // 当某些特定页面打开才显示的图标
  /*"page_action":
	{
		"default_icon": "./public/logo.png",
		"default_title": "我是pageAction",
		"default_popup": "popup.html"
	},*/
  // 需要直接注入页面的JS
  "content_scripts": [
    {
      //"matches": ["http://*/*", "https://*/*"],
      // "<all_urls>" 表示匹配所有地址
      "matches": ["<all_urls>"],
      // 多个JS按顺序注入
      "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
      // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
      "css": ["css/custom.css"],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      "run_at": "document_start"
    },
    // 这里仅仅是为了演示content-script可以配置多个规则
    {
      "matches": ["*://*/*.png", "*://*/*.jpg", "*://*/*.gif", "*://*/*.bmp"],
      "js": ["js/show-image-content-size.js"]
    }
  ],
  // 权限申请
  "permissions": [
    "contextMenus", // 右键菜单
    "tabs", // 标签
    "notifications", // 通知
    "webRequest", // web请求
    "webRequestBlocking",
    "storage", // 插件本地存储
    "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
  ],
  // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
  "web_accessible_resources": ["js/inject.js"],
  // 插件主页，这个很重要，不要浪费了这个免费广告位
  "homepage_url": "https://www.baidu.com",
  // 覆盖浏览器默认页面
  "chrome_url_overrides": {
    // 覆盖浏览器默认的新标签页
    "newtab": "newtab.html"
  },
  // Chrome40以前的插件配置页写法
  "options_page": "options.html",
  // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
  "options_ui": {
    "page": "options.html",
    // 添加一些默认的样式，推荐使用
    "chrome_style": true
  },
  // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
  "omnibox": { "keyword": "go" },
  // 默认语言
  "default_locale": "zh_CN",
  // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
  "devtools_page": "devtools.html"
}
```
