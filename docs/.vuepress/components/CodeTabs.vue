<template>
  <div class="code-tabs">
    <div class="tab-buttons">
      <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </button>
    </div>

    <div class="tab-content code-block-wrapper">
      <button class="copy-button" @click="copyCode" aria-label="Copy code">
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
        </svg>
      </button>

      <pre><code ref="codeRef" class="language-bash">{{ tabs[activeTab].content }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      copied: false
    }
  },
  watch: {
    activeTab() {
      this.highlight()
    }
  },
  mounted() {
    this.highlight()
  },
  methods: {
    highlight() {
      this.$nextTick(() => {
        if (typeof window !== 'undefined' && window.hljs && this.$refs.codeRef) {
          window.hljs.highlightElement(this.$refs.codeRef)
        }
      })
    },
    copyCode() {
      const text = this.tabs[this.activeTab].content
      navigator.clipboard.writeText(text).then(() => {
        this.copied = true
        setTimeout(() => (this.copied = false), 2000)
      })
    }
  }
}
</script>

<style scoped>
.code-tabs {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.tab-buttons {
  display: flex;
  background-color: #2d2d2d;
  border-bottom: 1px solid #444;
}

.tab-buttons button {
  padding: 0.85em;
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #ccc;
}

.tab-buttons button.active {
  color: #fff;
  border-bottom: 2px solid #43a069;
  font-weight: bold;
}

.tab-content {
  position: relative;
  background-color: #2d2d2d;
  font-family: monospace;
  padding: 1rem;
}

.code-block-wrapper {
  background-color: #2d2d2d;
  padding: 12px;
  position: relative;
  overflow: hidden;
}

pre {
  margin: 0;
  background-color: transparent;
  color: #2d2d2d;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%;
  line-height: 1.5;
  box-shadow: none;
}

code {
  color: #ccc;
  background: none;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  z-index: 10;
}

.copy-button svg {
  fill: #ccc;
  width: 20px;
  height: 20px;
  transition: fill 0.2s;
}

.copy-button:hover svg {
  fill: #43a069;
}

.language-bash {
  font-size: 0.85em;
  padding: 0;
}
</style>

