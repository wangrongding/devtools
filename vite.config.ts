// 对打包后的文件开启web服务
import serve from "rollup-plugin-serve";
// 监听打包后的文件目录,并热更新
import livereload from "rollup-plugin-livereload";
// 打包可视化
import { visualizer } from "rollup-plugin-visualizer";

const util = require("util");
// import { spawnSync } from "child_process";
const spawnSync = util.promisify(require("child_process").spawn);

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
console.log(resolve(__dirname, "src/popup/index.html"));
const resPath = (url: string) => resolve(__dirname, url);

// https://vitejs.dev/config/
export default defineConfig({
  root: resPath("src/views"),
  plugins: [
    vue(),
    {
      name: "custom-built-script",
      apply: "build",
      buildEnd: () => {
        spawnSync(
          "npx tsup src/views/scripts/background.ts src/views/scripts/content.ts --format iife --out-dir dist/scripts",
          {
            shell: true,
          }
        );
      },
    },
    // 重写assets以使用相对路径
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html) {
        return html.replace(/"\/assets\//g, '"../assets/');
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  resolve: {
    //设置别名
    alias: [{ find: "@", replacement: resPath("src") }],
    extensions: [".ts", ".js", ".vue"],
  },
  build: {
    outDir: resPath("dist"),
    //关闭警告
    emptyOutDir: false,
    chunkSizeWarningLimit: 1024,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      plugins: [
        // livereload({ delay: 100000, watch: "dist" }),
        serve({
          host: "localhost",
          port: 9521,
          contentBase: "dist",
          openPage: "/popup/index.html",
          open: true,
        }),
        copy({
          targets: [
            { src: ["src/manifest.json"], dest: "dist/" },
            { src: "public/**/*", dest: "dist/public/" },
          ],
        }),

        // visualizer({ open: true, template: "network" }),
      ],
      input: {
        //点击插件图标出现的弹窗
        popup: resPath("src/views/popup/index.html"),
        // 插件设置页面
        options: resPath("src/views/options/index.html"),
        // 插件的核心 JS，一直活跃在后台，来监听所有请求
        background: resPath("src/views/scripts/background.ts"),
        // 与页面同级，并在某个时机执行，可以拿到页面的 document
        content: resPath("src/views/scripts/content.ts"),
        // //chrome devtool pane 页面
        // devtoolPage: resolve(__dirname, "devtoolPage/index.html"),
        // // 插件的核心 JS，一直活跃在后台，来监听所有请求
        // background: resPath("src/views/scripts/background.ts"),
        // // 加载 chrome devtool pane 的入口
        // devtool: resolve(__dirname, "devtool/index.html"),
      },
      // output: {
      //   // entryFileNames: "[name].js",
      //   // assetFileNames: "[name].[ext]",
      //   // chunkFileNames: "[name].js",
      //   // // manualChunks: () => "everything.js",
      // },
    },
  },
});
