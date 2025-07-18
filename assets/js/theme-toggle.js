class ThemeToggle {
    constructor() {
        this.button = document.getElementById('theme-toggle');
        this.icon = document.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add click event listener
        this.button.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});