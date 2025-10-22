'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  twinkleSpeed: number;
  originalBrightness: number;
  twinkleDirection: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars with enhanced twinkling properties
    const stars: Star[] = [];
    const starCount = 300; // Increased star count for better effect

    for (let i = 0; i < starCount; i++) {
      const originalBrightness = Math.random() * 0.7 + 0.3;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Slightly larger size variation
        speed: Math.random() * 0.3 + 0.1,
        brightness: originalBrightness,
        twinkleSpeed: Math.random() * 0.05 + 0.02, // Different twinkle speeds
        originalBrightness: originalBrightness,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1, // Random twinkle direction
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      angle: number;
      active: boolean;
      opacity: number;
    }> = [];

    // Animation
    const animate = () => {
      // Clear canvas with a darker space background
      ctx.fillStyle = 'rgba(4, 7, 35, 0.8)'; // Darker background for better star visibility
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update static stars with enhanced twinkling
      stars.forEach(star => {
        // Enhanced twinkling effect
        star.brightness += star.twinkleSpeed * star.twinkleDirection;
        
        // Reverse direction when reaching limits
        if (star.brightness >= star.originalBrightness + 0.4) {
          star.twinkleDirection = -1;
        } else if (star.brightness <= star.originalBrightness - 0.4) {
          star.twinkleDirection = 1;
        }

        // Ensure brightness stays within bounds
        star.brightness = Math.max(0.1, Math.min(1, star.brightness));

        // Draw star with glow effect for brighter stars
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Create a gradient fill for larger, brighter stars
        if (star.size > 1.5 && star.brightness > 0.7) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.brightness * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        }
        
        ctx.fill();

        // Add a subtle glow for all stars
        if (star.brightness > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.2})`;
          ctx.fill();
        }

        // Slow movement for some stars (parallax effect)
        if (Math.random() < 0.1) { // Only move some stars
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        }
      });

      // Enhanced shooting stars with better appearance
      if (Math.random() < 0.001 && shootingStars.length < 2) { // Less frequent
        shootingStars.push({
          x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
          y: Math.random() * canvas.height * 0.3,
          speed: Math.random() * 8 + 12,
          length: Math.random() * 80 + 60,
          angle: Math.random() * 0.3 + 0.4, // More diagonal angles
          active: true,
          opacity: 1,
        });
      }

      // Update and draw shooting stars with fade effect
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        // Create gradient for shooting star trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.length * Math.cos(star.angle),
          star.y + star.length * Math.sin(star.angle)
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.length * Math.cos(star.angle),
          star.y + star.length * Math.sin(star.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Add a bright head to the shooting star
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Update position and opacity
        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);
        star.opacity -= 0.02;

        // Remove when faded out or off screen
        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      // Add occasional star bursts (rare events)
      if (Math.random() < 0.0005) {
        // Create a small burst of stars
        for (let i = 0; i < 5; i++) {
          const burstX = Math.random() * canvas.width;
          const burstY = Math.random() * canvas.height;
          
          ctx.beginPath();
          ctx.arc(burstX, burstY, 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(180deg, #040723 0%, #0a0f2b 50%, #040723 100%)'
      }}
    />
  );
}