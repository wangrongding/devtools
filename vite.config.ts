import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
console.log(resolve(__dirname, "src/popup/index.html"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        { src: ["src/index.html"], dest: "dist/public" },
        // { src: "assets/images/**/*", dest: "dist/public/images" },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // main: resolve(__dirname, "index.html"),
        //点击插件图标出现的弹窗
        popup: resolve(__dirname, "popup/index.html"),
        // //chrome devtool pane 页面
        // devtoolPage: resolve(__dirname, "devtoolPage/index.html"),
        // // 插件的核心 JS，一直活跃在后台，来监听所有请求
        // background: resolve(__dirname, "background/index.html"),
        // // 加载 chrome devtool pane 的入口
        // devtool: resolve(__dirname, "devtool/index.html"),
        // // 插件设置页面
        // options: resolve(__dirname, "options/index.html"),
        // // 与页面同级，并在某个时机执行，可以拿到页面的 document
        // content: resolve(__dirname, "src/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
