import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  a: string;
}

export function ProjectCard({ title, description, image, a }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [opacity, setOpacity] = useState(0.4);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate visibility percentage
        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        );
        const cardHeight = rect.height;
        const visibility = visibleHeight / cardHeight;

        // Map visibility to opacity (clamped between 0.4 and 1)
        const newOpacity = Math.max(0.4, Math.min(1, visibility));
        setOpacity(newOpacity);
      }
    };

    // Attach scroll and resize listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={a}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full overflow-hidden bg-neutral-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ opacity }} // Dynamically set opacity
    >
      {/* Image Section */}
      <div className="aspect-[10/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          width={550}
          height={550}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Hover Banner */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h1 className="text-5xl font-bold text-white">{title}</h1>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </a>
  );
}
