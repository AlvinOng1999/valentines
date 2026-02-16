/* ============================================
   BIRTHDAY WEBSITE - FESTIVE INTERACTIVE SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== CREATE ALL BACKGROUND EFFECTS =====
    createFloatingBalloons();
    createConfettiParticles();
    createSparkleStars();
    launchConfettiCannon();
});

// ===== FLOATING BALLOONS (lots of them!) =====
function createFloatingBalloons() {
    const container = document.getElementById('balloonsBg');
    const balloonEmojis = ['🎈'];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#55efc4', '#a29bfe', '#fd79a8', '#fdcb6e', '#00cec9', '#e17055', '#6c5ce7', '#00b894'];

    // Create MANY balloons - 50 of them!
    for (let i = 0; i < 50; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.textContent = balloonEmojis[0];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.fontSize = (Math.random() * 30 + 25) + 'px';
        balloon.style.animationDuration = (Math.random() * 12 + 8) + 's';
        balloon.style.animationDelay = (Math.random() * 15) + 's';
        balloon.style.opacity = (Math.random() * 0.4 + 0.3);
        // Tint balloons different colors using CSS filter
        const hue = Math.random() * 360;
        balloon.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 4px 8px rgba(0,0,0,0.2))`;
        container.appendChild(balloon);
    }

    // Continuously add more balloons
    setInterval(() => {
        if (container.children.length > 80) {
            container.removeChild(container.children[0]);
        }
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.textContent = '🎈';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.fontSize = (Math.random() * 30 + 25) + 'px';
        balloon.style.animationDuration = (Math.random() * 12 + 8) + 's';
        balloon.style.animationDelay = '0s';
        balloon.style.opacity = (Math.random() * 0.4 + 0.3);
        const hue = Math.random() * 360;
        balloon.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 4px 8px rgba(0,0,0,0.2))`;
        container.appendChild(balloon);
    }, 800);
}

// ===== CONFETTI PARTICLES =====
function createConfettiParticles() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#55efc4', '#a29bfe', '#fd79a8', '#fdcb6e', '#ff9f43', '#e17055'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.background = color;
        confetti.style.borderRadius = shape;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = (Math.random() * 8 + 5) + 'px';
        confetti.style.animationDuration = (Math.random() * 8 + 6) + 's';
        confetti.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(confetti);
    }
}

// ===== SPARKLE STARS =====
function createSparkleStars() {
    const container = document.getElementById('sparkleContainer');
    const sparkles = ['✨', '⭐', '🌟', '💫'];

    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'sparkle-star';
        star.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 14 + 10) + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(star);
    }
}

// ===== CONFETTI CANNON (Canvas-based) =====
function launchConfettiCannon() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const confetti = [];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#55efc4',
                     '#a29bfe', '#fdcb6e', '#fd79a8', '#00cec9', '#e17055',
                     '#ffffff', '#f9ca24', '#6c5ce7'];

    // Create confetti particles
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 12 + 5,
            h: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1.5,
            angle: Math.random() * 360,
            spin: (Math.random() - 0.5) * 8,
            drift: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    // Birthday emoji confetti
    const bdayEmojis = ['🎈', '🎉', '🎊', '🎂', '🎁', '⭐', '✨', '🧧', '🎈', '🎈'];
    const emojiConfetti = [];
    for (let i = 0; i < 25; i++) {
        emojiConfetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            emoji: bdayEmojis[Math.floor(Math.random() * bdayEmojis.length)],
            size: Math.random() * 20 + 14,
            speed: Math.random() * 2.5 + 1,
            drift: (Math.random() - 0.5) * 2,
            spin: (Math.random() - 0.5) * 3
        });
    }

    let frame = 0;
    const maxFrames = 360;

    function animate() {
        if (frame > maxFrames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw rectangle confetti
        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate((c.angle * Math.PI) / 180);
            ctx.globalAlpha = c.opacity;
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();

            c.y += c.speed;
            c.x += c.drift;
            c.angle += c.spin;

            if (frame > maxFrames - 80) {
                c.opacity *= 0.98;
            }
        });

        // Draw emoji confetti
        emojiConfetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.font = `${c.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(c.emoji, 0, 0);
            ctx.restore();

            c.y += c.speed;
            c.x += c.drift;
        });

        frame++;
        requestAnimationFrame(animate);
    }

    animate();
}
