import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const numParticles = 100;
    const maxDistance = 120;

    const createParticle = () => {
      let x, y;
      if (Math.random() < 0.6) { // 60% chance to be in the bottom 40% of the screen
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height * 0.4 + canvas.height * 0.6;
      } else { // 40% chance to be in the left/right 15% of the screen in the top 60%
        if (Math.random() < 0.5) { // Left 15%
          x = Math.random() * canvas.width * 0.15;
        } else { // Right 15%
          x = canvas.width * 0.85 + Math.random() * canvas.width * 0.15;
        }
        y = Math.random() * canvas.height * 0.6;
      }
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5, // Slower velocity
        vy: (Math.random() - 0.5) * 0.5,  // Slower velocity
        zIndex: 0
      };
    };

    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Ensure particles stay within the boundary regions and set zIndex
        if (p.y > canvas.height * 0.6) { // Bottom 40% of the screen
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < canvas.height * 0.6 || p.y > canvas.height) p.vy *= -1;
          p.zIndex = 0;
        } else { // Top 60% of the screen
          if ((p.x < 0 || p.x > canvas.width * 0.15) && (p.x < canvas.width * 0.85 || p.x > canvas.width)) {
            p.vx *= -1;
          }
          if (p.y < 0 || p.y > canvas.height * 0.6) p.vy *= -1;

          if (p.x > canvas.width * 0.15 && p.x < canvas.width * 0.85) {
            p.zIndex = -1;
          } else {
            p.zIndex = 0;
          }
        }

        if (p.zIndex === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      });

      for (let i = 0; i < numParticles; i++) {
        if (particles[i].zIndex === -1) continue;

        for (let j = i + 1; j < numParticles; j++) {
          if (particles[j].zIndex === -1) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default AnimatedBackground;
