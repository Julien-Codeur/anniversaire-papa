document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('surprise-btn');
    const introText = document.getElementById('intro-text');
    const hiddenMessage = document.getElementById('hidden-message');

    // Quand on clique sur le bouton
    button.addEventListener('click', () => {
        // 1. Cacher le bouton et le texte d'intro
        button.style.display = 'none';
        introText.style.display = 'none';

        // 2. Afficher le message d'anniversaire
        hiddenMessage.style.display = 'block';

        // 3. Lancer une première grosse explosion de confettis
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 4. Lancer une pluie continue de confettis pendant quelques secondes
        let duration = 3 * 1000; // 3 secondes
        let animationEnd = Date.now() + duration;
        let skew = 1;

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            let timeLeft = animationEnd - Date.now();
            let ticks = Math.max(200, 500 * (timeLeft / duration));

            if (timeLeft <= 0) {
                 return; // Fin de l'animation
            }

            let particleCount = 50 * (timeLeft / duration);

            // Confettis venant de gauche et droite de manière aléatoire
            confetti({
                particleCount: particleCount,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: Math.random(),
                    // y: Math.random() - 0.2
                    y: Math.random() * 0.6 
                },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] // Couleurs festives
            });

            setTimeout(frame, 250); // Relance la fonction frame toutes les 250ms
        }());
    });
});