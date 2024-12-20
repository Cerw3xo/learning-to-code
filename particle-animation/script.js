const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const maxDistance = 120;

let mouseX = null;
let mouseY = null;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width)
            this.x = 0;
        if (this.x < 0)
            this.x = canvas.width;
        if (this.y > canvas.height)
            this.y = 0;
        if (this.y < 0) 
            this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

for ( let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    for (let i = 0; i < particleCount; i++) {
        for ( let j = i +1 ; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    if (mouseX !== null && mouseY !== null) {
        for (let i = 0; i < particleCount; i++) {
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < maxDistance) {
                const opacity = 1 -distance / maxDistance;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * .5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});