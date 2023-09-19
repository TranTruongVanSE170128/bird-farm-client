// vite.config.ts
import path from "path";
import react from "file:///D:/code/Web/bird-farm/client/node_modules/.pnpm/@vitejs+plugin-react-swc@3.3.2_vite@4.4.9/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///D:/code/Web/bird-farm/client/node_modules/.pnpm/vite@4.4.9_@types+node@20.6.0/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/code/Web/bird-farm/client/node_modules/.pnpm/vite-plugin-dts@3.5.3_@types+node@20.6.0_typescript@5.2.2_vite@4.4.9/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\code\\Web\\bird-farm\\client";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "MyLib",
      formats: ["es"],
      fileName: "my-lib"
    }
  },
  plugins: [react(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFdlYlxcXFxiaXJkLWZhcm1cXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFdlYlxcXFxiaXJkLWZhcm1cXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL1dlYi9iaXJkLWZhcm0vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgbmFtZTogJ015TGliJyxcclxuICAgICAgZm9ybWF0czogWydlcyddLFxyXG4gICAgICBmaWxlTmFtZTogJ215LWxpYidcclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBkdHMoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUixPQUFPLFVBQVU7QUFDalMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
