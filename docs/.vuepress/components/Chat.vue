<template>
  <div id="bot-ui">
    <!-- Conditionally show toggle button with highlight -->
    <div class="toggle-container" v-show="!(isMobile && showChat)">
      <div v-if="!showChat" class="pulse-ring"></div>
      <button
        class="chat-toggle"
        @click="toggleChat"
        :class="{ 'chat-open': showChat }"
      >
        <svg
          v-if="!showChat"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.48 4h4l.5.5v2.03h.52l.5.5V8l-.5.5h-.52v3l-.5.5H9.36l-2.5 2.76L6 14.4V12H3.5l-.5-.64V8.5h-.5L2 8v-.97l.5-.5H3V4.36L3.53 4h4V2.86A1 1 0 0 1 7 2a1 1 0 0 1 2 0 1 1 0 0 1-.52.83V4zM12 8V5H4v5.86l2.5.14H7v2.19l1.8-2.04.35-.15H12V8zm-2.12.51a2.71 2.71 0 0 1-1.37.74v-.01a2.71 2.71 0 0 1-2.42-.74l-.7.71c.34.34.745.608 1.19.79.45.188.932.286 1.42.29a3.7 3.7 0 0 0 2.58-1.07l-.7-.71zM6.49 6.5h-1v1h1v-1zm3 0h1v1h-1v-1z"></path>
          </g>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div v-if="!showChat" class="highlight-container">
        <div class="tooltip-text">Try our new Virtual Assistant!</div>
      </div>
    </div>

    <div
      v-if="showChat"
      class="chat-container"
      :class="{ fullscreen: isMobile, 'desktop-view': !isMobile }"
    >
      <div class="chat-header">
        <div class="header-content">
          <img
            :src="botOptions.botAvatarImg"
            alt="Bot icon"
            class="header-avatar"
          />
          <span class="bot-title">{{ botOptions.botTitle }}</span>
        </div>
        <div class="header-actions">
          <button class="close-btn" @click="toggleChat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="iframe-container" ref="iframeContainer">
        <iframe
          :src="iframeUrl"
          class="chat-iframe"
          frameborder="0"
          allow="clipboard-read; clipboard-write; fullscreen"
          @load="onIframeLoad"
        />
        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BotIcon from "cl-doc-vue-bot-ui/src/assets/icons/bot.png";

export default {
  data() {
    return {
      showChat: false,
      isLoading: true,
      botOptions: {
        botAvatarImg: BotIcon,
        botTitle: "AI Assistant",
      },
      iframeUrl: "https://chatbot.cloudlinux.com/docs/imunify360",
      windowWidth: 0, // Changed from window.innerWidth to avoid SSR error
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // Set initial windowWidth on client-side
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    onIframeLoad() {
      this.isLoading = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
$primary-color = #43a069
$background-color = white
$border-radius = 16px
mobile-breakpoint = 768px

#bot-ui {
  font-family: "Inter", "Avenir", Helvetica, Arial, sans-serif
  position: fixed
  bottom: 20px
  right: 20px
  z-index: 9999
  transition: all 0.3s ease
}

.toggle-container {
  position: relative
}

.pulse-ring {
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 66px
  height: 66px
  border-radius: 50%
  background: rgba(63, 131, 248, 0.3)
  animation: pulse 2s infinite
  z-index: -1
}

.chat-toggle {
  position: relative
  background: $primary-color
  border: none
  border-radius: 50%
  width: 56px
  height: 56px
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0 4px 12px rgba(0,0,0,0.15)
  transition: transform 0.3s ease, box-shadow 0.3s ease
  z-index: 10000

  svg {
    color: white
    width: 32px
    height: 32px
  }

  &:hover {
    transform: scale(1.05)
    box-shadow: 0 6px 16px rgba(0,0,0,0.2)
  }
}

.highlight-container {
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-35%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10001;
  max-width: 90vw;
}

.tooltip-text {
  background: $primary-color;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem; /* Increase this value to make the tooltip text larger */
  animation: float 3s ease-in-out infinite;
  position: relative;
  text-align: center;
  white-space: nowrap;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 90vw;
  overflow: visible;
  text-overflow: clip;
}

.chat-container {
  position: fixed
  border-radius: $border-radius
  overflow: hidden
  box-shadow: 0 12px 32px rgba(0,0,0,0.2)
  background: $background-color
  transition: all 0.3s ease
  z-index: 9999

  &.fullscreen {
    top: 0
    left: 0
    right: 0
    bottom: 0
    border-radius: 0
    width: 100%
    height: 100vh
  }

  &.desktop-view {
    top: 5vh
    left: 5vw
    right: 5vw
    bottom: 5vh
    width: 90vw
    height: 90vh
    max-width: none
  }
}

.chat-header {
  background: $primary-color
  color: white
  padding: 1rem 1.5rem
  display: flex
  justify-content: space-between
  align-items: center

  .header-content {
    display: flex
    align-items: center

    .header-avatar {
      width: 32px
      height: 32px
      border-radius: 50%
      margin-right: 10px
      object-fit: cover
    }

    .bot-title {
      font-weight: 600
      font-size: 1rem
    }
  }

  .header-actions {
    display: flex
    align-items: center

    .close-btn {
      background: none
      border: none
      color: white
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center

      svg {
        stroke: white
        width: 24px
        height: 24px
      }

      &:hover {
        opacity: 0.8
      }
    }
  }
}

.iframe-container {
  position: relative
  width: 100%
  height: calc(100% - 60px)
}

.chat-iframe {
  width: 100%
  height: 100%
  border: none
}

.loading-overlay {
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background: rgba(255, 255, 255, 0.7)

  .spinner {
    border: 4px solid $primary-color
    border-top: 4px solid transparent
    border-radius: 50%
    width: 40px
    height: 40px
    animation: spin 1s linear infinite
  }
}

@keyframes spin {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8)
    opacity: 0.7
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2)
    opacity: 0.3
  }
  100% {
    transform: translate(-50%, -50%) scale(1)
    opacity: 0
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(-50%)
  }
  50% {
    transform: translateY(-4px) translateX(-50%)
  }
}

@media (max-width: mobile-breakpoint) {
  #bot-ui {
    bottom: 15px
    right: 15px
  }

  .chat-container {
    bottom: 0
  }

  .chat-toggle.chat-open {
    display: none
  }

  .highlight-container {
    bottom: calc(100% + 15px)
    right: auto
    left: 50%
    transform: translateX(-40%)
  }

  .tooltip-text {
    font-size: 0.9rem; /* Adjust this value to change the tooltip text size on mobile devices */
    padding: 6px 12px;
    white-space: nowrap;
  }
}
</style>