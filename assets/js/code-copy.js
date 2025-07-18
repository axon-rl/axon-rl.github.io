// Code copy functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add copy button to all code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre:has(code), .highlight');
        
        codeBlocks.forEach(function(codeBlock) {
            // Skip if already has a copy button
            if (codeBlock.querySelector('.copy-button')) return;
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = `
                <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span class="copy-text">Copy</span>
            `;
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');
            copyButton.setAttribute('title', 'Copy code');
            
            // Position the code block relatively for absolute positioning of button
            codeBlock.style.position = 'relative';
            
            // Add click handler
            copyButton.addEventListener('click', function() {
                copyCodeToClipboard(codeBlock, copyButton);
            });
            
            // Append button to code block
            codeBlock.appendChild(copyButton);
        });
    }
    
    // Copy code to clipboard
    function copyCodeToClipboard(codeBlock, button) {
        let codeElement = codeBlock.querySelector('code');
        if (!codeElement) {
            // Fallback for pre blocks without code element
            codeElement = codeBlock;
        }
        
        const code = codeElement.textContent || codeElement.innerText;
        
        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(function() {
                showCopySuccess(button);
            }).catch(function(err) {
                console.error('Failed to copy code: ', err);
                fallbackCopyTextToClipboard(code, button);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(code, button);
        }
    }
    
    // Fallback copy method for older browsers
    function fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                showCopyError(button);
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            showCopyError(button);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Show copy success state
    function showCopySuccess(button) {
        const copyIcon = button.querySelector('.copy-icon');
        const checkIcon = button.querySelector('.check-icon');
        const copyText = button.querySelector('.copy-text');
        
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        copyText.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(function() {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
            copyText.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    }
    
    // Show copy error state
    function showCopyError(button) {
        const copyText = button.querySelector('.copy-text');
        copyText.textContent = 'Failed';
        button.classList.add('error');
        
        // Reset after 2 seconds
        setTimeout(function() {
            copyText.textContent = 'Copy';
            button.classList.remove('error');
        }, 2000);
    }
    
    // Initialize copy buttons
    addCopyButtons();
    
    // Re-add copy buttons when content changes (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                addCopyButtons();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});