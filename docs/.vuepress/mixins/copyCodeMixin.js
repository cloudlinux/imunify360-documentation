// Auto-add copy buttons to all code blocks
export default {
    mounted() {
        this.addCopyButtons();
    },
    updated() {
        this.addCopyButtons();
    },
    methods: {
        addCopyButtons() {
            // Find all code blocks that don't already have a copy button
            const codeBlocks = document.querySelectorAll('div[class*="language-"]:not(.has-copy-button)');

            codeBlocks.forEach((block) => {
                // Mark this block as having a copy button
                block.classList.add('has-copy-button');

                // Create copy button
                const button = document.createElement('button');
                button.className = 'copy-code-button';
                button.setAttribute('aria-label', 'Copy code');
                button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="copy-icon">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        `;

                // Add click handler
                button.addEventListener('click', () => {
                    const code = block.querySelector('pre code');
                    if (code) {
                        const text = code.innerText;
                        navigator.clipboard.writeText(text).then(() => {
                            // Show success state
                            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="copy-icon copied">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
                </svg>
              `;
                            button.classList.add('copied');

                            // Reset after 2 seconds
                            setTimeout(() => {
                                button.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="copy-icon">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                  </svg>
                `;
                                button.classList.remove('copied');
                            }, 2000);
                        });
                    }
                });

                // Add button to code block
                block.style.position = 'relative';
                block.appendChild(button);
            });
        }
    }
};
