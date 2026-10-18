'use client';

import { useEffect, useRef } from 'react';

interface Plane {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  heading: 1 | -1;
  state: 'cruising' | 'falling';
  fallTime: number;
}

export default function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let lastTime = performance.now();
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();

    let nextPlaneId = 1;
    const planes: Plane[] = [];
    let mouseX = -999;
    let mouseY = -999;
    let hoveredId: number | null = null;

    const createPlane = (initialX?: number): Plane => {
      const heading = Math.random() > 0.5 ? 1 : -1;
      const depth = Math.random();
      let scale = 0.5;
      let speed = 30;

      if (depth > 0.66) { scale = 0.9; speed = 60; }
      else if (depth > 0.33) { scale = 0.7; speed = 45; }

      return {
        id: nextPlaneId++,
        x: initialX ?? (heading === 1 ? -100 : width + 100),
        y: height * (0.1 + Math.random() * 0.7),
        vx: heading * speed,
        vy: 0,
        scale,
        heading,
        state: 'cruising',
        fallTime: 0,
      };
    };

    const initCount = width < 768 ? 4 : 8;
    for (let i = 0; i < initCount; i++) planes.push(createPlane((width / initCount) * i));

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      let found = null;
      for (const p of planes) {
        if (p.state === 'cruising' && Math.hypot(p.x - mouseX, p.y - mouseY) <= 50 * p.scale) {
          found = p.id;
          break;
        }
      }
      hoveredId = found;
      document.body.style.cursor = found ? 'crosshair' : '';
    };

    const handlePointerDown = () => {
      if (hoveredId) {
        const p = planes.find(p => p.id === hoveredId);
        if (p) {
          p.state = 'falling';
          p.vy = 20; // Düşüş başlangıç hızı
        }
        hoveredId = null;
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', resizeCanvas);

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.3)'; // Zinc 800
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 100) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y <= height; y += 100) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
    };

    const drawJet = (p: Plane) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      const isHovered = hoveredId === p.id;

      // Düşüş rotasyonu veya normal uçuş
      if (p.state === 'falling') {
        ctx.rotate(p.fallTime * 4 * p.heading); // Kendi etrafında dönme
      } else if (p.heading === -1) {
        ctx.scale(-1, 1);
      }

      ctx.scale(p.scale, p.scale);

      // Opaklık ayarları
      ctx.globalAlpha = (isHovered || p.state === 'falling') ? 0.8 : (p.scale * 0.4);

      // Tel Kafes Gövde
      ctx.beginPath();
      ctx.moveTo(18, 0); ctx.lineTo(8, -3); ctx.lineTo(0, -4); ctx.lineTo(-6, -12);
      ctx.lineTo(-10, -12); ctx.lineTo(-8, -4); ctx.lineTo(-16, -6); ctx.lineTo(-18, -2);
      ctx.lineTo(-15, 0); ctx.lineTo(-18, 2); ctx.lineTo(-16, 6); ctx.lineTo(-8, 4);
      ctx.lineTo(-10, 12); ctx.lineTo(-6, 12); ctx.lineTo(0, 4); ctx.lineTo(8, 3);
      ctx.closePath();

      ctx.fillStyle = isHovered ? 'rgba(234, 88, 12, 0.15)' : 'transparent';
      ctx.fill();
      ctx.lineWidth = isHovered ? 1.5 : 1;
      ctx.strokeStyle = isHovered ? '#ea580c' : '#71717a'; // Orange veya Zinc
      ctx.stroke();

      // Kilitlenme Hedef Kutusu (Hover durumunda)
      if (isHovered && p.state === 'cruising') {
        ctx.strokeStyle = '#ea580c';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(-24, -18, 48, 36);
        ctx.setLineDash([]);
        ctx.font = '8px monospace';
        ctx.fillStyle = '#ea580c';
        ctx.fillText(`TRK-${p.id.toString().padStart(3, '0')}`, -22, -22);
      }

      ctx.restore();
    };

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      drawGrid();

      planes.forEach((p) => {
        if (p.state === 'cruising') {
          p.x += p.vx * dt;
          if ((p.heading === 1 && p.x > width + 100) || (p.heading === -1 && p.x < -100)) {
            Object.assign(p, createPlane(p.heading === 1 ? -100 : width + 100));
          }
        } else if (p.state === 'falling') {
          p.fallTime += dt;
          p.vy += 40 * dt; // Yerçekimi ivmesi
          p.x += (p.vx * 0.5) * dt; // İleri doğru hızı yavaşlar
          p.y += p.vy;

          if (p.y > height + 100) {
            Object.assign(p, createPlane(p.heading === 1 ? -100 : width + 100));
          }
        }
        drawJet(p);
      });

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', resizeCanvas);
      document.body.style.cursor = '';
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto block w-full h-full" />;
}