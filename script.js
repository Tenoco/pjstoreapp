document.addEventListener('DOMContentLoaded', function() {
    const theme = getCookie('theme') || 'dark';
    document.body.classList.toggle('light', theme === 'light');
    updateThemeButtonText();

    document.getElementById('theme-toggle-button').addEventListener('click', function() {
        const newTheme = document.body.classList.toggle('light') ? 'light' : 'dark';
        setCookie('theme', newTheme, 365);
        updateThemeButtonText();
    });

    document.getElementById('search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterApps(query);
    });
});

function setCookie(name, value, days) {
     const expires = new Date(Date.now() + days * 864e5).toUTCString();
     document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
     return document.cookie.split('; ').reduce((r, v) => {
         const parts = v.split('=');
         return parts[0] === name ? decodeURIComponent(parts[1]) : r;
     }, '');
}

function updateThemeButtonText() {
     const button = document.getElementById('theme-toggle-button');
     button.textContent = document.body.classList.contains('light') ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

function filterApps(query) {
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        const appName = card.querySelector('.icon-label').textContent.toLowerCase();
        const tags = card.getAttribute('data-tags').toLowerCase();
        if (appName.includes(query) || tags.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}