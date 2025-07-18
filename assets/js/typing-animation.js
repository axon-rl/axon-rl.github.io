class TypingAnimation {
    constructor(elementId, text, speed = 100) {
        this.element = document.getElementById(elementId);
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.isTyping = false;
    }
    
    start() {
        if (this.isTyping || !this.element) return;
        
        this.isTyping = true;
        this.element.textContent = '';
        this.element.style.opacity = '1';
        
        // Add cursor
        this.element.classList.add('typing-cursor');
        
        this.typeNextCharacter();
    }
    
    typeNextCharacter() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            
            setTimeout(() => {
                this.typeNextCharacter();
            }, this.speed);
        } else {
            // Typing complete
            this.isTyping = false;
            
            // Remove cursor after a delay
            setTimeout(() => {
                this.element.classList.remove('typing-cursor');
            }, 1000);
        }
    }
    
    reset() {
        this.currentIndex = 0;
        this.isTyping = false;
        this.element.textContent = '';
        this.element.classList.remove('typing-cursor');
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingText = new TypingAnimation(
        'typing-text', 
        'Wiring general intelligence through reinforcement learning',
        80
    );
    
    // Start typing after a short delay
    setTimeout(() => {
        typingText.start();
    }, 500);
});