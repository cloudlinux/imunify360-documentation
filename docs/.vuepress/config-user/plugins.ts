import {containerPlugin} from "@vuepress/plugin-container";
import {ContainerPluginOptions} from "@vuepress/plugin-container/lib/node/containerPlugin";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

export default [
    containerPlugin({
        type: 'warning',
        before: info => `<div class="warning custom-block"><p class="custom-block-title">${info}</p>`,
        after: () => '</div>',
    } as ContainerPluginOptions),
    containerPlugin({
        type: 'tip',
        before: info => `<div class="tip custom-block"><p class="custom-block-title">${info}</p>`,
        after: () => '</div>',
    } as ContainerPluginOptions),
    containerPlugin({
        type: 'danger',
        before: info => `<div class="danger custom-block"><p class="custom-block-title">${info}</p>`,
        after: () => '</div>',
    } as ContainerPluginOptions),
        registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
   })

]
