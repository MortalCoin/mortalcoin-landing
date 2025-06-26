// Future JavaScript for interactivity can be added here. 

window.addEventListener('load', () => {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) return;

    // Parameters from the game's Rain component
    const density = 35; // 'light' intensity would be ~21
    const color = 'rgba(255, 255, 255, 0.6)';
    const speed = 1;

    function createRaindrop() {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');

        const left = Math.random() * 100;
        const duration = (0.8 + Math.random() * 0.7) / speed;
        const delay = Math.random() * 0.9;
        // 'light' intensity size
        const size = 0.8 + Math.random() * 1.2; 

        drop.style.left = `${left}%`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${color})`;
        drop.style.width = `${size}px`;
        drop.style.height = `${size * 20}px`; // Make drops longer for better visibility

        rainContainer.appendChild(drop);
    }

    for (let i = 0; i < density; i++) {
        createRaindrop();
    }

    // Scroll-triggered animations for all relevant sections
    const titleContainers = document.querySelectorAll('.title-container');

    if (titleContainers.length > 0) {
        const timeoutMap = new WeakMap(); // Use a WeakMap to store timers for each element

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const animationElement = entry.target.querySelector('.scroll-animation');
                if (!animationElement) return;

                // Always clear any existing timer for this specific element
                if (timeoutMap.has(entry.target)) {
                    clearTimeout(timeoutMap.get(entry.target));
                    timeoutMap.delete(entry.target);
                }

                if (entry.isIntersecting) {
                    animationElement.classList.remove('fade-out');
                    animationElement.classList.add('animate');

                    // Cache-busting to force GIF replay
                    const originalSrc = animationElement.src.split('?')[0];
                    animationElement.src = `${originalSrc}?t=${new Date().getTime()}`;

                    const newTimeout = setTimeout(() => {
                        animationElement.classList.add('fade-out');
                    }, 1700); // GIF duration

                    timeoutMap.set(entry.target, newTimeout); // Store the new timer
                } else {
                    animationElement.classList.remove('animate', 'fade-out');
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the title container is visible
        });

        titleContainers.forEach(container => {
            observer.observe(container);
        });
    }
}); 