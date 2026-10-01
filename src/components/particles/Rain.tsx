import React, { useEffect, useRef } from 'react';

export const Rain: React.FC<{ speed?: number }> = ({ speed = 1.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 18 + 10,
      vy: (Math.random() * 8 + 12) * speed,
      alpha: Math.random() * 0.4 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      drops.forEach(d => {
        d.y += d.vy;
        d.x -= 1.5; // subtle wind shift

        if (d.y > canvas.height) {
          d.y = -20;
          d.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.length);
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [speed]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
