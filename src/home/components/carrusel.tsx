import React, { useEffect, useRef } from 'react';

function AnimatedMultiRowCarousel() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const scrollRow = (ref, direction) => {
      let position = 0;
      const speed = 0.5;

      const animate = () => {
        if (ref.current) {
          position += direction * speed;
          if (position >= ref.current.scrollWidth / 2) position = 0;
          if (position <= 0) position = ref.current.scrollWidth / 2;
          ref.current.scrollLeft = position;
        }
        requestAnimationFrame(animate);
      };
      animate();
    };

    scrollRow(topRef, 1);
    scrollRow(bottomRef, -1);
  }, []);

  const slides = Array.from({ length: 10 });

  const renderRow = (ref) => (
    <div
      ref={ref}
      className="flex overflow-hidden whitespace-nowrap gap-8"
    >
      {[...slides, ...slides].map((_, index) => (
        <div
          key={index}
          className="min-w-[350px] aspect-[4/3] bg-gray-200 flex items-center justify-center"
        >
          <img src={`https://picsum.photos/seed/${index}/160/120`} alt={`Testimonio ${index}`} className="object-cover w-full h-full" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 px-6 bg-white">
      <div className="space-y-4">
        {renderRow(topRef)}
        {renderRow(bottomRef)}
      </div>
    </section>
  );
}

export default AnimatedMultiRowCarousel;
