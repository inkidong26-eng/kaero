import React, { useEffect, useRef } from 'react';
import { LiveWeatherData } from '../types/weather';

interface Props {
  condition?: LiveWeatherData['weatherCondition'];
  isDay?: boolean;
  theme?: 'light' | 'dark';
}

export const WeatherAtmosphere: React.FC<Props> = ({ condition = 'cloudy', isDay = true, theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles system
    interface Particle {
      x: number;
      y: number;
      length: number;
      speed: number;
      size: number;
      opacity: number;
      angle?: number;
      spin?: number;
    }

    const particles: Particle[] = [];
    const count = condition === 'rain' ? 120 : condition === 'snow' ? 60 : 30;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: condition === 'rain' ? Math.random() * 12 + 10 : condition === 'snow' ? Math.random() * 1.5 + 0.8 : Math.random() * 0.4 + 0.2,
        size: condition === 'snow' ? Math.random() * 3 + 1.5 : Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
      });
    }

    let lightningTimer = 0;
    let lightningFlash = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Thunder lightning flash
      if (condition === 'thunder') {
        lightningTimer++;
        if (lightningTimer > 280 && Math.random() < 0.03) {
          lightningFlash = 0.8;
          lightningTimer = 0;
        }
        if (lightningFlash > 0) {
          ctx.fillStyle = theme === 'dark' 
            ? `rgba(224, 231, 255, ${lightningFlash})` 
            : `rgba(255, 255, 255, ${lightningFlash})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlash -= 0.05;
        }
      }

      // Rain render
      if (condition === 'rain' || condition === 'thunder') {
        ctx.strokeStyle = theme === 'dark'
          ? (condition === 'thunder' ? 'rgba(186, 230, 253, 0.5)' : 'rgba(125, 211, 252, 0.45)')
          : (condition === 'thunder' ? 'rgba(56, 189, 248, 0.65)' : 'rgba(2, 132, 199, 0.45)');
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (const p of particles) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 3, p.y + p.length);
          p.y += p.speed;
          p.x -= 1.5;
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        }
        ctx.stroke();
      }

      // Snow render
      if (condition === 'snow') {
        for (const p of particles) {
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.angle !== undefined && p.spin !== undefined) {
            p.angle += p.spin;
            ctx.rotate(p.angle);
          }
          ctx.fillStyle = theme === 'dark'
            ? `rgba(248, 250, 252, ${p.opacity})`
            : `rgba(186, 230, 253, ${p.opacity * 0.9})`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          p.y += p.speed;
          p.x += Math.sin(p.y * 0.015) * 0.8;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        }
      }

      // Clear or Cloudy subtle floating ambient orbs
      if (condition === 'clear' || condition === 'cloudy' || condition === 'fog') {
        for (const p of particles) {
          ctx.fillStyle = condition === 'clear'
            ? isDay 
              ? (theme === 'dark' ? `rgba(253, 224, 71, ${p.opacity * 0.18})` : `rgba(234, 179, 8, ${p.opacity * 0.22})`) 
              : (theme === 'dark' ? `rgba(224, 231, 255, ${p.opacity * 0.25})` : `rgba(99, 102, 241, ${p.opacity * 0.15})`)
            : (theme === 'dark' ? `rgba(203, 213, 225, ${p.opacity * 0.12})` : `rgba(148, 163, 184, ${p.opacity * 0.2})`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 22, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed * 0.3;
          p.x += Math.sin(p.y * 0.005) * 0.2;
          if (p.y < -50) {
            p.y = height + 50;
            p.x = Math.random() * width;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [condition, isDay, theme]);

  // Distinct background gradients based on weather condition and theme
  const getBackgroundGradient = () => {
    if (theme === 'light') {
      switch (condition) {
        case 'clear':
          return isDay
            ? 'bg-gradient-to-b from-sky-200 via-sky-50 to-slate-100'
            : 'bg-gradient-to-b from-indigo-200 via-sky-100 to-slate-100';
        case 'rain':
          return 'bg-gradient-to-b from-slate-300 via-sky-100 to-slate-100';
        case 'thunder':
          return 'bg-gradient-to-b from-slate-400 via-indigo-200 to-slate-200';
        case 'snow':
          return 'bg-gradient-to-b from-cyan-100 via-slate-100 to-sky-50';
        case 'fog':
          return 'bg-gradient-to-b from-slate-200 via-zinc-100 to-slate-100';
        case 'cloudy':
        default:
          return 'bg-gradient-to-b from-slate-200 via-sky-50 to-slate-100';
      }
    }

    // Dark Mode Gradients
    switch (condition) {
      case 'clear':
        return isDay
          ? 'bg-gradient-to-b from-sky-900 via-sky-950 to-slate-950'
          : 'bg-gradient-to-b from-indigo-950 via-slate-950 to-black';
      case 'rain':
        return 'bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950';
      case 'thunder':
        return 'bg-gradient-to-b from-purple-950 via-slate-950 to-black';
      case 'snow':
        return 'bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950';
      case 'fog':
        return 'bg-gradient-to-b from-zinc-900 via-slate-900 to-neutral-950';
      case 'cloudy':
      default:
        return 'bg-gradient-to-b from-slate-900 via-slate-950 to-black';
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none transition-colors duration-1000 ${getBackgroundGradient()} -z-10 overflow-hidden`}>
      {/* Decorative ambient lighting glow */}
      {condition === 'clear' && isDay && (
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none anim-sun ${
          theme === 'light' ? 'bg-amber-300/30' : 'bg-amber-400/10'
        }`} />
      )}
      {condition === 'thunder' && (
        <div className={`absolute top-1/3 left-1/3 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none ${
          theme === 'light' ? 'bg-indigo-300/25' : 'bg-indigo-500/10'
        }`} />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
