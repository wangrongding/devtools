# Vue 3 + Typescript + Vite 实现的 Chrome 扩展

## 核心文件

### manifest.json

Chrome 插件最重要也是必不可少的文件，用来配置所有和插件相关的配置，必须放在根目录。

你可以把它理解成，类似我们平时项目中的`package.json`文件。

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
  //====================================
  "author": "荣顶",
  //用于点击图标弹出框，对于弹出框接受的是html文件
  "action": {
    "default_icon": {
      "16": "./public/logo.png",
      "24": "./public/logo.png",
      "32": "./public/logo.png"
    },
    "default_title": "点我弹东西出来！",
    // popup页面的路径（根目录为最终build生成的插件包目录）
    "default_popup": "popup.html"
  },
  // 会一直常驻的后台JS或后台页面
  "background": {
    "service_worker": "./dist/script/background.js"
  },
  // content script配置
  "content_scripts": [
    {
      // 应用于哪些页面地址（可以使用正则，<all_urls>表示匹配所有地址）
      "matches": ["<all_urls>"],
      // 注入到目标页面的css，注意不要污染目标页面的样式
      "css": ["static/css/content.css"],
      // 注入到目标页面js，这个js是在沙盒里运行，与目标页面是隔离的，没有污染问题。
      "js": ["static/js/content.js"],
      // 代码注入的时机，可选document_start、document_end、document_idle（默认）
      "run_at": "document_end"
    }
  ],
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
  // zh_CN / en
  "default_locale": "en",
  // 图标(您应该始终提供 128x128 图标,图标通常应为 PNG 格式，因为 PNG 对透明度的支持最好)
  "icons": {
    //用于扩展页面的图标
    "16": "./public/logo.png",
    //用于扩展程序管理页面 (chrome://extensions)
    "48": "./public/logo.png",
    //用于安装期间和 Chrome 网上应用店中使用
    "128": "./public/logo.png"
  },
  // chrome extension API权限申请
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
  // ---插件涉及的外部请求地址，暂未发现影响跨域请求，猜测是用于上架商店时方便审核人员查阅
  "host_permissions": [],
  // 如果向目标页面插入图片或者js，需要在这里授权插件本地资源（以下仅为示例）。
  "web_accessible_resources": [
    {
      "resources": ["/images/app.png"],
      "matches": ["<all_urls>"]
    },
    {
      "resources": ["insert.js"],
      "matches": ["<all_urls>"]
    }
  ],
  //====================================
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

## Manifest V3

Manifest V3 现在可以在 Chrome 88 Beta 上进行试验，并在即将发布的版本中提供更多令人兴奋的功能。Chrome 网上应用店将于 1 月开始接受 Manifest V3 扩展

Chrome 扩展的 Manifest V3，这是扩展平台的新版本，默认情况下使扩展更加安全、高性能和尊重隐私。

## V2 的淘汰

淘汰有两个关键日期：

- 2022 年 1 月 17 日：Chrome 网上应用店将不再接受新的 Manifest V2 扩展。开发者仍可推送现有 Manifest V2 扩展的更新，但不得提交新的 Manifest V2 项目。

- 2023 年 1 月：Chrome 浏览器将不再运行 Manifest V2 扩展程序。开发人员可能不再向现有 Manifest V2 扩展推送更新。

## 多入口多出口打包

tsup

```sh
"tsup src/background src/content --format iife --out-dir extension/dist --no-splitting",
```

## 自动引入

一开始是用了
unplugin-auto-import/vite 和
unplugin-vue-components/vite
虽然写起来很方便,但在这个场景中,不太适用,因为自动加载后每一次 build 都会很耗时间

自己取舍
