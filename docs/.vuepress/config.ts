import { defineUserConfig, viteBundler } from "vuepress";
import theme from "./theme";
import plugins from "./config-user/plugins";

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
  head: [
    [
      "script",
      {
        type: "text/javascript",
        charset: "UTF-8",
        src: "//cdn.cookie-script.com/s/c9f81de32507a4fec1eb03ee80d0f0ed.js",
      },
    ],
    [
      "script",
      {
        type: "text/javascript",
        id: "hs-script-loader",
        async: true,
        defer: true,
        src: "//js.hs-scripts.com/5408110.js",
      },
    ],
    [
      "script",
      {},
      `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5MC2SNS');
      `
    ],
  ],
});
