function celebrate() {
    // Create multiple fireworks
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = window.innerWidth / 2 + Math.random() * 400 - 200;
            const y = window.innerHeight / 2 + Math.random() * 200 - 100;
            fireworks.push(new Firework(x, y));
        }, i * 100);
    }

    // Show celebration message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 2.5em;
        font-weight: bold;
        z-index: 100;
        animation: popIn 0.5s ease-out;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    `;
    message.innerHTML = '💍 SIM! EU ACEITO! 💍<br>Te Amo Para Sempre ❤️';
    document.body.appendChild(message);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove button and message after some time
    setTimeout(() => {
        document.querySelector('.proposal-box').style.display = 'none';
    }, 500);
}

function moveButton(e) {
    const btn = e.target;
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}
