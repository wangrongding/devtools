import { defineConfig } from "vite";
import { resolve } from "path";
const resPath = (url: string) => resolve(__dirname, url);
export default defineConfig({
  root: resPath("src/views"),
  resolve: {
    alias: {
      "@/": "src/",
    },
  },
  build: {
    outDir: resPath("dist/scripts"),
    //关闭警告
    emptyOutDir: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        // 插件的核心 JS，一直活跃在后台，来监听所有请求
        background: resPath("src/views/scripts/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
