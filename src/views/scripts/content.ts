window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  setNotranslateElement();
});
window.onload = () => {
  console.log("d-tools 已加载~ 😀onload");
  setNotranslateElement();
};
// document.body.style.backgroundColor = "green";

// 设置不自动翻译的元素
function setNotranslateElement() {
  "use strict";
  // 翻译忽略的元素
  const passTransList = ["pre"];
  if (window.location.hostname.indexOf("github") !== -1) {
    // 以下为github中不需要翻译的元素,可根据需求自定义配置
    const githubSelector = [
      // 仓库头部导航
      ".hide-full-screen",
      // stars 自定义列表
      ".SelectMenu-list",
      ".bg-gray-light.pt-3.hide-full-screen.mb-5",
      "summary.btn.css-truncate",
      ".commit-author",
      ".js-navigation-open.link-gray-dark",
      ".Box-title",
      ".BorderGrid-cell > div.mt-3 > a.muted-link",
      ".BorderGrid-cell > ul.list-style-none",
      ".hx_page-header-bg",
      ".list-style-none", //仓库名
      ".text-bold", //首页人名,仓库名
      "div[data-repository-hovercards-enabled] .body > div .flex-items-baseline",
      ".js-header-wrapper", //nav
      ".file-navigation", //代码仓库按钮
      ".Details:not(.Details--on) .Details-content--hidden-not-important", //代码仓库和顶部导航
      //对于github的插件(我使用的octotree)👇
      ".github-repo-size-div",
      ".octotree-tree-view",
    ];
    //对于github的插件(我使用的octotree)
    passTransList.push(...githubSelector);
  } else {
    passTransList.push(
      ...[
        // 以下为 eslint-plugin-vue 中不需要翻译的元素,可根据需求自定义配置
        ".eslint-code-container",
      ]
    );
  }
  // 添加忽略的属性
  function addNoTranslateAttr(array: string[]) {
    array.forEach((name) => {
      [...(document.querySelectorAll(name) as any)].forEach((node) => {
        if (node.className.indexOf("notranslate") === -1) {
          node.classList.add("notranslate");
        }
      });
    });
  }
  addNoTranslateAttr(passTransList);
}
