'use client';
import { useEffect, useRef } from 'react';

class FluidDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  r: number;
  intensity: number;

  constructor(baseX: number, baseY: number) {
    this.baseX = baseX;
    this.baseY = baseY;
    this.x = baseX;
    this.y = baseY;
    this.vx = 0;
    this.vy = 0;
    this.baseR = 1.35;
    this.r = 1.35;
    this.intensity = 0;
  }

  update() {
    const spring = 0.08;
    const damping = 0.82;
    this.vx += (this.baseX - this.x) * spring;
    this.vy += (this.baseY - this.y) * spring;
    this.vx *= damping;
    this.vy *= damping;
    this.x += this.vx;
    this.y += this.vy;

    this.intensity *= 0.94;
    if (this.intensity < 0.005) this.intensity = 0;

    const targetR = this.baseR + this.intensity * 3.4;
    this.r += (targetR - this.r) * 0.28;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.6, this.r), 0, Math.PI * 2);

    if (this.intensity > 0.06) {
      const alpha = Math.min(0.95, 0.2 + this.intensity * 0.8);
      const red = Math.round(113 - this.intensity * 85);
      const green = Math.round(76 + this.intensity * 85);
      const blue = Math.round(182 + this.intensity * 60);

      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      ctx.fill();

      if (this.intensity > 0.35) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 2.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.intensity * 0.22})`;
        ctx.fill();
      }
    } else {
      ctx.fillStyle = 'rgba(41, 40, 39, 0.12)';
      ctx.fill();
    }
  }
}

class WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  waveWidth: number;
  alive: boolean;

  constructor(x: number, y: number, strength = 1.0, speed = 4.6, maxRadius = 320, waveWidth = 50) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.maxRadius = maxRadius;
    this.speed = speed;
    this.strength = strength;
    this.waveWidth = waveWidth;
    this.alive = true;
  }

  update() {
    this.radius += this.speed;
    this.strength *= 0.982;
    if (this.radius > this.maxRadius || this.strength < 0.02) {
      this.alive = false;
    }
  }
}

export default function WaterRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rWidth = 0;
    let rHeight = 0;
    let dots: FluidDot[] = [];
    let ripples: WaterRipple[] = [];
    const DOT_SPACING = 28;
    const mouse = { x: -2000, y: -2000, speed: 0, lastX: -2000, lastY: -2000 };
    let lastRippleSpawn = 0;
    let animationFrameId: number;
    let intervalId: number;

    function initDots() {
      if (!canvas) return; // <--- THE FIX IS HERE
      rWidth = canvas.width = window.innerWidth;
      rHeight = canvas.height = window.innerHeight;
      dots = [];
      const cols = Math.ceil(rWidth / DOT_SPACING) + 1;
      const rows = Math.ceil(rHeight / DOT_SPACING) + 1;
      const offsetX = (rWidth - (cols - 1) * DOT_SPACING) / 2;
      const offsetY = (rHeight - (rows - 1) * DOT_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push(new FluidDot(offsetX + c * DOT_SPACING, offsetY + r * DOT_SPACING));
        }
      }
    }

    function animateWater() {
      if (!ctx) return;
      ctx.clearRect(0, 0, rWidth, rHeight);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.update();
        if (!rip.alive) {
          ripples.splice(i, 1);
          continue;
        }

        const rRad = rip.radius;
        const wWidth = rip.waveWidth;
        const rStr = rip.strength;

        for (let j = 0; j < dots.length; j++) {
          const dot = dots[j];
          const dx = dot.x - rip.x;
          const dy = dot.y - rip.y;
          const dist = Math.hypot(dx, dy);
          const diff = dist - rRad;

          if (Math.abs(diff) < wWidth) {
            const angle = Math.atan2(dy, dx);
            const phase = (diff / wWidth) * Math.PI;
            const waveForce = Math.sin(phase) * rStr * 9;
            dot.vx += Math.cos(angle) * waveForce * 0.18;
            dot.vy += Math.sin(angle) * waveForce * 0.18;

            const crestGlow = Math.cos(phase * 0.5) * rStr;
            if (crestGlow > dot.intensity) {
              dot.intensity = Math.min(1.0, crestGlow);
            }
          }
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const hoverRadius = 110;
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < hoverRadius && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / hoverRadius) * 5.5;
            dot.vx += Math.cos(angle) * force * 0.16;
            dot.vy += Math.sin(angle) * force * 0.16;
            dot.intensity = Math.max(dot.intensity, (1 - dist / hoverRadius) * 0.85);
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.update();
        dot.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animateWater);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.hypot(dx, dy);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;

      if (mouse.speed > 6 && now - lastRippleSpawn > 75) {
        lastRippleSpawn = now;
        const str = Math.min(1.0, 0.35 + mouse.speed * 0.02);
        ripples.push(new WaterRipple(mouse.x, mouse.y, str, 4.2, 260, 48));
        if (ripples.length > 14) ripples.shift();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const now = performance.now();
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        if (now - lastRippleSpawn > 80) {
          lastRippleSpawn = now;
          ripples.push(new WaterRipple(mouse.x, mouse.y, 0.8, 4.0, 240, 45));
          if (ripples.length > 14) ripples.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push(new WaterRipple(e.clientX, e.clientY, 1.3, 5.2, 420, 60));
      if (ripples.length > 14) ripples.shift();
    };

    const handleResize = () => {
      initDots();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    initDots();
    animationFrameId = requestAnimationFrame(animateWater);

    intervalId = window.setInterval(() => {
      const now = performance.now();
      if (now - lastRippleSpawn > 3200) {
        const rx = rWidth * (0.2 + Math.random() * 0.6);
        const ry = rHeight * (0.2 + Math.random() * 0.6);
        ripples.push(new WaterRipple(rx, ry, 0.65, 3.8, 280, 50));
        if (ripples.length > 14) ripples.shift();
      }
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}