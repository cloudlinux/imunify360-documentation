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
});
