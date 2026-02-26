document.addEventListener('DOMContentLoaded', () => {
    const giftContainer = document.getElementById('gift-box');
    const introText = document.getElementById('intro-text');
    const hiddenMessage = document.getElementById('hidden-message');

    // Quand on clique sur le cadeau
    giftContainer.addEventListener('click', () => {
        // 1. Ajouter la classe pour l'animation d'ouverture
        giftContainer.classList.add('gift-open');
        
        // 2. Cacher le texte d'intro
        introText.style.opacity = '0';
        introText.style.transition = 'opacity 0.5s';

        // 3. Attendre la fin de l'animation du cadeau pour afficher le message
        setTimeout(() => {
            giftContainer.style.display = 'none';
            introText.style.display = 'none';
            
            // Afficher le message avec une classe pour l'animation CSS
            hiddenMessage.classList.remove('hidden');
            hiddenMessage.classList.add('show');
            
            // 4. Lancer les confettis
            launchConfetti();
        }, 500); // Délai correspondant à l'animation CSS
    });

    function launchConfetti() {
        // Première explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Pluie continue
        let duration = 3 * 1000;
        let animationEnd = Date.now() + duration;

        (function frame() {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) return;

            let particleCount = 50 * (timeLeft / duration);

            confetti({
                particleCount: particleCount,
                startVelocity: 30,
                spread: 360,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff']
            });

            requestAnimationFrame(frame);
        }());
    }
});