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
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
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
}

export default function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let lastTime = performance.now();
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DPR capping for ultra-smooth 60fps performance
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

    // 1. PRE-RENDER CLOUD TEXTURES (Offscreen Canvas for 60fps fill-rate performance)
    const cloudTextures: HTMLCanvasElement[] = [];
    const createCloudTexture = (texW: number, texH: number, colorRgb: string) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = texW;
      offCanvas.height = texH;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return offCanvas;

      // Draw cluster of soft gradient puffs
      const puffs = [
        { cx: texW * 0.35, cy: texH * 0.55, r: texH * 0.42 },
        { cx: texW * 0.5, cy: texH * 0.45, r: texH * 0.46 },
        { cx: texW * 0.65, cy: texH * 0.52, r: texH * 0.4 },
        { cx: texW * 0.22, cy: texH * 0.62, r: texH * 0.32 },
        { cx: texW * 0.78, cy: texH * 0.6, r: texH * 0.34 },
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
        radGrad.addColorStop(0, `rgba(${colorRgb}, 0.22)`);
        radGrad.addColorStop(0.5, `rgba(${colorRgb}, 0.12)`);
        radGrad.addColorStop(1, `rgba(${colorRgb}, 0)`);
        offCtx.fillStyle = radGrad;
        offCtx.beginPath();
        offCtx.arc(puff.cx, puff.cy, puff.r, 0, Math.PI * 2);
        offCtx.fill();
      });

      return offCanvas;
    };

    cloudTextures.push(createCloudTexture(450, 180, '25, 45, 75'));
    cloudTextures.push(createCloudTexture(550, 200, '20, 38, 64'));
    cloudTextures.push(createCloudTexture(380, 160, '15, 32, 54'));

    // 2. STARS GENERATION (Subtle atmospheric light points)
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor(width / 32), 48);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.65), // Mostly high altitude
        radius: 0.6 + Math.random() * 0.9,
        baseAlpha: 0.12 + Math.random() * 0.28,
        twinkleSpeed: 0.8 + Math.random() * 1.5,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // 3. CLOUDS GENERATION (Distant & Near Parallax Layers)
    const clouds: Cloud[] = [];
    const cloudLayers = [
      { count: 3, speedMin: 2.5, speedMax: 4.5, scale: 1.1, opacity: 0.05, tex: 1 }, // Distant
      { count: 4, speedMin: 5.5, speedMax: 8.5, scale: 1.4, opacity: 0.08, tex: 0 }, // Mid
      { count: 2, speedMin: 9.0, speedMax: 13.0, scale: 1.7, opacity: 0.06, tex: 2 }, // Near
    ];

    cloudLayers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const tex = cloudTextures[layer.tex];
        clouds.push({
          x: Math.random() * (width + 600) - 300,
          y: Math.random() * (height * 0.85) - 50,
          speed: layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
          scale: layer.scale * (0.85 + Math.random() * 0.3),
          opacity: layer.opacity * (0.85 + Math.random() * 0.3),
          textureIdx: layer.tex,
          width: tex.width,
          height: tex.height,
        });
      }
    });

    // 4. AIRCRAFT GENERATION
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

      if (depth < 0.4) {
        // Far: small, faint
        scale = 0.5 + Math.random() * 0.18;
        opacity = 0.28 + Math.random() * 0.16;
        speed = 26 + Math.random() * 16;
      } else if (depth < 0.75) {
        // Mid
        scale = 0.75 + Math.random() * 0.2;
        opacity = 0.48 + Math.random() * 0.16;
        speed = 42 + Math.random() * 20;
      } else {
        // Near: larger, crisp
        scale = 1.05 + Math.random() * 0.22;
        opacity = 0.68 + Math.random() * 0.16;
        speed = 60 + Math.random() * 22;
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
      };
    };

    // Initialize planes scattered across screen
    const initialTarget = getTargetPlaneCount();
    for (let i = 0; i < initialTarget; i++) {
      const spreadX = (width / initialTarget) * (i + 0.5) + (Math.random() - 0.5) * 80;
      planes.push(createPlane(spreadX));
    }

    // 5. FX PARTICLES
    const smokeParticles: SmokeParticle[] = [];
    const hitFlashes: HitFlash[] = [];
    const sparks: Spark[] = [];

    // 6. INTERACTION & HOVER TRACKING
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

      // If cursor is directly over an interactive link/button, don't lock or change cursor
      if (isPointerOverInteractiveElement(mouseX, mouseY)) {
        if (hoveredPlaneId !== null) {
          hoveredPlaneId = null;
          document.body.style.cursor = '';
        }
        return;
      }

      // Check for plane hover
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

    // TRIGGER PLANE HIT ON CLICK / TAP
    const handlePointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion) return;

      const cx = e.clientX;
      const cy = e.clientY;

      // Always allow native clicks on links, buttons, inputs, etc.
      if (isPointerOverInteractiveElement(cx, cy)) {
        return;
      }

      // Check if user clicked on any cruising plane
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
        // Trigger shoot down
        hitPlane.state = 'falling';
        hitPlane.fallTime = 0;
        // Pitch nose down (steeper rotation towards ground: ~75-82 degrees)
        const divePitch = hitPlane.heading === 1 ? 1.38 : Math.PI - 1.38;
        hitPlane.targetPitch = divePitch;
        hitPlane.vy = Math.max(hitPlane.vy, 35);

        // Spawn hit flash
        hitFlashes.push({
          x: hitPlane.x,
          y: hitPlane.y,
          radius: 3,
          maxRadius: 18 * hitPlane.scale,
          alpha: 0.95,
          life: 0.28,
          maxLife: 0.28,
        });

        // Spawn small crisp spark burst (4-6 tiny sparks, no big cartoon fireball)
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
          });
        }

        // Reset hover state
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

    // 7. DRAWING ROUTINES

    // DRAW FIGHTER JET SILHOUETTE
    const drawFighterJet = (p: Plane) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(p.scale, p.scale);
      ctx.globalAlpha = p.opacity;

      // Jet silhouette path (sleek 5th-gen fighter / twin canted tails)
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

      // Body fill: deep stealth navy charcoal
      ctx.fillStyle = '#101B2B';
      ctx.fill();

      // Subtle atmospheric edge rim
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.stroke();

      // Canopy highlight ridge
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(2, 0);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Subtle afterburner dot when cruising
      if (p.state === 'cruising') {
        ctx.beginPath();
        ctx.arc(-16.5, 0, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.fill();
      }

      ctx.restore();
    };

    // DRAW MINIMAL TARGET RETICLE [ + ]
    const drawTargetReticle = (p: Plane) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      const half = Math.max(22, 28 * p.scale);
      const cornerLen = 7;

      ctx.strokeStyle = '#22D3EE';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
      ctx.shadowBlur = 4;

      // 4 Corner Brackets
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

      // Minimal military HUD label
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#22D3EE';
      ctx.font = '8px monospace';
      ctx.fillText('TRK', half + 3, -half + 7);

      ctx.restore();
    };

    // 8. MAIN ANIMATION LOOP (60 FPS with Delta Time)
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Clear & Draw Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040711');
      skyGrad.addColorStop(0.35, '#060E1D');
      skyGrad.addColorStop(0.7, '#09182C');
      skyGrad.addColorStop(1, '#0E243E');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Atmospheric Stars
      stars.forEach((s) => {
        const twinkle = Math.sin(time * 0.001 * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0.05, s.baseAlpha + twinkle * 0.1);
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render & Drift Clouds
      clouds.forEach((c) => {
        if (!prefersReducedMotion) {
          c.x += c.speed * dt;
          const texW = c.width * c.scale;
          if (c.x > width + 100) {
            c.x = -texW - 100;
            c.y = Math.random() * (height * 0.85) - 50;
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

      // If user prefers reduced motion, skip plane updates
      if (!prefersReducedMotion) {
        // Update & Render Smoke Particles
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
          const sp = smokeParticles[i];
          sp.life -= dt;
          if (sp.life <= 0) {
            smokeParticles.splice(i, 1);
            continue;
          }
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          // Thermal upward drift
          sp.vy -= 6 * dt;
          // Growth and fade
          const progress = 1 - sp.life / sp.maxLife;
          const currentSize = sp.size + (sp.maxSize - sp.size) * progress;
          const currentAlpha = (sp.life / sp.maxLife) * sp.alpha;

          ctx.fillStyle = `rgba(148, 163, 184, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update & Render Hit Flashes
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

          ctx.strokeStyle = `rgba(56, 189, 248, ${curA})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(hf.x, hf.y, curR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Update & Render Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const spk = sparks[i];
          spk.life -= dt;
          if (spk.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }
          spk.x += spk.vx * dt;
          spk.y += spk.vy * dt;
          spk.vy += 90 * dt; // Gravity on sparks
          const spkA = (spk.life / spk.maxLife) * spk.alpha;

          ctx.fillStyle = `rgba(251, 191, 36, ${spkA})`;
          ctx.beginPath();
          ctx.arc(spk.x, spk.y, spk.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update Aircraft Fleet
        const targetCount = getTargetPlaneCount();

        planes.forEach((p) => {
          if (p.state === 'cruising') {
            // Cruising flight physics
            p.x += p.vx * dt;
            // Gentle sinusoidal vertical sway
            const sway = Math.sin(time * 0.001 * p.swayFreq + p.swayPhase);
            p.y = p.baseY + sway * p.swayAmp;
            // Slight pitch matching climb/descent
            const pitchJitter = Math.cos(time * 0.001 * p.swayFreq + p.swayPhase) * 0.06;
            p.angle = (p.heading === 1 ? 0 : Math.PI) + (p.heading === 1 ? pitchJitter : -pitchJitter);

            // Screen boundary wrapping
            if (p.heading === 1 && p.x > width + 100) {
              p.x = -80;
              p.baseY = height * (0.1 + Math.random() * 0.68);
            } else if (p.heading === -1 && p.x < -100) {
              p.x = width + 80;
              p.baseY = height * (0.1 + Math.random() * 0.68);
            }

            drawFighterJet(p);

            // Draw target reticle if hovered
            if (hoveredPlaneId === p.id) {
              drawTargetReticle(p);
            }
          } else if (p.state === 'falling') {
            // Shot down: gravity, steep pitch rotation, turbulence & smoke trail
            p.fallTime += dt;
            p.vy += 220 * dt; // Gravity acceleration
            p.vx *= Math.pow(0.96, dt * 60); // Air drag

            // Smooth rotation towards target dive angle (20deg -> 50deg -> 80deg)
            p.angle += (p.targetPitch - p.angle) * Math.min(dt * 3.2, 1);

            // Lateral wobble/spin as it falls
            const wobble = Math.sin(p.fallTime * 9) * 16 * dt;
            p.x += p.vx * dt + wobble;
            p.y += p.vy * dt;

            // Emit smoke particles behind tail
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

            // Out of bounds detection
            if (p.y > height + 80) {
              p.state = 'dead';
              // Respawn between 4.0 and 7.5 seconds
              p.respawnIn = 4.0 + Math.random() * 3.5;
            }
          } else if (p.state === 'dead') {
            p.respawnIn -= dt;
            if (p.respawnIn <= 0) {
              // Reincarnate plane
              const newP = createPlane();
              Object.assign(p, newP);
            }
          }
        });

        // Ensure total plane fleet matches target count
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

    // Pause animation when tab is inactive to save battery and CPU
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
