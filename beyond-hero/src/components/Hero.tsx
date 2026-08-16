import { useEffect, useRef, useState } from 'react';

const CHARACTER_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260801_104316_80b428ea-dc99-4399-afb3-8ccb7b34b2d0.png&w=1280&q=85';

const LEFT_WORDS = ['spark', 'imagine', 'evolve', 'render'];
const RIGHT_WORDS = ['blaze', 'genesis', 'purpose', 'ignite'];

const BEYOND_LAYERS = [
  { color: '#89CFF0', desktop: 36, mobile: 18 },
  { color: '#EC612C', desktop: 24, mobile: 12 },
  { color: '#90EE90', desktop: 12, mobile: 6 },
  { color: '#FFFFFF', desktop: 0, mobile: 0 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handle = () => {
      setIsMobile(window.innerWidth < 768);

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const raw = -rect.top / (sectionHeight - window.innerHeight);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  const scaleFactor = isMobile ? 0.5 : 1;
  const opacity = 0.35 + progress * 0.65;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '120vh', backgroundColor: '#EC612C' }}
    >
      <div className="sticky top-0 h-screen w-full" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
          <div className="relative">
            {BEYOND_LAYERS.map((layer, i) => {
              const offset = isMobile ? layer.mobile : layer.desktop;
              const isFront = i === BEYOND_LAYERS.length - 1;
              return (
                <h1
                  key={i}
                  className="font-bamboly leading-[0.85] tracking-tight select-none"
                  style={{
                    position: isFront ? 'relative' : 'absolute',
                    inset: isFront ? undefined : 0,
                    color: layer.color,
                    fontSize: 'clamp(7.5rem, 30vw, 28rem)',
                    transform: `translateY(${offset}px)`,
                  }}
                >
                  BEYOND
                </h1>
              );
            })}
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw] pointer-events-none"
          style={{ bottom: '-8vh' }}
        >
          <div className="flex flex-col gap-1 md:gap-2">
            {LEFT_WORDS.map((word, i) => {
              const leftOffset = -(60 + i * 40) * scaleFactor * (1 - progress);
              return (
                <span
                  key={word}
                  className="text-white/80 select-none uppercase"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                    transform: `translateX(${leftOffset}px)`,
                    opacity,
                    transition: 'transform 0.05s linear',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          <div className="flex flex-col items-end gap-1 md:gap-2">
            {RIGHT_WORDS.map((word, i) => {
              const rightOffset = (60 + i * 40) * scaleFactor * (1 - progress);
              return (
                <span
                  key={word}
                  className="text-white/80 select-none uppercase text-right"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                    transform: `translateX(${rightOffset}px)`,
                    opacity,
                    transition: 'transform 0.05s linear',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <img
          src={CHARACTER_IMAGE}
          alt="Beyond character"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-none block"
          style={{ height: '115%', maxHeight: '115%', minHeight: '80%' }}
        />
      </div>
    </section>
  );
}
