// Simple script for the landing page
document.addEventListener('DOMContentLoaded', function() {
    // Add a simple animation for the app cards
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach((card, index) => {
        // Stagger the animation slightly for each card
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Handle disabled links
    const disabledLinks = document.querySelectorAll('.app-link.disabled');
    disabledLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});
