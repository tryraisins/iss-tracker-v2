'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleDir: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Star colors - warm and cool mix
    const starColors = [
      '#ffffff',
      '#ffe4c4',
      '#c9e4ff',
      '#ffd4e5',
      '#d4ffe5',
      '#00e5c7',
      '#ff8c5a',
    ];

    // Create stars with varied properties
    const stars: Star[] = [];
    const starCount = 350;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.3,
        brightness: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting stars array
    const shootingStars: ShootingStar[] = [];

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach(star => {
        // Twinkle effect
        star.brightness += star.twinkleSpeed * star.twinkleDir;
        if (star.brightness >= 1) {
          star.twinkleDir = -1;
          star.brightness = 1;
        }
        if (star.brightness <= 0.1) {
          star.twinkleDir = 1;
          star.brightness = 0.1;
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.fill();

        // Draw glow for brighter stars
        if (star.brightness > 0.6 && star.size > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = star.brightness * 0.3;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      // Spawn shooting stars randomly
      if (Math.random() < 0.008 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.4,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 15 + 10,
          angle: Math.random() * 0.5 + 0.3, // Diagonal angle
          opacity: 1,
          active: true,
        });
      }

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        // Create gradient trail
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.3, `rgba(0, 229, 199, ${star.opacity * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Glow around head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
        const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 6);
        headGlow.addColorStop(0, `rgba(0, 229, 199, ${star.opacity * 0.5})`);
        headGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = headGlow;
        ctx.fill();

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.012;

        // Remove when done
        if (star.opacity <= 0 || star.x > canvas.width + 100 || star.y > canvas.height + 100) {
          shootingStars.splice(index, 1);
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}