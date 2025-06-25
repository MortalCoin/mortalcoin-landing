// Future JavaScript for interactivity can be added here. 

document.addEventListener('DOMContentLoaded', () => {
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

    // Scroll-triggered animation
    const aboutSection = document.getElementById('about-section');
    const buterinAnimation = document.getElementById('buterin-animation');

    if (aboutSection && buterinAnimation) {
        let fadeOutTimeout; // To hold the reference to the timer

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is visible
                    buterinAnimation.classList.remove('fade-out'); // Reset fade-out state
                    buterinAnimation.classList.add('animate');     // Trigger slide-in

                    // Force GIF to replay
                    const originalSrc = buterinAnimation.src;
                    buterinAnimation.src = '';
                    buterinAnimation.src = originalSrc;

                    // Clear any existing timer
                    clearTimeout(fadeOutTimeout);

                    // Set a new timer to fade out after playing
                    fadeOutTimeout = setTimeout(() => {
                        buterinAnimation.classList.add('fade-out');
                    }, 1700); // GIF duration + small buffer

                } else {
                    // Element is not visible, reset everything for the next time
                    buterinAnimation.classList.remove('animate');
                    buterinAnimation.classList.remove('fade-out');
                    clearTimeout(fadeOutTimeout);
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });

        observer.observe(aboutSection);
    }

    // Scroll-triggered animation for Features section
    const featuresSection = document.getElementById('features-section');
    const btcAnimation = document.getElementById('btc-animation');

    if (featuresSection && btcAnimation) {
        let fadeOutTimeout;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    btcAnimation.classList.remove('fade-out');
                    btcAnimation.classList.add('animate');

                    const originalSrc = btcAnimation.src;
                    btcAnimation.src = '';
                    btcAnimation.src = originalSrc;

                    clearTimeout(fadeOutTimeout);

                    // We need to know the duration of this specific GIF
                    // Assuming it's similar to the other one, around 1.7s
                    fadeOutTimeout = setTimeout(() => {
                        btcAnimation.classList.add('fade-out');
                    }, 1700);

                } else {
                    btcAnimation.classList.remove('animate');
                    btcAnimation.classList.remove('fade-out');
                    clearTimeout(fadeOutTimeout);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(featuresSection);
    }

    // Scroll-triggered animation for Battle System section
    const battleSystemSection = document.getElementById('battle-system-section');
    const solanaAnimation = document.getElementById('solana-animation');

    if (battleSystemSection && solanaAnimation) {
        let fadeOutTimeout;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    solanaAnimation.classList.remove('fade-out');
                    solanaAnimation.classList.add('animate');

                    const originalSrc = solanaAnimation.src;
                    solanaAnimation.src = '';
                    solanaAnimation.src = originalSrc;

                    clearTimeout(fadeOutTimeout);

                    // Assuming a similar duration for this GIF
                    fadeOutTimeout = setTimeout(() => {
                        solanaAnimation.classList.add('fade-out');
                    }, 1700);

                } else {
                    solanaAnimation.classList.remove('animate');
                    solanaAnimation.classList.remove('fade-out');
                    clearTimeout(fadeOutTimeout);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(battleSystemSection);
    }
}); 