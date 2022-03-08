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
    copy({
      targets: [
        { src: ["src/manifest.json"], dest: "dist/" },
        { src: "public/**/*", dest: "dist/public/" },
      ],
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html) {
        return html.replace(/"\/assets\//g, '"../assets/');
      },
    },
  ],
  resolve: {
    alias: {
      "@/": "src/",
    },
  },
  build: {
    outDir: resPath("dist/pages"),
    //关闭警告
    emptyOutDir: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        //点击插件图标出现的弹窗
        popup: resPath("src/views/popup/index.html"),
        // 插件设置页面
        options: resPath("src/views/options/index.html"),
        // //chrome devtool pane 页面
        // devtoolPage: resolve(__dirname, "devtoolPage/index.html"),
        // // 插件的核心 JS，一直活跃在后台，来监听所有请求
        // background: resPath("src/views/scripts/background.ts"),
        // // 加载 chrome devtool pane 的入口
        // devtool: resolve(__dirname, "devtool/index.html"),
        // 与页面同级，并在某个时机执行，可以拿到页面的 document
        // content: resolve(__dirname, "src/content.ts"),
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
