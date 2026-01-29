"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightningProps {
    className?: string;
    hue?: number;
    intensity?: number;
}

/**
 * Particle class for ambient electrical effects
 */
class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    alpha: number;
    private width: number;
    private height: number;
    private hue: number;
    private ctx: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, hue: number, ctx: CanvasRenderingContext2D | null) {
        this.width = width;
        this.height = height;
        this.hue = hue;
        this.ctx = ctx;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = this.width;
        if (this.x > this.width) this.x = 0;
        if (this.y < 0) this.y = this.height;
        if (this.y > this.height) this.y = 0;

        this.alpha += (Math.random() - 0.5) * 0.02;
        if (this.alpha < 0) this.alpha = 0;
        if (this.alpha > 0.5) this.alpha = 0.5;
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

/**
 * Bolt class for lightning strike effects
 */
class Bolt {
    segments: { x: number; y: number }[] = [];
    life: number = 0;
    maxLife: number = 30;
    private width: number;
    private height: number;
    private hue: number;
    private intensity: number;
    private ctx: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, hue: number, intensity: number, ctx: CanvasRenderingContext2D | null) {
        this.width = width;
        this.height = height;
        this.hue = hue;
        this.intensity = intensity;
        this.ctx = ctx;
        this.reset();
    }

    reset() {
        this.segments = [];
        let x = Math.random() * this.width;
        let y = 0; // Start from top
        this.segments.push({ x, y });

        while (y < this.height) {
            x += (Math.random() - 0.5) * 50; // Jitter x
            y += Math.random() * 20 + 10; // Move down
            this.segments.push({ x, y });
        }

        this.life = Math.random() * 20 + 10;
        this.maxLife = this.life;
    }

    update() {
        this.life--;
        if (this.life <= 0) {
            if (Math.random() < 0.01 * this.intensity) { // Chance to respawn
                this.reset();
            }
        }
    }

    draw() {
        if (!this.ctx || this.life <= 0) return;

        const opacity = (this.life / this.maxLife);
        this.ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 1)`;

        this.ctx.beginPath();
        this.ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
            this.ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }
}

/**
 * Lightning component - Animated electrical background effect
 */
export const Lightning: React.FC<LightningProps> = ({
    className,
    hue = 230,
    intensity = 1
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;
        const bolts: Bolt[] = [];
        const particles: Particle[] = [];

        const resize = () => {
            if (containerRef.current) {
                width = containerRef.current.clientWidth;
                height = containerRef.current.clientHeight;
                canvas.width = width;
                canvas.height = height;
            }
        };

        window.addEventListener("resize", resize);
        resize();

        // Init particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(width, height, hue, ctx));
        }
        // Init bolts
        for (let i = 0; i < 2; i++) {
            bolts.push(new Bolt(width, height, hue, intensity, ctx));
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Random flash effect
            if (Math.random() < 0.02 * intensity) {
                ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${Math.random() * 0.05})`;
                ctx.fillRect(0, 0, width, height);
            }

            // Draw bolts
            bolts.forEach(b => {
                b.update();
                b.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [hue, intensity]);

    return (
        <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};
