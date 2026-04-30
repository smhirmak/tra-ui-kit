import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const clickedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getActiveSection = useCallback(() => {
    // Don't update active section if user just clicked (to prevent jumping during smooth scroll)
    if (clickedRef.current) return;

    const scrollPosition = window.scrollY;
    const headerOffset = 120; // Header height + some padding

    // Find all section elements and their positions
    const sections = items
      .map((item) => {
        const element = document.getElementById(item.id);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const absoluteTop = scrollPosition + rect.top;

        return {
          id: item.id,
          top: absoluteTop,
          bottom: absoluteTop + rect.height,
        };
      })
      .filter((section): section is NonNullable<typeof section> => section !== null);

    if (sections.length === 0) return;

    // Find the section that is currently most visible
    const currentPosition = scrollPosition + headerOffset;

    // Check if we're at the top of the page
    if (scrollPosition < 100) {
      setActiveId(sections[0].id);
      return;
    }

    // Check if we're at the bottom of the page
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (scrollPosition + windowHeight >= documentHeight - 10) {
      setActiveId(sections[sections.length - 1].id);
      return;
    }

    // Find the section that the user is currently viewing
    // We want the section whose top is closest to and above the current scroll position
    let activeSection = sections[0];

    for (let i = sections.length - 1; i >= 0; i--) {
      if (currentPosition >= sections[i].top) {
        activeSection = sections[i];
        break;
      }
    }

    setActiveId(activeSection.id);
  }, [items]);

  useEffect(() => {
    // Throttle scroll event for better performance
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        getActiveSection();
      });
    };

    // Set initial active section
    getActiveSection();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [getActiveSection]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Set clicked flag to prevent active section updates during smooth scroll
    clickedRef.current = true;
    setActiveId(id);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Calculate scroll position
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    // Smooth scroll to element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Reset clicked flag after smooth scroll completes (approximate duration)
    timeoutRef.current = setTimeout(() => {
      clickedRef.current = false;
      getActiveSection();
    }, 1000);
  };

  if (items.length === 0) return null;

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-auto overflow-x-hidden">
      <div className="space-y-2">
        <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
        <nav className="space-y-2">
          {items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left text-sm transition-all duration-200 ${
                activeId === item.id
                  ? 'font-medium text-primary'
                  : 'text-neutral-grey hover:text-foreground'
              }`}
              style={{
                paddingLeft: `${(item.level - 1) * 12}px`,
              }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {item.title}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
