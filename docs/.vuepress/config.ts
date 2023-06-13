import {defineUserConfig, viteBundler} from "vuepress";
import theme from "./theme"
import plugins from "./config-user/plugins";

export default defineUserConfig({
    theme,
    markdown: {
        headers: {
            level: [2,3,4,5]
        }
    },
    plugins,
    bundler: viteBundler({
        viteOptions: {
            ssr: {
                noExternal: ['vue-select']
            }
        },
    })
});