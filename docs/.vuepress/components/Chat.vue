<template>
<ClientOnly>
    <div id="bot-ui">
        <component
            v-if="dynamicComponent && isConnected"
            :is="dynamicComponent"
            :messages="messages"
            :options="botOptions"
            :bot-typing="waitResponse"
            :input-disable="waitResponse"
            @msg-send="messageSendHandler"
            @msg-to-server="messageToServer">

            <template #header>
                <div class="qkb-board-header__title"> {{ botOptions.botTitle }} </div> 
                <div class="qkb-board-header__select_field">
                    <multiselect
                        v-model="tags"
                        :options="options"
                        :multiple="true"
                        :close-on-select="true"
                        :limit="3"
                        label="name"
                        track-by="value"
                        placeholder="Select section">
                    </multiselect>
                </div>
            </template>
        </component>
    </div>
</ClientOnly>
</template>
<script>
import Multiselect from 'vue-multiselect'

import { markRaw } from 'vue'
import BotIcon from 'cl-doc-vue-bot-ui/src/assets/icons/bot.png'

export default {
    components: {
        BotIcon,
        Multiselect
    },
    data () {
        return {
            dynamicComponent: null,
            messages: [],
            isConnected: false,
            waitResponse: false,
            botOptions: {
                botAvatarImg: BotIcon,
                botTitle: 'AI Bot',
                colorScheme: '#3f83f8',
                boardContentBg: '#f4f4f4',
                msgBubbleBgBot: '#fff',
                msgBubbleBgUser: '#3f83f8',
                inputPlaceholder: 'Ask a new question'
            },
            docName: "cloudlinux-documentation",
            tags: [],
            options: [{
                name: 'CloudLinux OS Shared',
                value:  ['level-0', 'shared']
            },{
                name: 'CloudLinux OS Shared Pro',
                value: ['level-0', 'shared-pro']
            },{
                name: 'AccelerateWP',
                value: ['level-1', 'accelerate-wp']
            },{
                name: 'CLN',
                value: ['level-0', 'cln']
            },{
                name: 'CloudLinux Solo',
                value: ['level-0', 'solo']
            },{
                name: 'CloudLinux OS Admin',
                value: ['level-0', 'admin']
            },{
                name: 'CloudLinux Subsystem For Ubuntu',
                value: ['level-0', 'ubuntu']
            },{
                name: 'End-user Documents',
                value: ['level-0', 'user-docs']
            }]
        }
    },
    mounted(){
        import('cl-doc-vue-bot-ui').then(module => {
            // markRaw is used on the component definition because no reactivity is needed on it.
            this.dynamicComponent = markRaw(module.VueBotUI)
        })

        console.log('Starting connection...')
        this.connection = new WebSocket('wss://doc-bot.cloudlinux.com:2096')
        // dev -> this.connection = new WebSocket('ws://localhost:8765')

        this.connection.onmessage = (response) => {
            const event = JSON.parse(response.data)
            this.messages.push({
                agent: 'bot',
                type: 'markdown',
                text: event.text
            })
            this.waitResponse = false

            setTimeout(() => {
                this.messages.push({
                    agent: 'bot',
                    type: 'rate',
                    id: event.id
                })
            }, 1000)
        }

        this.connection.onclose = () => {
            console.log('Connection closed')
            this.isConnected = false
        }
        
        this.connection.onopen = () => {
            console.log('Successfully connected to the websocket server...')
            this.isConnected = true
        }

    },
    methods: {
        messageSendHandler (message) {
            this.messages.push({
                agent: 'user',
                type: 'text',
                text: message.text
            })

            let tags = [];
            if (this.tags.length !== this.options.length ) {
                // if all tags was selected let's search without tags for whole index
                tags = this.tags.map((item) => { return item['value'] })
            }

            this.connection.send(JSON.stringify({
                'type': 'question',
                'text': message.text,
                'doc-name': this.docName,
                'tags': tags
            }))
            this.waitResponse = true
        },
        messageToServer (message) {
            this.connection.send(JSON.stringify({...{'doc-name': this.docName}, ...message}))
        }
    }
}

</script>
<style lang="stylus">
@import "vue-multiselect/dist/vue-multiselect.css";

.multiselect__spinner::before,
.multiselect__spinner::after,
.multiselect__option--highlight::after,
.multiselect__option--highlight,
.multiselect__tag {
  background: #3f83f8;
}

.qkb-board-header__select_field {
  min-width: 300px;
}

#bot-ui {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
