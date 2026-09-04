class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const colors = ['#FF1493', '#FF69B4', '#FFB6C1', '#FFA500', '#FFD700', '#FF6347', '#FF4500'];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 4 + Math.random() * 6;

            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: Math.random() * 0.015 + 0.015
            });
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
        });

        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw(ctx) {
        this.particles.forEach(particle => {
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    isAlive() {
        return this.particles.length > 0;
    }
}

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(firework => {
        firework.update();
        firework.draw(ctx);
    });

    fireworks = fireworks.filter(fw => fw.isAlive());

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('click', (e) => {
    fireworks.push(new Firework(e.clientX, e.clientY));
});

// Auto fireworks on page load
function autoFireworks() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    fireworks.push(new Firework(x + Math.random() * 200 - 100, y + Math.random() * 200 - 100));
}

// Launch fireworks periodically
setInterval(autoFireworks, 800);
