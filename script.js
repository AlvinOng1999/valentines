/* ============================================
   VALENTINE'S WEBSITE - INTERACTIVE SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== CREATE FLOATING HEARTS =====
    createFloatingHearts();
    createRosePetals();

    // ===== ENVELOPE INTERACTION =====
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const introSection = document.getElementById('introSection');
    const gallerySection = document.getElementById('gallerySection');

    envelopeWrapper.addEventListener('click', () => {
        envelope.classList.add('opened');

        setTimeout(() => {
            introSection.classList.add('hidden');
            gallerySection.classList.remove('hidden');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
            initFloatingPhotos();
        }, 1500);
    });

    // ===== CONTINUE TO QUESTION =====
    const continueBtn = document.getElementById('continueToQuestion');
    const questionSection = document.getElementById('questionSection');

    continueBtn.addEventListener('click', () => {
        gallerySection.classList.add('hidden');
        questionSection.classList.remove('hidden');
        questionSection.scrollIntoView({ behavior: 'smooth' });
    });

    // ===== YES BUTTON =====
    const yesBtn = document.getElementById('yesBtn');
    const celebrationSection = document.getElementById('celebrationSection');

    yesBtn.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        celebrationSection.classList.remove('hidden');
        celebrationSection.scrollIntoView({ behavior: 'smooth' });
        launchCelebration();
        buildCelebrationPhotos();
    });

    // ===== NO BUTTON - DODGE LOGIC =====
    const noBtn = document.getElementById('noBtn');
    const dodgeMessage = document.getElementById('dodgeMessage');
    const buttonsContainer = document.getElementById('buttonsContainer');
    let dodgeCount = 0;

    const dodgeMessages = [
        "Hehe, you can't say no! 😏💕",
        "Try again... oh wait, you can't! 😜",
        "Nope! That button is too fast for you! 💨",
        "Are you sure? Because the button isn't! 🏃‍♂️",
        "Just click Yes already! 💖",
        "The No button doesn't want to be clicked! 😂",
        "You're only making me love you more! 🥰",
        "Resistance is futile! 💘",
        "Why are you chasing No when Yes is right there? 😍",
        "I think Yes is the better option, don't you? 💝"
    ];

    function dodgeNoButton() {
        const container = buttonsContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Get viewport dimensions
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;

        // Generate random position
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Make sure it doesn't overlap with Yes button
        const yesBtnRect = yesBtn.getBoundingClientRect();
        while (
            Math.abs(newX - yesBtnRect.left) < yesBtnRect.width + 20 &&
            Math.abs(newY - yesBtnRect.top) < yesBtnRect.height + 20
        ) {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
        }

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '9999';
        noBtn.style.transition = 'all 0.15s ease';

        // Show dodge message
        dodgeCount++;
        dodgeMessage.classList.remove('hidden');
        dodgeMessage.textContent = dodgeMessages[dodgeCount % dodgeMessages.length];

        // Make Yes button grow slightly with each dodge
        const scale = 1 + (dodgeCount * 0.05);
        yesBtn.style.transform = `scale(${Math.min(scale, 1.5)})`;

        // Add extra hearts on dodge
        createBurstHearts(newX + btnRect.width / 2, newY + btnRect.height / 2);
    }

    noBtn.addEventListener('mouseenter', dodgeNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dodgeNoButton();
    });
});

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '♥️', '🌹'];

    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(heart);
    }
}

// ===== ROSE PETALS =====
function createRosePetals() {
    const container = document.getElementById('petalsContainer');

    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.width = (Math.random() * 10 + 8) + 'px';
        petal.style.height = (Math.random() * 10 + 8) + 'px';
        petal.style.animationDuration = (Math.random() * 10 + 8) + 's';
        petal.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(petal);
    }
}

// ===== BURST HEARTS (on dodge) =====
function createBurstHearts(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗'];
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';
        heart.style.transition = 'all 1s ease-out';

        document.body.appendChild(heart);

        const angle = (Math.PI * 2 / 6) * i;
        const distance = 80 + Math.random() * 60;

        requestAnimationFrame(() => {
            heart.style.left = (x + Math.cos(angle) * distance) + 'px';
            heart.style.top = (y + Math.sin(angle) * distance) + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0)';
        });

        setTimeout(() => heart.remove(), 1000);
    }
}

// ===== FLOATING BOUNCING PHOTOS =====
let floatingAnimationId = null;

function initFloatingPhotos() {
    const container = document.getElementById('floatingPhotos');
    const bubbles = container.querySelectorAll('.photo-bubble');
    const rect = container.getBoundingClientRect();
    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;

    const physics = [];

    bubbles.forEach((bubble, i) => {
        const size = bubble.offsetWidth;
        // Spread initial positions so they don't all stack
        const cols = 5;
        const rows = 2;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const spacingX = (containerW - size) / cols;
        const spacingY = (containerH - size) / rows;

        const x = col * spacingX + Math.random() * 30;
        const y = row * spacingY + Math.random() * 30;

        // Random velocity — different speeds and directions
        const speed = 0.6 + Math.random() * 0.8;
        const angle = Math.random() * Math.PI * 2;

        physics.push({
            el: bubble,
            x: Math.max(0, Math.min(x, containerW - size)),
            y: Math.max(0, Math.min(y, containerH - size)),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size
        });

        bubble.style.position = 'absolute';
        bubble.style.left = physics[i].x + 'px';
        bubble.style.top = physics[i].y + 'px';

        // Click to enlarge
        bubble.addEventListener('click', () => {
            const img = bubble.querySelector('img');
            openPhotoViewer(img.src);
        });
    });

    // Physics animation loop — bouncing off walls and each other
    function animate() {
        const w = container.offsetWidth;
        const h = container.offsetHeight;

        physics.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x <= 0) { p.x = 0; p.vx = Math.abs(p.vx); }
            if (p.x + p.size >= w) { p.x = w - p.size; p.vx = -Math.abs(p.vx); }
            if (p.y <= 0) { p.y = 0; p.vy = Math.abs(p.vy); }
            if (p.y + p.size >= h) { p.y = h - p.size; p.vy = -Math.abs(p.vy); }

            // Bounce off other bubbles
            for (let j = i + 1; j < physics.length; j++) {
                const q = physics[j];
                const dx = (p.x + p.size / 2) - (q.x + q.size / 2);
                const dy = (p.y + p.size / 2) - (q.y + q.size / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = (p.size + q.size) / 2;

                if (dist < minDist && dist > 0) {
                    // Push apart
                    const nx = dx / dist;
                    const ny = dy / dist;
                    const overlap = minDist - dist;

                    p.x += nx * overlap * 0.5;
                    p.y += ny * overlap * 0.5;
                    q.x -= nx * overlap * 0.5;
                    q.y -= ny * overlap * 0.5;

                    // Swap velocities along collision axis
                    const dvx = p.vx - q.vx;
                    const dvy = p.vy - q.vy;
                    const dot = dvx * nx + dvy * ny;

                    p.vx -= dot * nx * 0.8;
                    p.vy -= dot * ny * 0.8;
                    q.vx += dot * nx * 0.8;
                    q.vy += dot * ny * 0.8;
                }
            }

            // Apply slight random drift to keep things lively
            p.vx += (Math.random() - 0.5) * 0.02;
            p.vy += (Math.random() - 0.5) * 0.02;

            // Speed limit
            const maxSpeed = 1.8;
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > maxSpeed) {
                p.vx = (p.vx / speed) * maxSpeed;
                p.vy = (p.vy / speed) * maxSpeed;
            }

            // Keep minimum speed so they never stop
            const minSpeed = 0.3;
            if (speed < minSpeed) {
                p.vx = (p.vx / (speed || 1)) * minSpeed;
                p.vy = (p.vy / (speed || 1)) * minSpeed;
            }

            // Update DOM
            p.el.style.left = p.x + 'px';
            p.el.style.top = p.y + 'px';
        });

        floatingAnimationId = requestAnimationFrame(animate);
    }

    animate();
}

// ===== PHOTO VIEWER =====
function openPhotoViewer(src) {
    const viewer = document.getElementById('photoViewer');
    const img = document.getElementById('viewerImage');
    const closeBtn = document.getElementById('viewerClose');

    img.src = src;
    viewer.classList.remove('hidden');

    function close() {
        viewer.classList.add('hidden');
        closeBtn.removeEventListener('click', close);
        viewer.removeEventListener('click', bgClose);
    }

    function bgClose(e) {
        if (e.target === viewer) close();
    }

    closeBtn.addEventListener('click', close);
    viewer.addEventListener('click', bgClose);
}

// ===== CELEBRATION =====
function buildCelebrationPhotos() {
    const container = document.getElementById('celebrationPhotos');
    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const img = document.createElement('img');
        img.src = `images/photo${i}.jpeg`;
        img.alt = `Our moment ${i}`;
        img.style.animationDelay = (i * 0.1) + 's';
        container.appendChild(img);
    }
}

function launchCelebration() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const confetti = [];
    const colors = ['#ff6b9d', '#e84393', '#ff4757', '#f9ca24', '#ff6348',
                     '#ff9ff3', '#feca57', '#ff6b6b', '#ee5a24', '#ffffff'];

    // Create confetti particles
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 12 + 5,
            h: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            angle: Math.random() * 360,
            spin: (Math.random() - 0.5) * 10,
            drift: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    // Also add heart-shaped confetti
    const heartEmojis = ['❤️', '💕', '💖', '💗', '🌹', '💘', '✨'];
    const emojiConfetti = [];
    for (let i = 0; i < 30; i++) {
        emojiConfetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            size: Math.random() * 20 + 16,
            speed: Math.random() * 3 + 1,
            drift: (Math.random() - 0.5) * 2,
            spin: (Math.random() - 0.5) * 5
        });
    }

    let frame = 0;
    const maxFrames = 400; // Run for ~6.5 seconds

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

            if (frame > maxFrames - 100) {
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
