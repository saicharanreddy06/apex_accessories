
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Inject the Toggle UI into the Navbar ---
    const toggleWrapper = document.createElement('div');
    toggleWrapper.id = 'theme-controls';
    toggleWrapper.innerHTML = `
        <button id="toggle-theme-btn" class="theme-nav-btn" title="Toggle Dark Mode"><i class="bi bi-moon-fill"></i></button>
        <button id="toggle-dir-btn" class="theme-nav-btn" title="Toggle RTL/LTR">RTL</button>
    `;
    
    // Find the header-cta (where the "Custom Team Order" button is)
    const headerCta = document.querySelector('.header-cta');
    if (headerCta) {
        headerCta.prepend(toggleWrapper); // Put toggles before the CTA button
    } else {
        // Fallback if navbar doesn't exist
        document.body.appendChild(toggleWrapper);
    }

    // --- 2. State Management ---
    let isDark = localStorage.getItem('apex_theme') === 'dark';
    let isRtl = localStorage.getItem('apex_dir') === 'rtl';

    const themeBtn = document.getElementById('toggle-theme-btn');
    const dirBtn = document.getElementById('toggle-dir-btn');

    function applyTheme() {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
        localStorage.setItem('apex_theme', isDark ? 'dark' : 'light');
    }

    function applyDir() {
        if (isRtl) {
            document.documentElement.dir = 'rtl';
            dirBtn.innerText = 'LTR';
        } else {
            document.documentElement.dir = 'ltr';
            dirBtn.innerText = 'RTL';
        }
        localStorage.setItem('apex_dir', isRtl ? 'rtl' : 'ltr');
    }

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        applyTheme();
    });

    dirBtn.addEventListener('click', () => {
        isRtl = !isRtl;
        applyDir();
    });

    // --- 3. Dynamic CSS Injection ---
    // CSS logic has been moved to global.css

    // Initialize State
    applyTheme();
    applyDir();
});
