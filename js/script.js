// Future JavaScript for interactivity can be added here. 

// vh unit fix for mobile browsers
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the value on initial load
setVh();

// Re-calculate on resize and orientation change
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

window.addEventListener('load', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNavContainer = document.getElementById('mobile-nav-container');

    if (hamburger && mobileNavContainer) {
        let isMenuPopulated = false;

        hamburger.addEventListener('click', () => {
            // Populate the menu only on the first click
            if (!isMenuPopulated) {
                const allNavLinks = document.querySelectorAll('.nav-links a');
                allNavLinks.forEach(link => {
                    const newLink = link.cloneNode(true);
                    mobileNavContainer.appendChild(newLink);
                });
                isMenuPopulated = true;
            }
            
            hamburger.classList.toggle('active');
            mobileNavContainer.classList.toggle('active');
        });
    }

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

    // Fetch and display leaderboard
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const leaderboardTableContainer = document.getElementById('leaderboard-table-container');

    if (leaderboardTableContainer) {
        fetch('https://api.mortalcoin.app/api/v1/statistics/leaderboard/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const loader = leaderboardTableContainer.querySelector('.leaderboard-loader');
                if (loader) {
                    loader.remove();
                }

                // Update total users count
                const totalUsersSpan = document.getElementById('total-users-count');
                if (totalUsersSpan && data.count) {
                    totalUsersSpan.textContent = data.count.toLocaleString();
                }

                const players = data.results;

                if (!players || players.length === 0) {
                    leaderboardTableContainer.innerHTML = '<p>Leaderboard is currently empty.</p>';
                    return;
                }

                const table = document.createElement('table');
                table.id = 'leaderboard-table';

                const thead = document.createElement('thead');
                thead.innerHTML = `
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Mortal Points</th>
                    </tr>
                `;
                table.appendChild(thead);

                const tbody = document.createElement('tbody');
                players.slice(0, 10).forEach(player => { // Display top 10
                    const row = document.createElement('tr');
                    
                    const rankCell = document.createElement('td');
                    rankCell.className = 'rank';
                    switch (player.rank) {
                        case 1:
                            rankCell.innerHTML = '👑';
                            break;
                        case 2:
                            rankCell.innerHTML = '🥈';
                            break;
                        case 3:
                            rankCell.innerHTML = '🥉';
                            break;
                        default:
                            rankCell.textContent = player.rank;
                    }
                    row.appendChild(rankCell);

                    const userCell = document.createElement('td');
                    userCell.className = 'user';
                    userCell.textContent = player.first_name || 'Anonymous';
                    row.appendChild(userCell);

                    const pointsCell = document.createElement('td');
                    pointsCell.className = 'points';
                    pointsCell.textContent = `${player.mortal_points} MP`;
                    row.appendChild(pointsCell);

                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                leaderboardTableContainer.appendChild(table);
            })
            .catch(error => {
                console.error('Failed to fetch leaderboard:', error);
                leaderboardTableContainer.innerHTML = '<p>Could not load leaderboard data. Please try again later.</p>';
            });
    }
}); 