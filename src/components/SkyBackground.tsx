'use client';

import React, { useEffect, useRef } from 'react';

interface Plane {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseY: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  scale: number;
  opacity: number;
  heading: 1 | -1; // 1: left -> right, -1: right -> left
  angle: number;
  state: 'cruising' | 'falling' | 'dead';
  fallTime: number;
  targetPitch: number;
  smokeTimer: number;
  respawnIn: number;
  bodyColor: string;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
  textureIdx: number;
  width: number;
  height: number;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface HitFlash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let lastTime = performance.now();
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = getDpr();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    // 1. PRE-RENDER SOFT WHITE/SKY CLOUD TEXTURES
    const cloudTextures: HTMLCanvasElement[] = [];
    const createCloudTexture = (texW: number, texH: number, r: number, g: number, b: number) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = texW;
      offCanvas.height = texH;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return offCanvas;

      const puffs = [
        { cx: texW * 0.35, cy: texH * 0.55, r: texH * 0.42 },
        { cx: texW * 0.5, cy: texH * 0.45, r: texH * 0.48 },
        { cx: texW * 0.65, cy: texH * 0.52, r: texH * 0.4 },
        { cx: texW * 0.22, cy: texH * 0.62, r: texH * 0.32 },
        { cx: texW * 0.78, cy: texH * 0.6, r: texH * 0.35 },
      ];

      puffs.forEach((puff) => {
        const radGrad = offCtx.createRadialGradient(
          puff.cx,
          puff.cy,
          0,
          puff.cx,
          puff.cy,
          puff.r
        );
        radGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.65)`);
        radGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.35)`);
        radGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        offCtx.fillStyle = radGrad;
        offCtx.beginPath();
        offCtx.arc(puff.cx, puff.cy, puff.r, 0, Math.PI * 2);
        offCtx.fill();
      });

      return offCanvas;
    };

    // Soft white and subtle pale cyan-white clouds
    cloudTextures.push(createCloudTexture(450, 180, 255, 255, 255));
    cloudTextures.push(createCloudTexture(550, 200, 240, 248, 255));
    cloudTextures.push(createCloudTexture(380, 160, 230, 243, 255));

    // 2. CLOUDS INSTANCES (Parallax)
    const clouds: Cloud[] = [];
    const cloudLayers = [
      { count: 3, speedMin: 2.5, speedMax: 4.5, scale: 1.1, opacity: 0.35, tex: 1 },
      { count: 4, speedMin: 5.0, speedMax: 8.0, scale: 1.4, opacity: 0.45, tex: 0 },
      { count: 2, speedMin: 8.5, speedMax: 12.0, scale: 1.7, opacity: 0.3, tex: 2 },
    ];

    cloudLayers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const tex = cloudTextures[layer.tex];
        clouds.push({
          x: Math.random() * (width + 600) - 300,
          y: Math.random() * (height * 0.8) - 50,
          speed: layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
          scale: layer.scale * (0.85 + Math.random() * 0.3),
          opacity: layer.opacity * (0.85 + Math.random() * 0.3),
          textureIdx: layer.tex,
          width: tex.width,
          height: tex.height,
        });
      }
    });

    // 3. BLUE AIRCRAFT GENERATION
    const getTargetPlaneCount = () => {
      if (width < 640) return 3; // Mobile: 2-3
      if (width < 1024) return 4; // Tablet: 3-5
      return 6; // Desktop: 4-7
    };

    let nextPlaneId = 1;
    const planes: Plane[] = [];

    const createPlane = (initialX?: number): Plane => {
      const heading: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
      const depth = Math.random(); // 0 = far, 1 = near

      let scale: number;
      let opacity: number;
      let speed: number;
      let bodyColor: string;

      if (depth < 0.35) {
        // Far: light sky blue, small, subtle
        scale = 0.52 + Math.random() * 0.16;
        opacity = 0.5 + Math.random() * 0.18;
        speed = 28 + Math.random() * 16;
        bodyColor = '#3B82F6'; // Sky blue
      } else if (depth < 0.75) {
        // Mid: vibrant royal blue
        scale = 0.78 + Math.random() * 0.2;
        opacity = 0.78 + Math.random() * 0.14;
        speed = 46 + Math.random() * 20;
        bodyColor = '#2563EB'; // Royal blue
      } else {
        // Near: deep aerospace navy blue
        scale = 1.05 + Math.random() * 0.22;
        opacity = 0.92 + Math.random() * 0.08;
        speed = 64 + Math.random() * 22;
        bodyColor = '#1D4ED8'; // Deep blue
      }

      const baseY = height * (0.1 + Math.random() * 0.68);
      const startX =
        initialX !== undefined
          ? initialX
          : heading === 1
          ? -80 - Math.random() * 120
          : width + 80 + Math.random() * 120;

      return {
        id: nextPlaneId++,
        x: startX,
        y: baseY,
        vx: heading * speed,
        vy: 0,
        baseY,
        swayAmp: 4 + Math.random() * 8,
        swayFreq: 0.5 + Math.random() * 0.7,
        swayPhase: Math.random() * Math.PI * 2,
        scale,
        opacity,
        heading,
        angle: heading === 1 ? 0 : Math.PI,
        state: 'cruising',
        fallTime: 0,
        targetPitch: 0,
        smokeTimer: 0,
        respawnIn: 0,
        bodyColor,
      };
    };

    const initialTarget = getTargetPlaneCount();
    for (let i = 0; i < initialTarget; i++) {
      const spreadX = (width / initialTarget) * (i + 0.5) + (Math.random() - 0.5) * 80;
      planes.push(createPlane(spreadX));
    }

    // 4. FX PARTICLES
    const smokeParticles: SmokeParticle[] = [];
    const hitFlashes: HitFlash[] = [];
    const sparks: Spark[] = [];

    // 5. INTERACTION & HOVER TRACKING
    let mouseX = -9999;
    let mouseY = -9999;
    let hoveredPlaneId: number | null = null;

    const isPointerOverInteractiveElement = (cx: number, cy: number) => {
      const elem = document.elementFromPoint(cx, cy);
      return Boolean(elem?.closest('a, button, input, select, textarea, [role="button"]'));
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (prefersReducedMotion) return;

      if (isPointerOverInteractiveElement(mouseX, mouseY)) {
        if (hoveredPlaneId !== null) {
          hoveredPlaneId = null;
          document.body.style.cursor = '';
        }
        return;
      }

      let foundPlane: Plane | null = null;
      for (const p of planes) {
        if (p.state !== 'cruising') continue;
        const hitRadius = Math.max(34, 42 * p.scale);
        const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (dist <= hitRadius) {
          foundPlane = p;
          break;
        }
      }

      if (foundPlane) {
        hoveredPlaneId = foundPlane.id;
        document.body.style.cursor = 'crosshair';
      } else {
        if (hoveredPlaneId !== null) {
          hoveredPlaneId = null;
          document.body.style.cursor = '';
        }
      }
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      if (hoveredPlaneId !== null) {
        hoveredPlaneId = null;
        document.body.style.cursor = '';
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion) return;

      const cx = e.clientX;
      const cy = e.clientY;

      if (isPointerOverInteractiveElement(cx, cy)) {
        return;
      }

      let hitPlane: Plane | null = null;
      let minDistance = Infinity;

      for (const p of planes) {
        if (p.state !== 'cruising') continue;
        const hitRadius = Math.max(36, 44 * p.scale);
        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist <= hitRadius && dist < minDistance) {
          minDistance = dist;
          hitPlane = p;
        }
      }

      if (hitPlane) {
        hitPlane.state = 'falling';
        hitPlane.fallTime = 0;
        const divePitch = hitPlane.heading === 1 ? 1.38 : Math.PI - 1.38;
        hitPlane.targetPitch = divePitch;
        hitPlane.vy = Math.max(hitPlane.vy, 35);

        // Flash ring (Sky Blue)
        hitFlashes.push({
          x: hitPlane.x,
          y: hitPlane.y,
          radius: 3,
          maxRadius: 18 * hitPlane.scale,
          alpha: 0.95,
          life: 0.28,
          maxLife: 0.28,
        });

        // Small spark burst
        const sparkCount = 5 + Math.floor(Math.random() * 2);
        for (let i = 0; i < sparkCount; i++) {
          const spAngle = Math.random() * Math.PI * 2;
          const spSpeed = 40 + Math.random() * 80;
          sparks.push({
            x: hitPlane.x,
            y: hitPlane.y,
            vx: Math.cos(spAngle) * spSpeed,
            vy: Math.sin(spAngle) * spSpeed,
            size: 1.2 + Math.random() * 1.4,
            alpha: 0.9,
            life: 0.35 + Math.random() * 0.25,
            maxLife: 0.6,
            color: Math.random() > 0.5 ? '#0284C7' : '#F59E0B',
          });
        }

        if (hoveredPlaneId === hitPlane.id) {
          hoveredPlaneId = null;
          document.body.style.cursor = '';
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', resizeCanvas);

    // 6. DRAWING ROUTINES

    // DRAW BLUE FIGHTER JET SILHOUETTE
    const drawFighterJet = (p: Plane) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(p.scale, p.scale);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(18, 0); // Nose tip
      ctx.lineTo(10, -2.5);
      ctx.lineTo(4, -3.2);
      ctx.lineTo(2, -3.8); // Wing root
      ctx.lineTo(-6, -14); // Wing tip right
      ctx.lineTo(-9, -14);
      ctx.lineTo(-7, -4);
      ctx.lineTo(-12, -4);
      ctx.lineTo(-17, -7.5); // Tail fin tip right
      ctx.lineTo(-18, -6.5);
      ctx.lineTo(-17, -2.5); // Right engine nozzle
      ctx.lineTo(-16, 0); // Center exhaust gap
      ctx.lineTo(-17, 2.5); // Left engine nozzle
      ctx.lineTo(-18, 6.5);
      ctx.lineTo(-17, 7.5); // Tail fin tip left
      ctx.lineTo(-12, 4);
      ctx.lineTo(-7, 4);
      ctx.lineTo(-9, 14);
      ctx.lineTo(-6, 14); // Wing tip left
      ctx.lineTo(2, 3.8); // Wing root
      ctx.lineTo(4, 3.2);
      ctx.lineTo(10, 2.5);
      ctx.closePath();

      // Body fill: Modern aerospace blue
      ctx.fillStyle = p.bodyColor;
      ctx.fill();

      // Crisp contrast rim stroke
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();

      // Canopy highlight ridge
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(2, 0);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Subtle engine afterburner dot when cruising
      if (p.state === 'cruising') {
        ctx.beginPath();
        ctx.arc(-16.5, 0, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.95)';
        ctx.fill();
      }

      ctx.restore();
    };

    // DRAW MINIMAL BLUE TARGET RETICLE [ + ]
    const drawTargetReticle = (p: Plane) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      const half = Math.max(22, 28 * p.scale);
      const cornerLen = 7;

      ctx.strokeStyle = '#0284C7'; // Sky-600
      ctx.lineWidth = 1.4;
      ctx.shadowColor = 'rgba(2, 132, 199, 0.35)';
      ctx.shadowBlur = 3;

      ctx.beginPath();
      // Top-Left
      ctx.moveTo(-half + cornerLen, -half);
      ctx.lineTo(-half, -half);
      ctx.lineTo(-half, -half + cornerLen);

      // Top-Right
      ctx.moveTo(half - cornerLen, -half);
      ctx.lineTo(half, -half);
      ctx.lineTo(half, -half + cornerLen);

      // Bottom-Left
      ctx.moveTo(-half + cornerLen, half);
      ctx.lineTo(-half, half);
      ctx.lineTo(-half, half - cornerLen);

      // Bottom-Right
      ctx.moveTo(half - cornerLen, half);
      ctx.lineTo(half, half);
      ctx.lineTo(half, half - cornerLen);
      ctx.stroke();

      // Center crosshair +
      ctx.beginPath();
      ctx.moveTo(-3.5, 0);
      ctx.lineTo(-1, 0);
      ctx.moveTo(1, 0);
      ctx.lineTo(3.5, 0);
      ctx.moveTo(0, -3.5);
      ctx.lineTo(0, -1);
      ctx.moveTo(0, 1);
      ctx.lineTo(0, 3.5);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0284C7';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('LOCK', -half, -half - 4);

      ctx.restore();
    };

    // 7. ANIMATION LOOP
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Clear & Draw White/Light-Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#FFFFFF');
      skyGrad.addColorStop(0.35, '#F8FAFD');
      skyGrad.addColorStop(0.7, '#EEF5FC');
      skyGrad.addColorStop(1, '#E2EEF9');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Render & Drift Clouds
      clouds.forEach((c) => {
        if (!prefersReducedMotion) {
          c.x += c.speed * dt;
          const texW = c.width * c.scale;
          if (c.x > width + 100) {
            c.x = -texW - 100;
            c.y = Math.random() * (height * 0.8) - 50;
          }
        }
        const tex = cloudTextures[c.textureIdx];
        if (tex) {
          ctx.save();
          ctx.globalAlpha = c.opacity;
          ctx.drawImage(tex, c.x, c.y, c.width * c.scale, c.height * c.scale);
          ctx.restore();
        }
      });

      if (!prefersReducedMotion) {
        // Smoke Particles
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
          const sp = smokeParticles[i];
          sp.life -= dt;
          if (sp.life <= 0) {
            smokeParticles.splice(i, 1);
            continue;
          }
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          sp.vy -= 6 * dt;
          const progress = 1 - sp.life / sp.maxLife;
          const currentSize = sp.size + (sp.maxSize - sp.size) * progress;
          const currentAlpha = (sp.life / sp.maxLife) * sp.alpha;

          ctx.fillStyle = `rgba(148, 163, 184, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Hit Flashes
        for (let i = hitFlashes.length - 1; i >= 0; i--) {
          const hf = hitFlashes[i];
          hf.life -= dt;
          if (hf.life <= 0) {
            hitFlashes.splice(i, 1);
            continue;
          }
          const progress = 1 - hf.life / hf.maxLife;
          const curR = hf.radius + (hf.maxRadius - hf.radius) * progress;
          const curA = (hf.life / hf.maxLife) * hf.alpha;

          ctx.strokeStyle = `rgba(2, 132, 199, ${curA})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(hf.x, hf.y, curR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const spk = sparks[i];
          spk.life -= dt;
          if (spk.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }
          spk.x += spk.vx * dt;
          spk.y += spk.vy * dt;
          spk.vy += 90 * dt;
          const spkA = (spk.life / spk.maxLife) * spk.alpha;

          ctx.fillStyle = spk.color === '#0284C7' ? `rgba(2, 132, 199, ${spkA})` : `rgba(245, 158, 11, ${spkA})`;
          ctx.beginPath();
          ctx.arc(spk.x, spk.y, spk.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update Planes
        const targetCount = getTargetPlaneCount();

        planes.forEach((p) => {
          if (p.state === 'cruising') {
            p.x += p.vx * dt;
            const sway = Math.sin(time * 0.001 * p.swayFreq + p.swayPhase);
            p.y = p.baseY + sway * p.swayAmp;
            const pitchJitter = Math.cos(time * 0.001 * p.swayFreq + p.swayPhase) * 0.06;
            p.angle = (p.heading === 1 ? 0 : Math.PI) + (p.heading === 1 ? pitchJitter : -pitchJitter);

            if (p.heading === 1 && p.x > width + 100) {
              p.x = -80;
              p.baseY = height * (0.1 + Math.random() * 0.68);
            } else if (p.heading === -1 && p.x < -100) {
              p.x = width + 80;
              p.baseY = height * (0.1 + Math.random() * 0.68);
            }

            drawFighterJet(p);

            if (hoveredPlaneId === p.id) {
              drawTargetReticle(p);
            }
          } else if (p.state === 'falling') {
            p.fallTime += dt;
            p.vy += 220 * dt;
            p.vx *= Math.pow(0.96, dt * 60);

            p.angle += (p.targetPitch - p.angle) * Math.min(dt * 3.2, 1);

            const wobble = Math.sin(p.fallTime * 9) * 16 * dt;
            p.x += p.vx * dt + wobble;
            p.y += p.vy * dt;

            p.smokeTimer += dt;
            if (p.smokeTimer >= 0.038) {
              p.smokeTimer = 0;
              const tailDist = 16 * p.scale;
              const tailX = p.x - Math.cos(p.angle) * tailDist;
              const tailY = p.y - Math.sin(p.angle) * tailDist;

              smokeParticles.push({
                x: tailX + (Math.random() - 0.5) * 3,
                y: tailY + (Math.random() - 0.5) * 3,
                vx: -Math.cos(p.angle) * 14 + (Math.random() - 0.5) * 8,
                vy: -Math.sin(p.angle) * 14 - Math.random() * 10,
                size: 2.5 * p.scale,
                maxSize: (16 + Math.random() * 8) * p.scale,
                alpha: 0.5,
                life: 1.4 + Math.random() * 0.4,
                maxLife: 1.8,
              });
            }

            drawFighterJet(p);

            if (p.y > height + 80) {
              p.state = 'dead';
              p.respawnIn = 4.0 + Math.random() * 3.5;
            }
          } else if (p.state === 'dead') {
            p.respawnIn -= dt;
            if (p.respawnIn <= 0) {
              const newP = createPlane();
              Object.assign(p, newP);
            }
          }
        });

        while (planes.length < targetCount) {
          planes.push(createPlane());
        }
        if (planes.length > targetCount && planes.some((p) => p.state === 'dead')) {
          const deadIdx = planes.findIndex((p) => p.state === 'dead');
          if (deadIdx !== -1) planes.splice(deadIdx, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
}
