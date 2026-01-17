// ========================================
// PARTICLE NETWORK
// ========================================
class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    // Config
    this.config = {
      particleCount: 80,
      particleSize: { min: 1, max: 3 },
      lineDistance: 120,
      speed: 0.4,
      colors: {
        particle: 'rgba(0, 212, 170, 0.8)',
        line: 'rgba(0, 212, 170, 0.15)',
        lineHover: 'rgba(124, 58, 237, 0.3)'
      }
    };

    this.init();
    this.animate();
    this.setupEvents();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    const header = this.canvas.parentElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = header.offsetHeight;
  }

  createParticles() {
    this.particles = [];
    const { particleCount, particleSize, speed } = this.config;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * (particleSize.max - particleSize.min) + particleSize.min
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    this.canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.parentElement.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawParticle(p) {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.config.colors.particle;
    this.ctx.fill();
  }

  drawLine(p1, p2, distance) {
    const opacity = 1 - (distance / this.config.lineDistance);
    
    // Check if mouse is near this line
    let lineColor = this.config.colors.line;
    if (this.mouse.x !== null) {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const mouseDistance = Math.sqrt(
        Math.pow(midX - this.mouse.x, 2) + Math.pow(midY - this.mouse.y, 2)
      );
      if (mouseDistance < this.mouse.radius) {
        lineColor = this.config.colors.lineHover;
      }
    }

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.strokeStyle = lineColor.replace('0.15', (opacity * 0.2).toFixed(2)).replace('0.3', (opacity * 0.4).toFixed(2));
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  update() {
    for (const p of this.particles) {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse interaction - gentle push
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          p.vx += (dx / distance) * force * 0.02;
          p.vy += (dy / distance) * force * 0.02;
        }
      }

      // Limit speed
      const maxSpeed = 1;
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (currentSpeed > maxSpeed) {
        p.vx = (p.vx / currentSpeed) * maxSpeed;
        p.vy = (p.vy / currentSpeed) * maxSpeed;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw lines between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.lineDistance) {
          this.drawLine(this.particles[i], this.particles[j], distance);
        }
      }
    }

    // Draw particles
    for (const p of this.particles) {
      this.drawParticle(p);
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle network
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-network');
  if (canvas) {
    new ParticleNetwork(canvas);
  }
});
