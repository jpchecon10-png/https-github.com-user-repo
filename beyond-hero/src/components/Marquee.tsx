const MARQUEE_TEXT = 'SPARK · RENDER · IGNITE · UNFOLD · GENESIS · EVOLVE · PURPOSE · BEYOND · ';

export default function Marquee() {
  return (
    <div className="w-full bg-white overflow-hidden py-6 md:py-8">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="shrink-0 uppercase select-none"
            style={{
              fontFamily: '"Bamboly Demo", sans-serif',
              color: '#EC612C',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              paddingRight: '0.25em',
            }}
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
