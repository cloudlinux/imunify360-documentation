import { defineUserConfig, viteBundler } from "vuepress";
import theme from "./theme";
import plugins from "./config-user/plugins";
import headFunctions from "./headFunctions";

export default defineUserConfig({
  theme,
  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
    },
  },
  plugins,
  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ["vue-select", "vue-multiselect"],
      },
    },
  }),
  head: headFunctions,
   scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Adjust based on your header height
      }
    }
    return savedPosition || { top: 0 }
  },
});
