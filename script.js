document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('.material-icons');
    
    // Function to apply the saved theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.textContent = 'dark_mode';
        } else {
            body.classList.remove('dark-theme');
            themeIcon.textContent = 'light_mode';
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check for user's system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme on load: saved theme > system preference > default (light)
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = isDark ? 'dark_mode' : 'light_mode';
    });


    // --- 2. HEADER SHADOW ON SCROLL ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 3. SCROLL REVEAL ANIMATION ---
    const scrollTargets = document.querySelectorAll('.scroll-target');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    scrollTargets.forEach(target => {
        observer.observe(target);
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Function to switch icons
    const toggleIcons = (isDark) => {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    };

    // Check theme on initial load
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        document.documentElement.classList.add('dark');
        toggleIcons(true);
    } else {
        toggleIcons(false);
    }

    // Listener for toggle button
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggleIcons(isDark);
    });
});