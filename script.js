/**
 * Countdown Logic for May 7th
 */
const prepareCountdown = () => {
    const targetDate = new Date();
    
    // Check if May 7th of the current year has passed. 
    // If we're past May 8th, countdown targets next year.
    const month = targetDate.getMonth();
    const date = targetDate.getDate();
    if (month > 4 || (month === 4 && date > 8)) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }
    
    // Set to May 7th, 00:00:00
    targetDate.setMonth(4); // 0-indexed, so 4 is May
    targetDate.setDate(7);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate.getTime();
};

const countDownDate = prepareCountdown();

const updateTimer = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in elements
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');
};

// Initial call and set interval
updateTimer();
setInterval(updateTimer, 1000);

/**
 * Cyber Particles Background Effect
 */
const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 80;

const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        // Cyberpunk colors: Primary Cyan, Secondary Magenta
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#ff003c'; 
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const initCanvas = () => {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
};

const animateCanvas = () => {
    // Clear canvas with slight opacity for trails
    ctx.fillStyle = 'rgba(3, 3, 11, 0.4)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles within a certain distance
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                // Stroke opacity based on distance
                const opacity = 1 - (distance / 120);
                
                // Mix color of the line based on the first particle
                const hexColor = particles[i].color === '#00f0ff' ? '0, 240, 255' : '255, 0, 60';
                
                ctx.strokeStyle = `rgba(${hexColor}, ${opacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
};

// Listeners
window.addEventListener('resize', initCanvas);

// Kick off
initCanvas();
animateCanvas();
